"use client";

import { useEffect, useId, useRef } from "react";
import { haptic } from "@/lib/haptics";
import { play } from "@/lib/sound";
import { onTilt } from "@/lib/tilt";
import { sparks } from "@/lib/sparks";

type Mote = {
  alive: boolean;
  wait: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fall: number;
  r: number;
  bright: number;
  age: number;
  sway: number;
  swayRate: number;
  phase: number;
  spin: number;
  spinRate: number;
};

type Lights = "on" | "off" | "broken";

/* The cone's apex sits 30rem above the tube (globals.css). */
const APEX = 480;
/* Half the beam's width, and the inner part of it at full strength. */
const BEAM_EDGE = (36 * Math.PI) / 180;
const BEAM_CORE = (12 * Math.PI) / 180;
/* How long the lamp takes to fade out, so the dust keeps moving as it goes. */
const FADE_OUT = 560;
/* Frames a new mote takes to brighten as it leaves the tube. */
const EMERGE = 50;
/* Of all the dust, the share the tube throws off as it first strikes. */
const FIRST_PUFF = 0.4;

/* The cord is a string of links, each a point that swings free. */
const LINKS = 16;
/* Per 60th of a second: gravity, the air's drag, the fastest a link moves. */
const GRAVITY = 0.5;
/* How far past its length the cord must be pulled to switch the lamp. */
const TOGGLE_PULL = 14;
const DRAG = 0.991;
const MAX_SPEED = 4.5;
/* The knob outweighs a link of string several times over. */
const KNOB_WEIGHT = 6;
/* How far the cord stretches under a full pull. */
const MAX_PULL = 46;

type Link = { x: number; y: number; px: number; py: number };

/*
 * The light over the hero: a tube that strikes on like a fluorescent lamp,
 * the cone and the glare it throws, and dust falling slowly through the beam,
 * brightest where the beam is and glinting as it turns. Every mote comes off
 * the tube: a puff as it first strikes, then one at a time as others fall out
 * of the hero, so none appears from nowhere. Switched off and on again, the
 * dust already in the air stays where it was. The dust is the air's, not the
 * pointer's: nothing the visitor does pushes it around. It animates
 * only while the lamp is on screen and the tab is visible; under reduced
 * motion it is still. A pull cord hangs off the tube, and L works too.
 *
 * `broken` is the 404's lamp: it keeps trying to strike and failing, until
 * someone pulls the cord.
 */
