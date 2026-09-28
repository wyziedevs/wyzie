/*
 * Sparks: a few motes of light thrown off a point, for the moments that
 * deserve more than a sound: a big button pressed, the lamp catching, a site
 * answering, a copy landing. Plain elements animated by CSS (`.sparks` in
 * globals.css), each gone the moment it lands. They fly outward, slow, and
 * fall. With motion turned off, nothing is thrown.
 */

type Tone = "blue" | "live" | "white";

type Options = {
  count?: number;
  /** How far they fly, in px, before slowing. */
  reach?: number;
  /** Direction in degrees (0 is right, 90 is down) and the fan around it. */
  angle?: number;
  spread?: number;
  /** How far they drop by the end, in px. */
  fall?: number;
  tone?: Tone;
};

let layer: HTMLDivElement | null = null;

function host() {
  if (!layer?.isConnected) {
    layer = document.createElement("div");
    layer.className = "sparks";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);
  }
  return layer;
}

export function sparks(
  x: number,
  y: number,
  {
    count = 10,
    reach = 52,
    angle = -90,
    spread = 360,
    fall = 26,
    tone = "blue",
  }: Options = {},
) {
  if (
    typeof document === "undefined" ||
    document.documentElement.dataset.motion !== "on"
  ) {
    return;
  }
  const root = host();
  for (let i = 0; i < count; i++) {
    const a = ((angle + (Math.random() - 0.5) * spread) * Math.PI) / 180;
    const d = reach * (0.4 + Math.random() * 0.8);
    const s = document.createElement("i");
    s.dataset.tone = tone;
    s.style.cssText =
      `left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;` +
      `--dx:${(Math.cos(a) * d).toFixed(1)}px;` +
      `--dy:${(Math.sin(a) * d).toFixed(1)}px;` +
      `--fall:${(fall * (0.6 + Math.random() * 0.8)).toFixed(1)}px;` +
      `--size:${(1.5 + Math.random() * 2.2).toFixed(2)}px;` +
      `--dur:${Math.round(520 + Math.random() * 520)}ms`;
    s.addEventListener("animationend", () => s.remove(), { once: true });
    root.appendChild(s);
  }
}

/** Sparks from the middle of an element. */
export function sparksFrom(el: Element, options?: Options) {
  const r = el.getBoundingClientRect();
  sparks(r.left + r.width / 2, r.top + r.height / 2, options);
}
