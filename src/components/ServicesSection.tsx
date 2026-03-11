import { Server, GitBranch, Briefcase, ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const services = [
  {
    icon: Server,
    title: "API Development & Hosting",
    description:
      "Mission-critical REST APIs on Cloudflare Workers; globally distributed, ultra-low-latency, purpose-built for seamless integration.",
    highlights: ["REST APIs", "Cloudflare Workers", "Edge Computing"],
    cta: { label: "View our APIs", href: "#projects" },
    accentColor: "#2563eb",
    iconBg: "bg-[#2563eb]/10",
    iconColor: "text-[#60a5fa]",
  },
  {
    icon: GitBranch,
    title: "Open Source Development",
    description:
      "Battle-tested, community-driven projects powering ecosystems worldwide; from TypeScript libraries to Go infrastructure.",
    highlights: ["GitHub Org", "TypeScript", "Go", "MIT Licensed"],
    cta: {
      label: "View GitHub",
      href: "https://github.com/wyziedevs",
      external: true,
    },
    accentColor: "#8b5cf6",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: Briefcase,
    title: "Consulting & Custom Dev",
    description:
      "From strategic roadmapping to hands-on implementation, API design, performance optimization, architecture reviews.",
    highlights: ["Consulting", "Custom APIs", "Architecture"],
    cta: { label: "Get in touch", href: "#contact" },
    accentColor: "#10b981",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#2563eb]/4 rounded-full blur-[140px] animate-orb-drift" />
        <div
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-violet-600/3 rounded-full blur-[120px] animate-orb-drift"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <p className="text-[#2563eb] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5">
            Engineered for Impact
          </h2>
          <p className="text-[#8a95a8] text-lg max-w-lg mx-auto leading-relaxed">
            High-performance APIs, open source tools, and bespoke software that
            drives measurable results.
          </p>
        </Reveal>

        <StaggerContainer
          className="grid md:grid-cols-3 gap-5"
          staggerDelay={0.15}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <div className="group relative flex flex-col rounded-2xl bg-[#0a0a14] border border-white/[0.06] p-7 overflow-hidden glow-card h-full">
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-40"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${service.accentColor}40, transparent)`,
                    }}
                  />

                  <div className="relative flex flex-col flex-1">
                    <div
                      className={`w-11 h-11 rounded-xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}
                    >
                      <Icon className={`w-5 h-5 ${service.iconColor}`} />
                    </div>

                    <h3 className="text-white font-bold text-lg mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-[#8a95a8] text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs text-[#5a657a] font-mono"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <a
                      href={service.cta.href}
                      target={service.cta.external ? "_blank" : undefined}
                      rel={
                        service.cta.external ? "noopener noreferrer" : undefined
                      }
                      className="inline-flex items-center gap-1.5 text-sm text-[#5a657a] hover:text-white transition-all duration-300"
                    >
                      {service.cta.label}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
