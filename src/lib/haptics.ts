/*
 * Haptics: on a phone, a press is felt as well as heard. Android buzzes
 * through `navigator.vibrate`; iOS has no such call, but Safari (18 and
 * later) gives a system tick when a switch control flips, so a hidden one
 * is flipped for it. Only on touch screens, and every pulse is a few
 * milliseconds: a detent under the finger, never a rattle.
 */

export type HapticName =
  | "tap"
  | "soft"
  | "detent"
  | "switch"
  | "error"
  | "success";

/* Android: milliseconds on, off, on. iOS: one system tick per entry, at
   these offsets. */
const PATTERNS: Record<HapticName, number[]> = {
  tap: [7],
  soft: [4],
  detent: [5],
  switch: [12, 60, 6],
  error: [10, 70, 10],
  success: [6, 70, 6, 70, 9],
};
const TICKS: Record<HapticName, number[]> = {
  tap: [0],
  soft: [0],
  detent: [0],
  switch: [0, 70],
  error: [0, 90],
  success: [0, 80, 160],
};

let touch: boolean | null = null;
let label: HTMLLabelElement | null = null;
let last = 0;

function isTouch() {
  if (touch === null) touch = matchMedia("(pointer: coarse)").matches;
  return touch;
}

function tick() {
  if (!label?.isConnected) {
    label = document.createElement("label");
    label.setAttribute("aria-hidden", "true");
    label.dataset.haptic = "";
    label.style.cssText =
      "position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;clip-path:inset(50%)";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("switch", "");
    input.tabIndex = -1;
    label.appendChild(input);
    document.body.appendChild(label);
  }
  label.click();
}

export function haptic(name: HapticName) {
  if (typeof window === "undefined" || !isTouch()) return;
  // Two pulses on top of each other feel like one blurred one.
  const now = performance.now();
  if (name !== "detent" && now - last < 40) return;
  last = now;
  if (typeof navigator.vibrate === "function") {
    try {
      navigator.vibrate(PATTERNS[name]);
    } catch {
      /* Blocked until the first press: nothing to feel yet. */
    }
    return;
  }
  for (const at of TICKS[name]) {
    if (at === 0) tick();
    else setTimeout(tick, at);
  }
}

/** The hidden switch's own clicks, which the page should not answer. */
export const isHapticClick = (el: EventTarget | null) =>
  el instanceof Element && !!el.closest("[data-haptic]");
