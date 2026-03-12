"use client";

import { useEffect } from "react";

export function GlowCardTracker() {
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    function handleMouseMove(e: MouseEvent) {
      const cards = document.querySelectorAll<HTMLElement>(".glow-card");
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty(
          "--mouse-x",
          `${e.clientX - rect.left}px`,
        );
        card.style.setProperty(
          "--mouse-y",
          `${e.clientY - rect.top}px`,
        );
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
