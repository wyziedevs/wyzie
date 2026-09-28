"use client";

import { useEffect, useRef } from "react";
import { play, type SoundName } from "@/lib/sound";
import { isHapticClick } from "@/lib/haptics";
import { sparks, sparksFrom } from "@/lib/sparks";
import { onTilt } from "@/lib/tilt";

const PRESSABLE =
  'a[href], button, summary, [role="button"], input[type="submit"]';

/* The presses that throw sparks as well as sounding: the lit buttons. */
const SPARKING = ".btn-lit, [data-spark]";

/* How far off a panel's edge the pointer's light still reaches it. */
const SPOT_REACH = 180;
type Kind = "field" | "tilt";
type Follow = {
  kind: Kind;
  /* A field's `.tilt` panels, which read its numbers too. */
  also: HTMLElement[];
  x: number;
  y: number;
  a: number;
  tx: number;
  ty: number;
  ta: number;
};
/* A panel's edge light: the point on its edge nearest the pointer
   (`--ex`/`--ey`), the way its glow leans (`--sx`/`--sy`), and how strongly
   it is lit (`--near`, `--flare`). Each eases toward its target, so the light
   glides round a corner instead of jumping. */
const FLARE_KEYS = ["ex", "ey", "sx", "sy", "near", "flare"] as const;
type FlareKey = (typeof FLARE_KEYS)[number];
type Flare = {
  now: Record<FlareKey, number>;
  to: Record<FlareKey, number>;
  shown?: boolean;
};

const clamp = (n: number, lo = -1, hi = 1) => Math.min(hi, Math.max(lo, n));

/*
 * The page's sense of touch, wired once for the whole document rather than
 * into every control.
 *
 * Sound: a press sounds, a row or button passed over ticks like a detent. A
 * control opts out with `data-sound="none"` or picks another sound with
 * `data-sound="<name>"`. A lit button (or `data-spark`) throws sparks too.
 *
 * Light: the pointer carries a faint light of its own. Any `.spot` panel it
 * comes near catches it on the nearest stretch of its edge (the flare glides
 * there, round corners too), and on its face when the pointer is over it; a
 * `.row-light` row warms under it.
 *
 * Depth: inside a `[data-field]`, everything turns toward the pointer. The
 * field gets `--px`/`--py` (where the pointer is in it, -1 to 1) and `--fa`
 * (1 while the pointer is in it); each `.tilt` inside gets `--tx`/`--ty`
 * measured from its own center. CSS decides what each of those moves; all
 * of it eases, none of it runs under reduced motion. Buttons stay put.
 *
 * On a phone there is no pointer to follow, so the finger stands in for it
 * while it is down: a panel lights round the press, a row warms under it,
 * and a panel in a field tips toward it. Between presses the field turns as
 * the phone does instead (tilt.ts).
 *
 * Every number is written only when it changes, and a panel's light only
 * while it is lit: each write restyles its element (the properties are
 * registered as not inherited in globals.css, so only that element).
 */
