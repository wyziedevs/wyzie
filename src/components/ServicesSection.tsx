import { Server, GitBranch, Briefcase, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Server,
    title: "API Development & Hosting",
    description:
      "We design, build, and host production-grade REST APIs on Cloudflare Workers — globally distributed, low-latency, and built to scale. From subtitle scrapers to proxy infrastructure.",
    highlights: ["REST APIs", "Cloudflare Workers", "Edge Computing", "High Availability"],
    cta: { label: "View our APIs", href: "#projects" },
    accent: "from-blue-600/20 to-blue-600/0",
    iconBg: "bg-[#2563eb]/15",
    iconColor: "text-[#60a5fa]",
  },
  {
    icon: GitBranch,
    title: "Open Source Development",
    description:
      "We're committed to building in the open. Our projects are freely available on GitHub for the community — from TypeScript libraries to Go infrastructure tooling.",
    highlights: ["GitHub Organization", "TypeScript", "Go", "MIT Licensed"],
    cta: { label: "View GitHub", href: "https://github.com/wyziedevs", external: true },
    accent: "from-violet-600/20 to-violet-600/0",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    icon: Briefcase,
    title: "Consulting & Custom Dev",
    description:
      "Need a new API? A performance audit? A custom integration? We're available for hire — bring us in to help architect, build, or advise on your next technical project.",
    highlights: ["Technical Consulting", "Custom APIs", "Code Reviews", "Architecture"],
    cta: { label: "Get in touch", href: "#contact" },
    accent: "from-emerald-600/20 to-emerald-600/0",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      {/* Section separator gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Technology built for the community
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            From public APIs to bespoke software — we cover the full spectrum
            of modern web technology.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="relative flex flex-col rounded-2xl bg-[#0d0d16] border border-white/8 p-7 overflow-hidden glow-card group"
              >
                {/* Top gradient accent */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${service.accent} opacity-60`} />

                {/* Content */}
                <div className="relative flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl ${service.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-5 h-5 ${service.iconColor}`} />
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Highlight pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs text-[#64748b] font-mono"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <a
                    href={service.cta.href}
                    target={service.cta.external ? "_blank" : undefined}
                    rel={service.cta.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-sm text-[#64748b] hover:text-white transition-colors group-hover:gap-2.5"
                  >
                    {service.cta.label}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
