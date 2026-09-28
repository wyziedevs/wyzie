/*
 * Tactile sound, synthesized: no audio files to download, nothing plays
 * until the visitor has pressed something (browsers hold audio until then
 * anyway), and one switch in the header turns all of it off for good.
 *
 * Every voice is a few milliseconds of filtered noise (the click of a key)
 * over a short falling tone (the body under it), pitched a hair differently
 * each time so the hundredth press does not sound like a recording.
 */

import { haptic, type HapticName } from "./haptics";

export type SoundName =
  | "tap"
  | "tick"
  | "open"
  | "close"
  | "success"
  | "switch"
  | "lamp-on"
  | "lamp-off"
  | "tug"
  | "blip"
  | "error";

/* Sounds that only answer something already heard: a hover or a result
   arriving never wakes the audio, so they stay silent until the first press. */
const PASSIVE: ReadonlySet<SoundName> = new Set(["tick", "blip"]);

const STORAGE_KEY = "wyzie-sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;
let enabled: boolean | null = null;
let lastTick = 0;
const listeners = new Set<() => void>();

function readEnabled() {
  if (enabled !== null) return enabled;
  try {
    enabled = localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    enabled = true;
  }
  return enabled;
}

export function isSoundOn() {
  return typeof window === "undefined" ? true : readEnabled();
}

export function setSoundOn(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* Private mode: the choice lasts for this page only. */
  }
  listeners.forEach((fn) => fn());
}

export function subscribeSound(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function audio() {
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.32;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noise(c: AudioContext) {
  if (!noiseBuffer) {
    noiseBuffer = c.createBuffer(
      1,
      Math.round(c.sampleRate * 0.08),
      c.sampleRate,
    );
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function click(
  c: AudioContext,
  t: number,
  freq: number,
  gain: number,
  dur: number,
  q = 0.9,
) {
  const src = c.createBufferSource();
  src.buffer = noise(c);
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(g).connect(master!);
  src.start(t);
  src.stop(t + dur + 0.02);
}

function tone(
  c: AudioContext,
  t: number,
  from: number,
  to: number,
  gain: number,
  dur: number,
  type: OscillatorType = "sine",
) {
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master!);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/* What each sound feels like under a finger (haptics.ts). A hover or a
   result arriving is heard only; the mute switch stills both. */
const FELT: Partial<Record<SoundName, HapticName>> = {
  tap: "tap",
  open: "tap",
  close: "tap",
  switch: "switch",
  "lamp-on": "switch",
  "lamp-off": "switch",
  tug: "soft",
  error: "error",
  success: "success",
};

/** `pitch` scales a voice's tone; 1 is as written. */
export function play(name: SoundName, pitch = 1) {
  if (typeof window === "undefined" || !readEnabled()) return;
  const felt = FELT[name];
  if (felt) haptic(felt);
  if (PASSIVE.has(name) && ctx?.state !== "running") return;
  const c = audio();
  if (!c) return;
  if (c.state !== "running") {
    // The first press wakes the context and sounds a moment later.
    void c.resume().then(() => c.state === "running" && voice(c, name, pitch));
    return;
  }
  voice(c, name, pitch);
}

function voice(c: AudioContext, name: SoundName, pitch: number) {
  const t = c.currentTime + 0.002;
  const v = 1 + (Math.random() - 0.5) * 0.08;

  switch (name) {
    case "tap":
      click(c, t, 2300 * v, 0.55, 0.02);
      tone(c, t, 180 * v, 90, 0.14, 0.05);
      break;
    case "tick": {
      const now = performance.now();
      if (now - lastTick < 45) return;
      lastTick = now;
      click(c, t, 5200 * v, 0.1, 0.009, 2.2);
      break;
    }
    case "open":
      click(c, t, 3000 * v, 0.3, 0.014);
      tone(c, t, 540 * v, 820 * v, 0.06, 0.09, "triangle");
      break;
    case "close":
      click(c, t, 2600 * v, 0.3, 0.014);
      tone(c, t, 820 * v, 500 * v, 0.06, 0.09, "triangle");
      break;
    case "success":
      // C6, E6, G6: a small major arpeggio, quiet and quick.
      tone(c, t, 1046.5, 1046.5, 0.05, 0.22);
      tone(c, t + 0.055, 1318.5, 1318.5, 0.045, 0.24);
      tone(c, t + 0.11, 1568, 1568, 0.04, 0.34);
      break;
    case "switch":
      click(c, t, 1300 * v, 0.9, 0.024, 0.7);
      tone(c, t, 120, 55, 0.22, 0.08);
      click(c, t + 0.034, 2400 * v, 0.35, 0.012);
      break;
    case "lamp-on":
      // The switch, then the tube: two tinks timed to the flicker in
      // globals.css (tube-strike), and the hum of it catching.
      click(c, t, 1300 * v, 0.9, 0.024, 0.7);
      tone(c, t, 120, 55, 0.22, 0.08);
      click(c, t + 0.034, 2400 * v, 0.35, 0.012);
      click(c, t + 0.228, 7200 * v, 0.16, 0.006, 3);
      tone(c, t + 0.228, 3300 * v, 3100 * v, 0.018, 0.04);
      click(c, t + 0.371, 6800 * v, 0.12, 0.006, 3);
      tone(c, t + 0.371, 3100 * v, 2900 * v, 0.014, 0.04);
      hum(c, t + 0.52);
      break;
    case "lamp-off":
      click(c, t, 1200 * v, 0.8, 0.022, 0.7);
      tone(c, t, 110, 50, 0.2, 0.08);
      // The tube cooling.
      tone(c, t + 0.05, 2600 * v, 1700 * v, 0.018, 0.22, "triangle");
      break;
    case "tug":
      click(c, t, 900 * v, 0.28, 0.03, 0.6);
      tone(c, t, 95 * v, 70, 0.08, 0.06);
      break;
    case "error":
      // Two soft, falling knocks: not this, try again.
      click(c, t, 800 * v, 0.3, 0.02, 0.6);
      tone(c, t, 240 * v, 180 * v, 0.09, 0.08, "triangle");
      click(c, t + 0.11, 700 * v, 0.24, 0.02, 0.6);
      tone(c, t + 0.11, 200 * v, 150 * v, 0.08, 0.1, "triangle");
      break;
    case "blip":
      tone(c, t, 1320 * pitch, 1250 * pitch, 0.045, 0.16);
      tone(c, t, 2640 * pitch, 2500 * pitch, 0.01, 0.07);
      break;
  }
}

/* Mains hum, swelling in and dying away: 120 Hz and its overtone. */
function hum(c: AudioContext, t: number) {
  for (const [freq, level] of [
    [120, 0.03],
    [240, 0.012],
  ] as const) {
    const osc = c.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    osc.connect(g).connect(master!);
    osc.start(t);
    osc.stop(t + 1.15);
  }
}
