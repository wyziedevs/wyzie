import { Code2, GitBranch, Briefcase, Server, ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const services = [
  {
    icon: Code2,
    title: "Bespoke Software Development",
    description:
      "From concept to production, we build tailored web applications, backend systems, and edge infrastructure that fit your exact requirements and scale with your business.",
    highlights: ["Web Apps", "Full-Stack", "Edge Computing"],
    cta: { label: "View our work", href: "#projects" },
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
    icon: Server,
    title: "Business Infrastructure",
    description:
      "Scalable edge infrastructure, custom SDKs, and API foundations built to power your business. From Cloudflare Workers to fully typed client libraries, we set you up for global scale.",
    highlights: ["Edge Computing", "SDKs", "APIs", "Cloudflare"],
    cta: { label: "Get in touch", href: "#contact" },
    accentColor: "#f59e0b",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Briefcase,
    title: "Technology Consulting",
    description:
      "Strategic roadmapping, architecture reviews, and hands-on implementation. We help teams move faster, make better technical decisions, and build for the long term.",
    highlights: ["Consulting", "Architecture", "Code Review"],
    cta: { label: "Get in touch", href: "#contact" },
    accentColor: "#10b981",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <p className="text-[#2563eb] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5">
            Engineered for Impact
          </h2>
          <p className="text-[#8a95a8] text-lg max-w-lg mx-auto leading-relaxed">
            Bespoke software, open source tools, and expert consulting that
            drives measurable results.
          </p>
        </Reveal>

        <StaggerContainer
          className="grid md:grid-cols-2 gap-5"
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
                    <p className="text-[#8a95a8] text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs text-[#5a657a] font-mono hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
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
