/*
 * How the phone is held, for the things on the page that answer it: the
 * hero turns a little as the phone does, and the lamp's cord keeps hanging
 * toward the real floor. Read from `deviceorientation`, only on touch
 * screens held upright, and only where the browser gives it without asking
 * (Android); iOS would show a permission prompt for it, which no hanging
 * cord is worth. Nothing runs under reduced motion.
 *
 * `x`/`y` are how far the phone has turned from the way it is usually held
 * (-1 to 1, a slow-moving rest point, so after a while any grip is level),
 * and `down` is the angle of true down in the plane of the screen, in
 * radians, 0 straight down the page.
 */

export type Tilt = { x: number; y: number; down: number };
type Listener = (t: Tilt) => void;

const listeners = new Set<Listener>();
const RANGE = 22;
let restB = NaN;
let restG = NaN;
let started = false;

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

function onOrient(e: DeviceOrientationEvent) {
  if (e.beta === null || e.gamma === null) return;
  // Upright only: turned sideways, the numbers mean something else.
  if ((screen.orientation?.angle ?? 0) !== 0) return;
  const b = e.beta;
  const g = e.gamma;
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
  const along = Math.max(Math.sin(rb), 0.3);
  const t: Tilt = {
    x: clamp((g - restG) / RANGE, -1, 1),
    y: clamp((b - restB) / RANGE, -1, 1),
    down: clamp(Math.atan2(across, along), -0.7, 0.7),
  };
  listeners.forEach((fn) => fn(t));
}

export function onTilt(fn: Listener) {
  if (
    typeof window === "undefined" ||
    !("DeviceOrientationEvent" in window) ||
    // iOS: only behind a prompt.
    /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
    !matchMedia("(pointer: coarse)").matches ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return () => {};
  }
  listeners.add(fn);
  if (!started) {
    started = true;
    addEventListener("deviceorientation", onOrient);
  }
  return () => {
    listeners.delete(fn);
    if (!listeners.size && started) {
      started = false;
      restB = restG = NaN;
      removeEventListener("deviceorientation", onOrient);
    }
  };
}
