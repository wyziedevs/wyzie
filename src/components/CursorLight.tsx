"use client";

import { useEffect, useRef } from "react";

export function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lightRef.current;
    if (!el) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function animate() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      el!.style.setProperty("--cursor-x", `${currentX}px`);
      el!.style.setProperty("--cursor-y", `${currentY}px`);
      rafId = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={lightRef}
      className="cursor-light"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(37, 99, 235, 0.02) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: "var(--cursor-x, -1000px)",
          top: "var(--cursor-y, -1000px)",
          transition: "opacity 0.4s ease",
          willChange: "left, top",
        }}
      />
    </div>
  );
}
