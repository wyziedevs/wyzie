"use client";

import { useEffect } from "react";

export function GlowCardTracker() {
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    let ticking = false;
    let cards: HTMLElement[] = [];
    let lastCacheTime = 0;

    function handleMouseMove(e: MouseEvent) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Re-query the DOM at most once every 2 s so dynamically added
        // cards (e.g. "show more" toggle) are picked up without querying
        // every single frame.
        const now = Date.now();
        if (now - lastCacheTime > 2000) {
          cards = Array.from(
            document.querySelectorAll<HTMLElement>(".glow-card"),
          );
          lastCacheTime = now;
        }
        // Batch all reads before any writes to avoid layout thrashing.
        const rects = cards.map((c) => c.getBoundingClientRect());
        for (let i = 0; i < cards.length; i++) {
          cards[i].style.setProperty(
            "--mouse-x",
            `${e.clientX - rects[i].left}px`,
          );
          cards[i].style.setProperty(
            "--mouse-y",
            `${e.clientY - rects[i].top}px`,
          );
        }
        ticking = false;
      });
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
