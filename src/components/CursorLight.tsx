"use client";

import { useEffect, useRef } from "react";

function isTouchDevice() {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
}

export function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lightRef.current || isTouchDevice()) return;
    const el = lightRef.current;

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let hasMouseMoved = false;
    let rafId: number | null = null;

    function animate() {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      el.style.setProperty("--cursor-x", `${currentX}px`);
      el.style.setProperty("--cursor-y", `${currentY}px`);

      // Stop the loop when close enough to target
      if (
        Math.abs(mouseX - currentX) > 0.5 ||
        Math.abs(mouseY - currentY) > 0.5
      ) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMouseMoved) {
        currentX = e.clientX;
        currentY = e.clientY;
        hasMouseMoved = true;
      }
      // Restart loop if it stopped
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
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
          width: "400px",
          height: "400px",
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
