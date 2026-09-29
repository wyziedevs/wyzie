/*
 * How the phone is held and how it moves, for the things on the page that
 * answer it: the hero turns as the phone does, the lamp's cord hangs toward
 * the real floor, the dust falls that way (and the band's motes rise the
 * other), and a shake sloshes the lot. Read from `deviceorientation` and
 * `devicemotion`, only on touch screens held upright. Android gives both
 * freely; iOS only behind its motion prompt, so there `askTilt()` asks, and
 * only from a press on something physical (the lamp's cord). Once granted,
 * a later visit asks again on its first plain tap, which iOS answers without
 * showing the prompt. Nothing runs under reduced motion.
 *
 * `Tilt`: `x`/`y` are how far the phone has turned from the way it is
 * usually held (-1 to 1, a slow-moving rest point, so after a while any grip
 * is level), plus a little slosh from being shaken; `down` is the angle of
 * true down in the plane of the screen, in radians, 0 straight down the
 * page; `pull` is how much of gravity lies in that plane (1 upright, near 0
 * lying flat).
 *
 * `Jolt`: the phone's own acceleration in screen pixels' directions (y
 * down), in m/s², past a small dead zone, and the seconds it lasted.
 */

export type Tilt = { x: number; y: number; down: number; pull: number };
export type Jolt = { x: number; y: number; dt: number };

const tilts = new Set<(t: Tilt) => void>();
const jolts = new Set<(j: Jolt) => void>();
const RANGE = 22;
const KEY = "wyzie-tilt";

type Gate = { requestPermission?: () => Promise<"granted" | "denied"> };

let restB = NaN;
let restG = NaN;
let lastOrient = 0;
let lastMotion = 0;
let listening = false;
let granted = false;
let asked = false;

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

/* A smoothing that stays still when the phone is still and keeps up when it
   turns fast: the faster the value moves, the less it is held back. */
const follow = (cutoff: number, dt: number) =>
  1 / (1 + 1 / (2 * Math.PI * cutoff * dt));
function smoother() {
  let v = NaN;
  let speed = 0;
  return (x: number, dt: number) => {
    if (Number.isNaN(v)) return (v = x);
    speed += ((x - v) / dt - speed) * follow(1, dt);
    v += (x - v) * follow(1.2 + 0.04 * Math.abs(speed), dt);
    return v;
  };
}
let beta = smoother();
let gamma = smoother();

/* Shaken, the page sloshes: a spring pushed by the phone's acceleration,
   in the same units as `x`/`y`, that rings a little and settles. */
let wx = 0;
let wy = 0;
let wvx = 0;
let wvy = 0;
const SPRING = (2 * Math.PI * 1.6) ** 2;
const DAMP = 2 * 0.35 * 2 * Math.PI * 1.6;

/* Where gravity sits, for devices that only report it mixed in. */
let gravAX = NaN;
let gravAY = NaN;

const upright = () => (screen.orientation?.angle ?? 0) === 0;

function onOrient(e: DeviceOrientationEvent) {
  if (e.beta === null || e.gamma === null) return;
  // Upright only: turned sideways, the numbers mean something else.
  if (!upright()) return;
  const now = performance.now();
  const dt = lastOrient ? clamp((now - lastOrient) / 1000, 0.004, 0.1) : 0.016;
  lastOrient = now;
  const b = beta(e.beta, dt);
  const g = gamma(e.gamma, dt);
  if (Number.isNaN(restB)) {
    restB = b;
    restG = g;
  }
  restB += (b - restB) * 0.004;
  restG += (g - restG) * 0.004;
  const rb = (b * Math.PI) / 180;
  const rg = (g * Math.PI) / 180;
  // Gravity in the screen's plane: sideways, and down the page. Lying flat
  // there is almost none, so the page keeps some of its own down.
  const across = Math.cos(rb) * Math.sin(rg);
  const along = Math.sin(rb);
  const t: Tilt = {
    x: clamp((g - restG) / RANGE + wx, -1.2, 1.2),
    y: clamp((b - restB) / RANGE + wy, -1.2, 1.2),
    down: clamp(Math.atan2(across, Math.max(along, 0.3)), -1.1, 1.1),
    pull: clamp(Math.hypot(across, along), 0, 1),
  };
  tilts.forEach((fn) => fn(t));
}

