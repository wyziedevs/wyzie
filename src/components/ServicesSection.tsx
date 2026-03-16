import { Code2, Layers, Briefcase, Server, ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "./Motion";

const services = [
  {
    icon: Code2,
    title: "Bespoke Software Development",
    description:
      "Custom web apps, backend systems, and edge infrastructure built to your exact requirements and ready to scale.",
    highlights: ["Web Apps", "Full-Stack", "Edge Computing"],
    cta: { label: "View our work", href: "#projects" },
    accentColor: "#2563eb",
    iconBg: "bg-blue-brand/10",
    iconColor: "text-blue-pale",
  },
  {
    icon: Layers,
    title: "Startup & MVP Development",
    description:
      "Turn your idea into a working product fast. We scope, design, and build production-ready MVPs that let you validate, iterate, and grow.",
    highlights: ["MVP", "Rapid Build", "Product Validation", "Launch Ready"],
    cta: { label: "Start a project", href: "/contact" },
    accentColor: "#8b5cf6",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: Server,
    title: "Business Infrastructure",
    description:
      "Scalable edge infrastructure, custom SDKs, and API foundations on Cloudflare Workers, built for global scale.",
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
      "Architecture reviews, strategic roadmapping, and hands-on implementation to help teams ship faster and build for the long term.",
    highlights: ["Consulting", "Architecture", "Code Review"],
    cta: { label: "Get in touch", href: "#contact" },
    accentColor: "#10b981",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-16 sm:py-28 relative overflow-hidden section-glow"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12 sm:mb-20">
          <p className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5">
            Engineered for Impact
          </h2>
          <p className="text-text-muted text-lg max-w-lg mx-auto leading-relaxed">
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
                <div className="group relative flex flex-col rounded-2xl bg-bg-surface border border-border-subtle p-7 overflow-hidden glow-card h-full">
                  <div className="relative flex flex-col flex-1">
                    <div
                      className={`w-11 h-11 rounded-xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-105`}
                    >
                      <Icon className={`w-5 h-5 ${service.iconColor}`} />
                    </div>

                    <h3 className="text-white font-bold text-lg mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-border-subtle text-xs text-text-subtle font-mono hover:bg-white/[0.06] hover:border-border-muted transition-all duration-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <a
                      href={service.cta.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-white transition-all duration-300"
                      style={{ color: `${service.accentColor}99` }}
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
