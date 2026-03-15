"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const stats = [
  { numericValue: 50, suffix: "+", label: "Projects Shipped" },
  { numericValue: 99.9, suffix: "%", label: "Uptime Guarantee" },
  { numericValue: 10, suffix: "M+", label: "Daily Users" },
  { numericValue: 300, suffix: "+", label: "Global Regions" },
];

function AnimatedNumber({
  value,
  suffix,
  duration = 1.5,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(
              Number((eased * value).toFixed(value % 1 === 0 ? 0 : 1)),
            );
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="pb-25 pt-8 relative overflow-hidden">
      <div className="section-divider absolute bottom-0 inset-x-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl border border-border-subtle overflow-hidden"
            staggerDelay={0.12}
          >
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="flex flex-col items-center text-center py-8 px-4 sm:py-12 sm:px-6 bg-bg-base hover:bg-bg-surface/80 transition-all duration-500 h-full">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-brand mb-1.5 tracking-tight tabular-nums">
                    <AnimatedNumber
                      value={stat.numericValue}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="text-sm font-semibold text-white/90">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Reveal>
      </div>
    </section>
  );
}