function onMotion(e: DeviceMotionEvent) {
  if (!upright()) return;
  const now = performance.now();
  const dt = lastMotion ? clamp((now - lastMotion) / 1000, 0.004, 0.1) : 0.016;
  lastMotion = now;
  let ax: number;
  let ay: number;
  const a = e.acceleration;
  if (a && a.x !== null && a.y !== null) {
    ax = a.x;
    ay = a.y;
  } else {
    // Only gravity mixed in: take off where it has been sitting.
    const ag = e.accelerationIncludingGravity;
    if (!ag || ag.x === null || ag.y === null) return;
    if (Number.isNaN(gravAX)) {
      gravAX = ag.x;
      gravAY = ag.y;
    }
    gravAX += (ag.x - gravAX) * follow(0.8, dt);
    gravAY += (ag.y - gravAY) * follow(0.8, dt);
    ax = ag.x - gravAX;
    ay = ag.y - gravAY;
  }
  // The device's y runs up its face; the page's runs down.
  ay = -ay;
  // A hand is never quite still: that much is not a shake.
  const mag = Math.hypot(ax, ay);
  const over = Math.max(0, mag - 0.6);
  const k = mag > 0 ? over / mag : 0;
  ax *= k;
  ay *= k;

  // The slosh lags the way the phone went, then rings back.
  wvx += (-SPRING * wx - DAMP * wvx - ax * 3) * dt;
  wvy += (-SPRING * wy - DAMP * wvy - ay * 3) * dt;
  wx = clamp(wx + wvx * dt, -0.5, 0.5);
  wy = clamp(wy + wvy * dt, -0.5, 0.5);

  if (over > 0) jolts.forEach((fn) => fn({ x: ax, y: ay, dt }));
}

function supported() {
  return (
    typeof window !== "undefined" &&
    "DeviceOrientationEvent" in window &&
    matchMedia("(pointer: coarse)").matches &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* iOS: the motion prompt stands between the page and the sensors. (Chrome
   has `requestPermission` too, but grants it freely, so the gate is iOS.) */
const gated = () =>
  (/iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
  typeof (DeviceOrientationEvent as unknown as Gate).requestPermission ===
    "function";

const stored = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const store = (v: string) => {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
};

function sync() {
  const want = (tilts.size > 0 || jolts.size > 0) && (!gated() || granted);
  if (want && !listening) {
    listening = true;
    addEventListener("deviceorientation", onOrient);
    addEventListener("devicemotion", onMotion);
  } else if (!want && listening) {
    listening = false;
    removeEventListener("deviceorientation", onOrient);
    removeEventListener("devicemotion", onMotion);
    restB = restG = NaN;
    lastOrient = lastMotion = 0;
    beta = smoother();
    gamma = smoother();
    wx = wy = wvx = wvy = 0;
    gravAX = gravAY = NaN;
  }
}

/*
 * Ask iOS for the sensors. Only from inside a press (a `pointerup`, `click`
 * or `touchend`; iOS ignores it anywhere else), and only once a page: a
 * refusal is kept, and never asked again.
 */
export function askTilt() {
  if (!supported() || !gated() || granted || asked) return;
  if (stored() === "denied") return;
  asked = true;
  const orient = DeviceOrientationEvent as unknown as Gate;
  const motion = (window.DeviceMotionEvent ?? {}) as unknown as Gate;
  // Both in the same press, before either answers: one prompt covers both.
  const ask = orient.requestPermission!();
  motion.requestPermission?.().catch(() => {});
  ask.then(
    (answer) => {
      granted = answer === "granted";
      store(granted ? "granted" : "denied");
      sync();
    },
    () => {},
  );
}

/* Granted on an earlier visit: the first plain tap (not a link or a
   control, which would leave or act) asks again, silently. */
let rearmed = false;
function rearm() {
  if (rearmed || !gated() || stored() !== "granted") return;
  rearmed = true;
  const onUp = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    const el = e.target as Element | null;
    if (el?.closest("a, button, input, textarea, select, label, summary")) {
      return;
    }
    removeEventListener("pointerup", onUp, true);
    askTilt();
  };
  addEventListener("pointerup", onUp, { capture: true, passive: true });
}

export function onTilt(fn: (t: Tilt) => void) {
  if (!supported()) return () => {};
  tilts.add(fn);
  rearm();
  sync();
  return () => {
    tilts.delete(fn);
    sync();
  };
}

export function onJolt(fn: (j: Jolt) => void) {
  if (!supported()) return () => {};
  jolts.add(fn);
  rearm();
  sync();
  return () => {
    jolts.delete(fn);
    sync();
  };
}
