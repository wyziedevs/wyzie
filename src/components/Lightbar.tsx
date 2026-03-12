"use client";

import { useEffect, useRef } from "react";

class Particle {
  x = 0;
  y = 0;
  radius = 0;
  direction = 0;
  speed = 0;
  lifetime = 0;
  ran = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.reset(canvas);
    this.initialize(canvas);
  }

  reset(canvas: HTMLCanvasElement) {
    this.x = Math.round((Math.random() * canvas.width) / 2 + canvas.width / 4);
    this.y = Math.random() * 100 + 5;
    this.radius = 1 + Math.floor(Math.random() * 2);
    this.direction = (Math.random() * Math.PI) / 2 + Math.PI / 4;
    this.speed = 0.02 + Math.random() * 0.08;
    const second = 65;
    this.lifetime = second * 8 + Math.random() * (second * 40);
    this.ran = 0;
  }

  initialize(canvas: HTMLCanvasElement) {
    this.ran = Math.random() * this.lifetime;
    const baseSpeed = this.speed;
    this.speed = Math.random() * this.lifetime * baseSpeed;
    this.update(canvas);
    this.speed = baseSpeed;
  }

  update(canvas: HTMLCanvasElement) {
    this.ran += 1;
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);
    if (this.ran > this.lifetime) this.reset(canvas);
  }

  render(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.beginPath();
    const x = this.ran / this.lifetime;
    const o = (x - x * x) * 4;
    ctx.globalAlpha = Math.max(0, o * 0.8);
    ctx.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      this.direction,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  }
}

function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 50 : 180;
    const tickRate = isMobile ? 30 : 60;

    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    let shouldTick = true;
    let handle: ReturnType<typeof requestAnimationFrame> | null = null;
    let lastWidth = canvas.scrollWidth;
    let lastHeight = canvas.scrollHeight;

    function loop() {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (shouldTick) {
        for (const p of particles) p.update(canvas);
        shouldTick = false;
      }

      const w = canvas.scrollWidth;
      const h = canvas.scrollHeight;
      if (w !== lastWidth || h !== lastHeight) {
        canvas.width = w;
        canvas.height = h;
        lastWidth = w;
        lastHeight = h;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      for (const p of particles) p.render(canvas);
      handle = requestAnimationFrame(loop);
    }

    const interval = setInterval(() => {
      shouldTick = true;
    }, 1e3 / tickRate);

    loop();

    return () => {
      if (handle) cancelAnimationFrame(handle);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "32%",
        height: "400px",
        transform: "translateY(-480px)",
      }}
    />
  );
}

export function Lightbar() {
  return (
    <div className="absolute inset-0 w-full h-[1100px] overflow-hidden pointer-events-none -mt-64">
      <div className="max-w-screen w-full h-[1100px] relative pt-64">
        <div className="lightbar">
          <ParticlesCanvas />
          <div className="lightbar-visual" />
        </div>
      </div>
    </div>
  );
}
