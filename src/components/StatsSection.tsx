"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const stats = [
  {
    value: "50+",
    numericValue: 50,
    suffix: "+",
    label: "Projects Shipped",
    sublabel: "across industries",
  },
  {
    value: "99.9%",
    numericValue: 99.9,
    suffix: "%",
    label: "Uptime SLA",
    sublabel: "enterprise grade",
  },
  {
    value: "10M+",
    numericValue: 10,
    suffix: "M+",
    label: "Daily Users",
    sublabel: "and growing",
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
    <section className="pb-25 pt-8 relative overflow-hidden">
      <div className="section-divider absolute bottom-0 inset-x-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl border border-white/[0.06]"
            staggerDelay={0.12}
          >
            {stats.map((stat, index) => (
              <StaggerItem key={stat.label}>
                <div className={`flex flex-col items-center text-center py-8 px-4 sm:py-12 sm:px-6 bg-[#050508] hover:bg-[#0a0a14] hover:scale-[1.03] transition-all duration-500 h-full
                  ${index === 0 ? "rounded-tl-2xl lg:rounded-tl-2xl lg:rounded-bl-2xl" : ""}
                  ${index === 1 ? "rounded-tr-2xl lg:rounded-none" : ""}
                  ${index === 2 ? "rounded-bl-2xl lg:rounded-none" : ""}
                  ${index === 3 ? "rounded-br-2xl lg:rounded-tr-2xl lg:rounded-br-2xl" : ""}
                `}>
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
