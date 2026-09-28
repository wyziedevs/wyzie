"use client";

import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  rise: number;
  r: number;
  bright: number;
  age: number;
  life: number;
  sway: number;
  swayRate: number;
  phase: number;
  spin: number;
  spinRate: number;
};

/*
 * Motes of light rising slowly through a lit surface, like dust over a warm
 * lamp: the contact band's air. They twinkle as they turn and fade in and out
 * over their lives. Like the lamp's dust they belong to the air, not the
 * pointer: nothing the visitor does moves them. They run only while on
 * screen; under reduced motion they hold still.
 */
export function Motes({ count = 76 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = innerWidth < 768 ? Math.round(count * 0.5) : count;
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

    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const s = sprite.getContext("2d")!;
    const grad = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(248, 250, 255, 1)");
    grad.addColorStop(0.18, "rgba(222, 232, 255, 0.85)");
    grad.addColorStop(0.45, "rgba(170, 196, 255, 0.2)");
    grad.addColorStop(1, "rgba(150, 180, 255, 0)");
    s.fillStyle = grad;
    s.fillRect(0, 0, 64, 64);

    const spawn = (m: Mote, anywhere: boolean) => {
      const near = Math.random() < 0.1;
      m.x = Math.random() * w;
      m.y = anywhere ? Math.random() * h : h + 10;
      m.r = near ? 2.2 + Math.random() * 1.8 : 0.5 + Math.random() * 1.1;
      m.bright = near ? 0.35 : 0.55 + Math.random() * 0.45;
      m.rise = (near ? 0.3 : 0.12) + Math.random() * 0.28;
      m.sway = 0.05 + Math.random() * 0.14;
      m.swayRate = 0.004 + Math.random() * 0.01;
      m.phase = Math.random() * Math.PI * 2;
      m.spin = Math.random() * Math.PI * 2;
      m.spinRate = 0.01 + Math.random() * 0.04;
      m.life = 1400 + Math.random() * 2000;
      m.age = anywhere ? Math.random() * m.life * 0.7 : 0;
      return m;
    };
    const motes = Array.from({ length: total }, () => spawn({} as Mote, true));

    const step = (f: number) => {
      for (const m of motes) {
        m.age += f;
        m.x += Math.sin(m.age * m.swayRate + m.phase) * m.sway * f;
        m.y -= m.rise * f;
        m.spin += m.spinRate * f;
        if (m.age > m.life || m.y < -12) spawn(m, false);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        const t = m.age / m.life;
        const life = Math.min(1, t * 8) * Math.min(1, (1 - t) * 6);
        // Brighter toward the top, where the band meets the page's light.
        const height = 0.45 + 0.55 * (1 - m.y / h);
        const glint = 0.35 + 0.65 * Math.abs(Math.sin(m.spin)) ** 3;
        const alpha = life * height * glint * m.bright;
        if (alpha <= 0.01) continue;
        const size = m.r * 7;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.drawImage(sprite, m.x - size / 2, m.y - size / 2, size, size);
      }
    };
    draw();

    let raf = 0;
    let last = 0;
    let visible = false;
    const loop = (now: number) => {
      const f = last ? Math.min(3, (now - last) / 16.667) : 1;
      last = now;
      step(f);
      draw();
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const run = !still && visible && !document.hidden;
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
      if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const onResize = () => {
      resize();
      draw();
    };
    addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", sync);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [count]);

  return <canvas ref={canvasRef} aria-hidden="true" className="motes" />;
}