export function Tactile() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    function soundFor(el: Element): SoundName | null {
      const named = el.getAttribute("data-sound");
      if (named === "none") return null;
      if (named) return named as SoundName;
      if (el.tagName === "SUMMARY") {
        return (el.parentElement as HTMLDetailsElement).open ? "close" : "open";
      }
      return "tap";
    }

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0 || isHapticClick(e.target)) return;
      const el = (e.target as Element).closest(`[data-sound], ${PRESSABLE}`);
      const name = el && soundFor(el);
      if (name) play(name);
      if (el?.matches(SPARKING)) {
        sparks(e.clientX, e.clientY, { count: 12, reach: 48, fall: 24 });
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat || (e.key !== "Enter" && e.key !== " ")) return;
      const el = document.activeElement;
      if (!el?.matches(PRESSABLE)) return;
      if (e.key === " " && el.tagName === "A") return;
      const name = soundFor(el);
      if (name) play(name);
      if (el.matches(SPARKING)) sparksFrom(el, { count: 12, reach: 48 });
    }

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    // iOS only shows `:active` (the press) once the page listens for touch.
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });

    let cleanupPointer = () => {};
    {
      const glow = fine ? glowRef.current : null;
      const follows = new Map<HTMLElement, Follow>();
      const flares = new Map<HTMLElement, Flare>();
      let x = -1000;
      let y = -1000;
      let gx = -1000;
      let gy = -1000;
      let target: Element | null = null;
      let lastTick: Element | null = null;
      let raf = 0;
      let seen = false;
      let dirty = false;
      // Any panel still holding light, so a phone can skip them when none is.
      let lighting = false;
      // The phone's turn, between presses (null until it has one).
      let tilt: { x: number; y: number } | null = null;
      let pressed: HTMLElement | null = null;

      const aim = (
        el: HTMLElement,
        kind: Kind,
        tx: number,
        ty: number,
        ta = 0,
      ) => {
        let f = follows.get(el);
        if (!f) {
          f = { kind, also: [], x: 0, y: 0, a: 0, tx: 0, ty: 0, ta: 0 };
          follows.set(el, f);
        }
        f.tx = tx;
        f.ty = ty;
        f.ta = ta;
        return f;
      };

      // What each element was last given, so an unchanged number is never
      // written again.
      const written = new WeakMap<HTMLElement, Map<string, string>>();
      const put = (el: HTMLElement, name: string, value: string) => {
        let seen = written.get(el);
        if (!seen) written.set(el, (seen = new Map()));
        if (seen.get(name) === value) return;
        seen.set(name, value);
        el.style.setProperty(name, value);
      };

      const paintFlare = (el: HTMLElement, v: Record<FlareKey, number>) => {
        put(el, "--ex", `${v.ex.toFixed(1)}px`);
        put(el, "--ey", `${v.ey.toFixed(1)}px`);
        put(el, "--sx", v.sx.toFixed(3));
        put(el, "--sy", v.sy.toFixed(3));
        put(el, "--near", v.near.toFixed(3));
        put(el, "--flare", v.flare.toFixed(3));
      };
      const dark = (v: Record<FlareKey, number>) =>
        v.near === 0 && v.flare === 0;

      // Where everything should be heading, given where the pointer is now.
      const measure = () => {
        dirty = false;

        const lit = target?.closest<HTMLElement>(".row-light");
        if (lit) {
          const r = lit.getBoundingClientRect();
          put(lit, "--mx", `${(x - r.left).toFixed(1)}px`);
        }

        for (const el of fine || seen || lighting
          ? document.querySelectorAll<HTMLElement>(".spot")
          : []) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -SPOT_REACH || r.top > innerHeight + SPOT_REACH) {
            continue;
          }
          const lx = x - r.left;
          const ly = y - r.top;
          // The point on the edge nearest the pointer, from outside or in.
          let ex = clamp(lx, 0, r.width);
          let ey = clamp(ly, 0, r.height);
          if (ex === lx && ey === ly) {
            const m = Math.min(lx, r.width - lx, ly, r.height - ly);
            if (m === lx) ex = 0;
            else if (m === r.width - lx) ex = r.width;
            else if (m === ly) ey = 0;
            else ey = r.height;
          }
          const out = Math.hypot(
            lx - clamp(lx, 0, r.width),
            ly - clamp(ly, 0, r.height),
          );
          const near = seen ? Math.max(0, 1 - out / SPOT_REACH) : 0;
          const flare = seen
            ? Math.max(0, 1 - Math.hypot(lx - ex, ly - ey) / SPOT_REACH)
            : 0;
          // The glow leans out past the lit edge: down under the bottom,
          // out past a side, both ways at a corner.
          const to = {
            ex,
            ey,
            sx: (ex / r.width) * 2 - 1,
            sy: (ey / r.height) * 2 - 1,
            near: near * near,
            flare: flare * flare,
          };
          const f = flares.get(el);
          if (f) f.to = to;
          else flares.set(el, { now: { ...to, near: 0, flare: 0 }, to });
          // Its face follows the pointer only while there is light to show.
          if (!dark(to) || (f && !dark(f.now))) {
            put(el, "--mx", `${lx.toFixed(1)}px`);
            put(el, "--my", `${ly.toFixed(1)}px`);
          }
        }

        if (still) return;

        for (const field of document.querySelectorAll<HTMLElement>(
          "[data-field]",
        )) {
          const r = field.getBoundingClientRect();
          const inside =
            seen && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
          const hw = r.width / 2;
          const hh = r.height / 2;
          const tilts = [...field.querySelectorAll<HTMLElement>(".tilt")];
          // No finger on it: a phone's own turn, while the field is in view.
          const turned =
            !inside && tilt && r.bottom > 0 && r.top < innerHeight
              ? tilt
              : null;
          if (turned) {
            aim(field, "field", turned.x, turned.y, 1).also = tilts;
            for (const el of tilts) aim(el, "tilt", turned.x, turned.y);
            continue;
          }
          aim(
            field,
            "field",
            inside ? clamp((x - r.left - hw) / hw) : 0,
            inside ? clamp((y - r.top - hh) / hh) : 0,
            inside ? 1 : 0,
          ).also = tilts;
          for (const el of tilts) {
            // Measured from the untilted box, so the tilt never feeds back.
            const b = (el.parentElement ?? el).getBoundingClientRect();
            aim(
              el,
              "tilt",
              inside ? clamp((x - b.left - b.width / 2) / hw) : 0,
              inside ? clamp((y - b.top - b.height / 2) / hh) : 0,
            );
          }
        }
      };

      const frame = () => {
        raf = 0;
        if (dirty) measure();
        let moving = false;
        lighting = false;

        for (const [el, f] of flares) {
          if (!el.isConnected) {
            flares.delete(el);
            continue;
          }
          let settled = true;
          let changed = false;
          for (const k of FLARE_KEYS) {
            const gap = f.to[k] - f.now[k];
            if (gap === 0) continue;
            changed = true;
            // Positions within half a pixel, levels within a hair: there.
            if (Math.abs(gap) < (k === "ex" || k === "ey" ? 0.5 : 0.003)) {
              f.now[k] = f.to[k];
            } else {
              f.now[k] += gap * 0.26;
              settled = false;
            }
          }
          if (!settled) moving = true;
          if (!(dark(f.now) && dark(f.to))) lighting = true;
          // A dark panel's light is left alone once it has gone out, and
          // painted again the moment it lights.
          if (changed) {
            const lit = !(dark(f.now) && dark(f.to));
            if (lit || f.shown) paintFlare(el, f.now);
            f.shown = lit;
          }
        }

        for (const [el, f] of follows) {
          if (!el.isConnected) {
            follows.delete(el);
            continue;
          }
          f.x += (f.tx - f.x) * 0.08;
          f.y += (f.ty - f.y) * 0.08;
          f.a += (f.ta - f.a) * 0.08;
          if (
            Math.abs(f.tx - f.x) > 0.0008 ||
            Math.abs(f.ty - f.y) > 0.0008 ||
            Math.abs(f.ta - f.a) > 0.002
          ) {
            moving = true;
          } else {
            f.x = f.tx;
            f.y = f.ty;
            f.a = f.ta;
          }
          const px = f.x.toFixed(4);
          const py = f.y.toFixed(4);
          if (f.kind === "field") {
            const fa = f.a.toFixed(3);
            for (const to of [el, ...f.also]) {
              put(to, "--px", px);
              put(to, "--py", py);
              put(to, "--fa", fa);
            }
          } else {
            put(el, "--tx", px);
            put(el, "--ty", py);
          }
        }

        if (glow && !still) {
          // The light trails the pointer a little, like something with weight.
          gx += (x - gx) * 0.18;
          gy += (y - gy) * 0.18;
          glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
          if (Math.abs(x - gx) > 0.4 || Math.abs(y - gy) > 0.4) moving = true;
        }

        if (moving) raf = requestAnimationFrame(frame);
      };

      const schedule = () => {
        dirty = true;
        if (!raf) raf = requestAnimationFrame(frame);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        x = e.clientX;
        y = e.clientY;
        target = e.target as Element;
        if (!seen) {
          seen = true;
          gx = x;
          gy = y;
          glow?.setAttribute("data-on", "");
        }
        const tick = target.closest("[data-tick]");
        if (tick !== lastTick) {
          lastTick = tick;
          if (tick) play("tick");
        }
        schedule();
      };

      const onLeave = () => {
        seen = false;
        lastTick = null;
        glow?.removeAttribute("data-on");
        schedule();
      };

      // A finger: lit while it is down, gone the moment it lifts or the
      // page takes it for a scroll.
      const onTouchDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" || isHapticClick(e.target)) return;
        x = e.clientX;
        y = e.clientY;
        target = e.target as Element;
        seen = true;
        pressed?.removeAttribute("data-pressed");
        pressed = target.closest<HTMLElement>(".row-light");
        pressed?.setAttribute("data-pressed", "");
        schedule();
      };
      const onTouchMove = (e: PointerEvent) => {
        if (e.pointerType === "mouse" || !seen) return;
        x = e.clientX;
        y = e.clientY;
        schedule();
      };
      const onTouchUp = (e: PointerEvent) => {
        if (e.pointerType === "mouse" || !seen) return;
        seen = false;
        pressed?.removeAttribute("data-pressed");
        pressed = null;
        schedule();
      };

      const offTilt = onTilt((t) => {
        tilt = t;
        schedule();
      });

      if (fine) {
        document.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      } else {
        document.addEventListener("pointerdown", onTouchDown, {
          passive: true,
        });
        document.addEventListener("pointermove", onTouchMove, {
          passive: true,
        });
        document.addEventListener("pointerup", onTouchUp, { passive: true });
        document.addEventListener("pointercancel", onTouchUp, {
          passive: true,
        });
      }
      addEventListener("scroll", schedule, { passive: true });
      cleanupPointer = () => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("pointerdown", onTouchDown);
        document.removeEventListener("pointermove", onTouchMove);
        document.removeEventListener("pointerup", onTouchUp);
        document.removeEventListener("pointercancel", onTouchUp);
        removeEventListener("scroll", schedule);
        offTilt();
        cancelAnimationFrame(raf);
      };
    }

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", noop);
      cleanupPointer();
    };
  }, []);

  useEffect(() => {
    console.log(
      "%cWyzie%c\nReading the source? We build like this for clients too: hello@wyzie.io\nPress L on the home page to flip the light, or pull the cord.",
      "font: 600 20px/1.4 'Open Sans', sans-serif; color: #7ea2f3",
      "font: 13px/1.6 'Open Sans', sans-serif; color: inherit",
    );
  }, []);

  return <div ref={glowRef} aria-hidden="true" className="cursor-light" />;
}