export function Lightbar({ broken = false }: { broken?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cordRef = useRef<HTMLButtonElement>(null);
  const stringRef = useRef<SVGPathElement>(null);
  const knobRef = useRef<HTMLSpanElement>(null);
  const shade = useId();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const cord = cordRef.current;
    const string = stringRef.current;
    const knob = knobRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !cord || !string || !knob || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = innerWidth < 768 ? 76 : 220;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "lighter";
    };
    resize();

    // One soft mote, drawn once and stamped at every size: a hot center with
    // a halo, so the large near ones read as out of focus.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const s = sprite.getContext("2d")!;
    const grad = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(242, 246, 255, 1)");
    grad.addColorStop(0.16, "rgba(214, 226, 255, 0.9)");
    grad.addColorStop(0.42, "rgba(140, 170, 255, 0.22)");
    grad.addColorStop(1, "rgba(110, 150, 255, 0)");
    s.fillStyle = grad;
    s.fillRect(0, 0, 64, 64);

    // Born on the tube, weighted to its middle, and set drifting outward
    // along the beam's own ray so the dust fans out as the light does. Only
    // under reduced motion, where nothing falls, is it placed through the
    // whole beam at once.
    const spawn = (m: Mote, anywhere: boolean) => {
      const y = anywhere ? Math.random() * h * 0.95 : Math.random() * 4;
      const ray = (Math.random() + Math.random() - 1) * 0.6;
      const near = Math.random() < 0.08;
      m.alive = true;
      m.wait = 0;
      m.x = w / 2 + Math.tan(ray) * (y + APEX);
      m.y = y;
      m.r = near ? 2.4 + Math.random() * 2 : 0.45 + Math.random() * 1.1;
      m.bright = near ? 0.3 : 0.65 + Math.random() * 0.35;
      m.fall = (near ? 0.45 : 0.18) + Math.random() * 0.36;
      // Off the tube slowly, then settling into its own speed.
      m.vy = anywhere ? m.fall : m.fall * 0.25;
      m.vx = Math.tan(ray) * m.fall * 0.85;
      m.sway = 0.04 + Math.random() * 0.12;
      m.swayRate = 0.004 + Math.random() * 0.01;
      m.phase = Math.random() * Math.PI * 2;
      m.spin = Math.random() * Math.PI * 2;
      m.spinRate = 0.008 + Math.random() * 0.035;
      m.age = anywhere ? EMERGE : 0;
      return m;
    };
    const motes: Mote[] = Array.from(
      { length: count },
      () => ({ alive: false }) as Mote,
    );
    if (still) motes.forEach((m) => spawn(m, true));

    // The first strike throws off a puff, most of it as the light catches
    // and the rest over the next few seconds, so it never leaves as a band.
    let puffed = false;
    const puff = () => {
      if (puffed || still) return;
      puffed = true;
      for (let i = 0; i < count * FIRST_PUFF; i++) {
        spawn(motes[i], false).wait = 30 + Math.random() ** 1.6 * 240;
      }
    };
    // After that, a new mote for each one gone: about as many a second as
    // fall out of the bottom, until the air is full.
    let owed = 0;
    const step = (f: number) => {
      owed += (count / 1500) * f;
      for (const m of motes) {
        if (!m.alive) {
          if (puffed && owed >= 1) {
            owed--;
            spawn(m, false);
          }
          continue;
        }
        if (m.wait > 0) {
          m.wait -= f;
          continue;
        }
        m.age += f;
        m.vy += (m.fall - m.vy) * 0.02 * f;
        m.x += (m.vx + Math.sin(m.age * m.swayRate + m.phase) * m.sway) * f;
        m.y += m.vy * f;
        m.spin += m.spinRate * f;
        if (m.y > h + 20 || m.x < -20 || m.x > w + 20) m.alive = false;
      }
      owed = Math.min(owed, 1);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dim = root.dataset.lights === "broken" ? 0.3 : 1;
      for (const m of motes) {
        if (!m.alive || m.wait > 0) continue;
        // Brightens as it leaves the tube, fades as it nears the floor.
        const emerge = Math.min(1, m.age / EMERGE);
        const floor = Math.min(1, (h - m.y) / (h * 0.22));
        const off = Math.abs(Math.atan2(m.x - w / 2, m.y + APEX));
        const beam = Math.min(
          1,
          Math.max(0, (BEAM_EDGE - off) / (BEAM_EDGE - BEAM_CORE)),
        );
        // A turning speck flashes when its face catches the lamp.
        const glint = 0.4 + 0.6 * Math.abs(Math.sin(m.spin)) ** 3;
        const alpha =
          emerge *
          floor *
          (0.1 + 0.9 * beam) *
          (1 - (m.y / h) * 0.4) *
          glint *
          m.bright *
          dim;
        if (alpha <= 0.01) continue;
        const size = m.r * 7;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(sprite, m.x - size / 2, m.y - size / 2, size, size);
      }
    };

    draw();

    let raf = 0;
    let visible = false;
    let last = 0;
    let fadeUntil = 0;
    const lit = () =>
      root.dataset.lights !== "off" || performance.now() < fadeUntil;
    const loop = (now: number) => {
      const f = last ? Math.min(3, (now - last) / 16.667) : 1;
      last = now;
      step(f);
      draw();
      raf = lit() ? requestAnimationFrame(loop) : 0;
    };
    const sync = () => {
      const run = !still && visible && !document.hidden && lit();
      if (run && root.dataset.lights === "on") puff();
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
      if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    // Now and then the tube catches, the way an old one does.
    let blinkTimer = 0;
    const blink = () => {
      blinkTimer = window.setTimeout(
        () => {
          if (root.dataset.lights === "on" && visible && !document.hidden) {
            root.dataset.blink = "";
            setTimeout(() => delete root.dataset.blink, 460);
          }
          blink();
        },
        12000 + Math.random() * 18000,
      );
    };
    if (!still) blink();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(root);

    // The tube throws a few sparks as it catches: on the two stutters of
    // tube-strike (globals.css), the same moments the tinks sound.
    const tube = root.querySelector(".lightbar-tube");
    const sparkTimers: number[] = [];
    const strikeSparks = (since: number) => {
      if (!tube || still) return;
      for (const [at, n] of [
        [228, 9],
        [371, 6],
      ] as const) {
        sparkTimers.push(
          window.setTimeout(
            () => {
              const r = tube.getBoundingClientRect();
              if (r.bottom < 0 || root.dataset.lights !== "on") return;
              for (let i = 0; i < 3; i++) {
                sparks(r.left + r.width * (0.2 + Math.random() * 0.6), r.top, {
                  count: Math.ceil(n / 3),
                  reach: 34,
                  angle: 90,
                  spread: 150,
                  fall: 70,
                  tone: "white",
                });
              }
            },
            Math.max(0, at - since),
          ),
        );
      }
    };
    // On arrival the strike is already running; join it where it is.
    const strike = tube
      ?.getAnimations()
      .find((a) => (a as CSSAnimation).animationName === "tube-strike");
    const since = Number(strike?.currentTime ?? Infinity);
    if (since < 371) strikeSparks(since);

    const toggle = () => {
      const next: Lights = root.dataset.lights === "on" ? "off" : "on";
      root.dataset.lights = next;
      fadeUntil = next === "off" ? performance.now() + FADE_OUT : 0;
      play(next === "on" ? "lamp-on" : "lamp-off");
      if (next === "on") strikeSparks(0);
      sync();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "l" || e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, select, [contenteditable]")) return;
      toggle();
      // Switched from the keyboard, the cord still gets its tug.
      if (!still && !dragging) {
        pullV += 7;
        wake();
      }
    };

    // The cord: a string with a knob on the end, simulated link by link. Take
    // hold of it anywhere (or just click it) and pull: the string stretches a
    // little above the hand while the rest dangles below it, and let go, it
    // springs back and the knob bobs and swings. Push it up and the string
    // goes slack and drapes. The pointer passing through it pushes whatever
    // part it crossed, and the sway runs on along the string.
    const rem = () =>
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    let cordLen = 48;
    const measureCord = () => {
      cordLen = Math.max(24, cord.clientHeight - rem() * 1.25);
    };
    measureCord();
    const links: Link[] = Array.from({ length: LINKS + 1 }, (_, i) => {
      const y = (cordLen * i) / LINKS;
      return { x: 0, y, px: 0, py: y };
    });
    const knobAt = links[LINKS];
    // The ball's radius, less a hair so the string runs into it.
    const ballR = knob.offsetWidth / 2 - 0.5;

    let pull = 0;
    let pullV = 0;
    let dragging = false;
    let held = LINKS;
    let moved = false;
    let grabX = 0;
    let grabY = 0;
    let offX = 0;
    let offY = 0;
    let startX = 0;
    let startY = 0;
    let cordRaf = 0;
    let cordLast = 0;
    let calm = 0;
    // Pulled far enough to switch on letting go: the pull clicks as it
    // passes that point, both ways.
    let armed = false;
    // Which way is down. On a phone it is the real floor, so tipping the
    // phone swings the cord.
    let down = 0;
    let gravX = 0;
    let gravY = GRAVITY;

    const paintCord = () => {
      // A smooth curve through the links: each bend is rounded off between
      // midpoints, so the string never shows a corner.
      let d = "M0 0";
      for (let i = 1; i < LINKS; i++) {
        const a = links[i];
        const b = links[i + 1];
        d += `Q${a.x.toFixed(2)} ${a.y.toFixed(2)} ${((a.x + b.x) / 2).toFixed(2)} ${((a.y + b.y) / 2).toFixed(2)}`;
      }
      d += `L${knobAt.x.toFixed(2)} ${knobAt.y.toFixed(2)}`;
      string.setAttribute("d", d);
      // The ball hangs off the end, on the line of the last bit of string.
      const prev = links[LINKS - 1];
      const ux = knobAt.x - prev.x;
      const uy = knobAt.y - prev.y;
      const k = ballR / (Math.hypot(ux, uy) || 1);
      knob.style.transform = `translate(${(knobAt.x + ux * k).toFixed(2)}px, ${(knobAt.y + uy * k).toFixed(2)}px)`;
    };

    // Straight down, at whatever stretch: how it hangs under reduced motion.
    const hangStraight = () => {
      for (let i = 0; i <= LINKS; i++) {
        const y = ((cordLen + pull) * i) / LINKS;
        Object.assign(links[i], { x: 0, y, px: 0, py: y });
      }
      paintCord();
    };

    // Where the held link goes: under the pointer, or, once the pointer is
    // past what the string above it can reach, toward it on a stretch.
    const holdLink = () => {
      const part = held / LINKS;
      const dist = Math.hypot(grabX, grabY);
      const over = dist - cordLen * part;
      pull = over > 0 ? MAX_PULL * (1 - Math.exp(-over / (42 * part))) : 0;
      const k = dist > 0 ? Math.min(dist, (cordLen + pull) * part) / dist : 0;
      links[held].x = grabX * k;
      links[held].y = grabY * k;
    };
    // How readily each link gives way: the top is tied on, a held link is in
    // the hand, and the knob is heavier than string.
    const give = (i: number) =>
      i === 0 || (dragging && i === held)
        ? 0
        : i === LINKS
          ? 1 / KNOB_WEIGHT
          : 1;

    const tick = () => {
      if (!dragging) {
        // Let go, the stretch springs back and overshoots a little.
        pullV = (pullV - pull * 0.1) * 0.74;
        pull += pullV;
      }
      for (let i = 1; i <= LINKS; i++) {
        const l = links[i];
        let vx = (l.x - l.px) * DRAG + gravX;
        let vy = (l.y - l.py) * DRAG + gravY;
        const v = Math.hypot(vx, vy);
        if (v > MAX_SPEED) {
          vx *= MAX_SPEED / v;
          vy *= MAX_SPEED / v;
        }
        l.px = l.x;
        l.py = l.y;
        if (dragging && i === held) continue;
        l.x += vx;
        l.y += vy;
      }
      if (dragging) holdLink();
      // No link grows past its length (a string can pull but never push, so
      // a slack one just drapes); the knob, heavier, gives way less.
      const rest = (cordLen + Math.max(0, pull)) / LINKS;
      for (let n = 0; n < 14; n++) {
        for (let i = 0; i < LINKS; i++) {
          const a = links[i];
          const b = links[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d <= rest) continue;
          const fix = (d - rest) / d;
          const wa = give(i);
          const wb = give(i + 1);
          if (wa + wb === 0) continue;
          const ka = wa / (wa + wb);
          const kb = wb / (wa + wb);
          a.x += dx * fix * ka;
          a.y += dy * fix * ka;
          b.x -= dx * fix * kb;
          b.y -= dy * fix * kb;
        }
      }
    };

    const settle = (now: number) => {
      // Fixed steps of a 60th of a second, however fast the screen runs.
      const steps = cordLast
        ? Math.min(4, Math.max(1, Math.round((now - cordLast) / 16.667)))
        : 1;
      cordLast = now;
      for (let i = 0; i < steps; i++) tick();
      paintCord();
      if (dragging && pull > TOGGLE_PULL !== armed) {
        armed = !armed;
        play("tick", armed ? 1.3 : 0.9);
        haptic("detent");
      }
      let speed = Math.abs(pullV) + Math.abs(pull) * 0.2;
      for (const l of links) {
        speed = Math.max(speed, Math.abs(l.x - l.px), Math.abs(l.y - l.py));
      }
      calm = speed < 0.015 ? calm + 1 : 0;
      if (!dragging && calm > 30) {
        cordRaf = 0;
        pull = pullV = 0;
        return;
      }
      cordRaf = requestAnimationFrame(settle);
    };
    const wake = () => {
      if (still) {
        if (!dragging) pull = 0;
        hangStraight();
      } else if (!cordRaf) {
        calm = 0;
        cordLast = 0;
        cordRaf = requestAnimationFrame(settle);
      }
    };
    paintCord();

    // Where the pointer is, measured from the top of the cord.
    const local = (e: PointerEvent) => {
      const r = cord.getBoundingClientRect();
      return [e.clientX - (r.left + r.width / 2), e.clientY - r.top] as const;
    };

    const onCordDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      cord.setPointerCapture(e.pointerId);
      measureCord();
      dragging = true;
      moved = false;
      armed = false;
      startX = e.clientX;
      startY = e.clientY;
      // Held wherever it was taken: the knob, or the nearest bit of string.
      const [x, y] = local(e);
      held = LINKS;
      if (e.target !== knob) {
        let best = Infinity;
        for (let i = 1; i <= LINKS; i++) {
          const d = Math.hypot(links[i].x - x, links[i].y - y);
          if (d < best) {
            best = d;
            held = i;
          }
        }
      }
      offX = links[held].x - x;
      offY = links[held].y - y;
      grabX = links[held].x;
      grabY = links[held].y;
      play("tug");
      wake();
    };
    const onCordMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 4) moved = true;
      const [x, y] = local(e);
      grabX = x + offX;
      grabY = y + offY;
      if (still) {
        holdLink();
        hangStraight();
      }
    };

    // The pointer passing through the string, however fast: every link near
    // the path it took since the last move is pushed the way it went.
    let lastX = NaN;
    let lastY = NaN;
    const onBrush = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || still || dragging) return;
      const [x, y] = local(e);
      const fromX = Number.isNaN(lastX) ? x : lastX;
      const fromY = Number.isNaN(lastY) ? y : lastY;
      lastX = x;
      lastY = y;
      const mx = x - fromX;
      const my = y - fromY;
      const len2 = mx * mx + my * my;
      if (len2 === 0) return;
      // Nowhere near: not worth measuring link by link.
      if (
        Math.max(fromX, x) < -60 ||
        Math.min(fromX, x) > 60 ||
        Math.min(fromY, y) > cordLen + MAX_PULL + 30 ||
        Math.max(fromY, y) < -10
      ) {
        return;
      }
      const speed = Math.min(1, 7 / Math.sqrt(len2));
      let hit = false;
      for (let i = 1; i <= LINKS; i++) {
        const l = links[i];
        const t = Math.max(
          0,
          Math.min(1, ((l.x - fromX) * mx + (l.y - fromY) * my) / len2),
        );
        const d = Math.hypot(l.x - fromX - mx * t, l.y - fromY - my * t);
        const near = 1 - d / 14;
        if (near <= 0) continue;
        const push = near * speed * (i === LINKS ? 0.3 : 0.45);
        l.px -= mx * push;
        l.py -= my * push * 0.5;
        hit = true;
      }
      if (hit) {
        if (!cordRaf) play("tick", 1.6);
        wake();
      }
    };
    const onCordUp = () => {
      if (!dragging) return;
      dragging = false;
      if (!moved || pull > TOGGLE_PULL) {
        toggle();
        // A click with no drag still tugs the cord.
        if (!moved) pullV += 6;
      }
      wake();
    };

    const onResize = () => {
      resize();
      draw();
      measureCord();
      wake();
    };

    const offTilt = onTilt((t) => {
      const next = down + (t.down - down) * 0.2;
      if (Math.abs(next - down) < 0.002) return;
      down = next;
      gravX = GRAVITY * Math.sin(down);
      gravY = GRAVITY * Math.cos(down);
      wake();
    });

    cord.addEventListener("pointerdown", onCordDown);
    cord.addEventListener("pointermove", onCordMove);
    cord.addEventListener("pointerup", onCordUp);
    cord.addEventListener("pointercancel", onCordUp);
    addEventListener("pointermove", onBrush, { passive: true });
    addEventListener("resize", onResize, { passive: true });
    addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", sync);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(cordRaf);
      clearTimeout(blinkTimer);
      sparkTimers.forEach(clearTimeout);
      io.disconnect();
      offTilt();
      cord.removeEventListener("pointerdown", onCordDown);
      cord.removeEventListener("pointermove", onCordMove);
      cord.removeEventListener("pointerup", onCordUp);
      cord.removeEventListener("pointercancel", onCordUp);
      removeEventListener("pointermove", onBrush);
      removeEventListener("resize", onResize);
      removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        aria-hidden="true"
        data-lights={broken ? "broken" : "on"}
        className="lightbar"
      >
        <div className="lightbar-lamp">
          <div className="lightbar-cone" />
          <div className="lightbar-halo" />
          <div className="lightbar-glare" />
          <div className="lightbar-core" />
          <div className="lightbar-tube" />
        </div>
        <canvas ref={canvasRef} className="lightbar-dust" />
      </div>
      {/* A toy for the pointer; the keyboard has L. */}
      <button
        ref={cordRef}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        data-sound="none"
        className="lamp-cord"
      >
        <svg className="lamp-cord-string" aria-hidden="true">
          <defs>
            <linearGradient
              id={shade}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2="64"
            >
              <stop offset="0" stopColor="oklch(0.86 0.08 258)" />
              <stop offset="1" stopColor="oklch(0.52 0.02 262)" />
            </linearGradient>
          </defs>
          <path ref={stringRef} d="M0 0V48" stroke={`url(#${shade})`} />
        </svg>
        <span ref={knobRef} className="lamp-cord-knob" />
      </button>
      {/* The wall behind it all, seen only where the beam or the pointer falls. */}
      <div aria-hidden="true" className="light-wall" />
    </>
  );
}
