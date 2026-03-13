import { Shield, Clock, Globe, Headphones } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const differentiators = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "Every system we build follows security best practices from day one. Encrypted data, secure APIs, and regular audits are standard.",
    iconBg: "bg-[#2563eb]/10",
    iconColor: "text-[#60a5fa]",
  },
  {
    icon: Clock,
    title: "SLA Guarantees",
    description:
      "99.9% uptime SLAs backed by redundant infrastructure and 24/7 monitoring. Your business stays online, always.",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy to 300+ edge locations worldwide with sub-millisecond cold starts. Your users get speed, everywhere.",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "A named point of contact for every engagement. Direct access to senior engineers, not a support ticket queue.",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563eb]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-[#2563eb] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Why Wyzie
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5">
            Built for the Enterprise
          </h2>
          <p className="text-[#8a95a8] text-lg max-w-lg mx-auto leading-relaxed">
            The reliability, security, and performance standards that
            enterprise teams demand — built into everything we deliver.
          </p>
        </Reveal>

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          staggerDelay={0.1}
        >
          {differentiators.map((d) => {
            const Icon = d.icon;
            return (
              <StaggerItem key={d.title}>
                <div className="group relative flex flex-col items-center text-center rounded-2xl bg-[#0a0a14] border border-white/[0.06] p-7 overflow-hidden glow-card h-full">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563eb]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div
                    className={`w-12 h-12 rounded-xl ${d.iconBg} flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className={`w-5.5 h-5.5 ${d.iconColor}`} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2.5">
                    {d.title}
                  </h3>
                  <p className="text-[#5a657a] text-sm leading-relaxed">
                    {d.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
