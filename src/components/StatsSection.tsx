"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const stats = [
  {
    value: "10M+",
    numericValue: 10,
    suffix: "M+",
    label: "Daily Requests",
    sublabel: "and growing",
  },
  {
    value: "99.9%",
    numericValue: 99.9,
    suffix: "%",
    label: "Uptime",
    sublabel: "enterprise SLA",
  },
  {
    value: "6+",
    numericValue: 6,
    suffix: "+",
    label: "Open Source Projects",
    sublabel: "community-driven",
  },
  {
    value: "300+",
    numericValue: 300,
    suffix: "+",
    label: "Edge Locations",
    sublabel: "worldwide",
  },
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
    <section className="py-20 relative overflow-hidden">
      <div className="section-divider absolute top-0 inset-x-0" />
      <div className="section-divider absolute bottom-0 inset-x-0" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563eb]/4 rounded-full blur-[120px] animate-glow-pulse" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]"
            staggerDelay={0.12}
          >
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="flex flex-col items-center text-center py-8 px-4 sm:py-12 sm:px-6 bg-[#050508] hover:bg-[#0a0a14] transition-colors duration-500">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#2563eb] mb-1.5 tracking-tight tabular-nums">
                    <AnimatedNumber
                      value={stat.numericValue}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="text-sm font-semibold text-white/90 mb-1">
                    {stat.label}
                  </span>
                  <span className="text-xs text-[#5a657a]">
                    {stat.sublabel}
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
