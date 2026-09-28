"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
 * Marks each `.reveal` (and each `.sweep` rule) as shown the first time it
 * scrolls into view. The entrance itself is CSS (globals.css); this only
 * decides when. Runs again on every client-side page change, for the new
 * page's elements.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.observed = "";
    if (root.dataset.motion !== "on") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    document
      .querySelectorAll<HTMLElement>(
        ".reveal:not([data-shown]):not([data-instant]), .sweep:not([data-shown])",
      )
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
