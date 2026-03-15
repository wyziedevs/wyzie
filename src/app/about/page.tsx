import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Motion";
import { Code2, Globe, Shield, Zap, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Wyzie - a bespoke software company building production-grade web applications, open source tools, and offering technology consulting.",
  alternates: { canonical: "https://wyzie.io/about" },
};

const values = [
  {
    icon: Code2,
    title: "Craftsmanship",
    description:
      "Every line of code is written with intent. We take pride in clean architecture, thoughtful APIs, and software that stands the test of time.",
    iconBg: "bg-blue-brand/10",
    iconColor: "text-blue-pale",
    accentColor: "#2563eb",
  },
  {
    icon: Globe,
    title: "Open by Default",
    description:
      "We believe in building in public. The majority of what we create is open source, tested in production, and free for the community to use and contribute to.",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    accentColor: "#8b5cf6",
  },
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Edge deployments, sub-millisecond cold starts, and globally distributed infrastructure are table stakes, not afterthoughts.",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    accentColor: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "We build for resilience. Resilient systems, thoughtful error handling, and 99.9% uptime guarantees mean your users stay happy.",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    accentColor: "#10b981",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-base">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-brand/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                About Us
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
                Built by Builders,{" "}
                <span className="gradient-text">for the Web.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
                Wyzie is a software company focused on building production-grade
                web applications, open source tools, and edge infrastructure. We
                work with enterprises, startups, and individuals to ship
                software that scales.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 relative">
        <div className="section-divider absolute top-0 inset-x-0" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Our Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
                Raise the bar for what software can be.
              </h2>
              <p className="text-text-muted leading-relaxed mb-5">
                We started Wyzie with a simple belief: too much software is
                slow, fragile, and forgotten. We exist to prove the alternative;
                that custom, carefully engineered systems can be both performant
                and maintainable, at any scale with the right knowledge.
              </p>
              <p className="text-text-muted leading-relaxed">
                From a TypeScript subtitles library used by millions to Go proxy
                infrastructure powering real-world apps, every project we ship
                is designed to last.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-28 relative overflow-hidden">
        <div className="section-divider absolute top-0 inset-x-0" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-20">
            <p className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5">
              Our Core Values
            </h2>
            <p className="text-text-muted text-lg max-w-lg mx-auto leading-relaxed">
              Principles that guide every decision, every commit, and every
              conversation with our clients.
            </p>
          </Reveal>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            staggerDelay={0.12}
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="group relative flex flex-col rounded-2xl bg-bg-surface border border-border-subtle p-7 overflow-hidden glow-card h-full">
                    <div
                      className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, transparent, ${v.accentColor}60, transparent)`,
                      }}
                    />
                    <div
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${v.iconBg} mb-5 shrink-0 transition-transform duration-500 group-hover:scale-105`}
                    >
                      <Icon className={`w-5 h-5 ${v.iconColor}`} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">
                      {v.title}
                    </h3>
                    <p className="text-sm text-text-subtle leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-28 relative overflow-hidden">
        <div className="section-divider absolute top-0 inset-x-0" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-8">
              Let&apos;s build something great.
            </h2>

            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-blue-brand hover:bg-blue-light text-white rounded-xl transition-all duration-300 shadow-md shadow-blue-600/15 hover:shadow-blue-600/20 active:translate-y-px active:shadow-sm"
            >
              Work With Us
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
