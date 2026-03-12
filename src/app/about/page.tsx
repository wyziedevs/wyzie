import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/Motion";
import {
  Code2,
  Globe,
  Shield,
  Zap,
  Github,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
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
    iconBg: "bg-[#2563eb]/10",
    iconColor: "text-[#60a5fa]",
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
      "We design for failure. Resilient systems, thoughtful error handling, and 99.9% uptime SLAs mean your users stay happy.",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    accentColor: "#10b981",
  },
];

const techStack = [
  { label: "TypeScript", color: "#3178c6" },
  { label: "Go", color: "#00acd7" },
  { label: "Next.js", color: "#ffffff" },
  { label: "SvelteKit", color: "#ff3e00" },
  { label: "Nitro", color: "#8b5cf6" },
  { label: "Cloudflare Workers", color: "#f59e0b" },
  { label: "D1 Database", color: "#2563eb" },
  { label: "Tailwind CSS", color: "#38bdf8" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563eb]/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-4">
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
              <p className="text-[#8a95a8] text-lg leading-relaxed max-w-2xl">
                Wyzie is a software company focused on building
                production-grade web applications, open source tools, and
                edge infrastructure. We work with enterprises, startups, and
                individuals to ship software that scales.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 relative">
        <div className="section-divider absolute top-0 inset-x-0" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <Reveal>
              <div>
                <p className="text-[#2563eb] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  Our Mission
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                  Raise the bar for what software can be.
                </h2>
                <p className="text-[#8a95a8] leading-relaxed mb-5">
                  We started Wyzie with a simple belief: too much software is
                  slow, fragile, and forgotten. We exist to prove the
                  alternative; that custom, carefully engineered systems can
                  be both performant and maintainable, at any scale with the right knowledge.
                </p>
                <p className="text-[#8a95a8] leading-relaxed">
                  From a TypeScript subtitles library used by millions to Go
                  proxy infrastructure powering real-world apps, every project
                  we ship is designed to last.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "50+", label: "Projects Shipped" },
                  { value: "10M+", label: "Daily API Requests" },
                  { value: "300+", label: "Edge Locations" },
                  { value: "99.9%", label: "Uptime SLA" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-[#0a0a14] border border-white/[0.06] p-6 text-center"
                  >
                    <p className="text-3xl font-extrabold text-[#2563eb] mb-1 tracking-tight">
                      {value}
                    </p>
                    <p className="text-xs text-[#5a657a] font-medium">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[#8a95a8] leading-relaxed mt-5 italic">
                We put our all into open-sourced projects, and our clients get 
                the benefits of our practiced expertise in building for the web.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 relative overflow-hidden">
        <div className="section-divider absolute top-0 inset-x-0" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-20">
            <p className="text-[#2563eb] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5">
              Our Core Values
            </h2>
            <p className="text-[#8a95a8] text-lg max-w-lg mx-auto leading-relaxed">
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
                  <div className="group relative flex flex-col rounded-2xl bg-[#0a0a14] border border-white/[0.06] p-7 overflow-hidden glow-card h-full">
                    <div
                      className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, transparent, ${v.accentColor}60, transparent)`,
                      }}
                    />
                    <div
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${v.iconBg} mb-5 shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${v.iconColor}`} />
                    </div>
                    <h3 className="text-base font-bold text-white mb-3">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#5a657a] leading-relaxed">
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
      <section className="py-28 relative overflow-hidden">
        <div className="section-divider absolute top-0 inset-x-0" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#2563eb]/3" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#2563eb]/6 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-[#2563eb] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Get Involved
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5">
              Let&apos;s build something great.
            </h2>
            <p className="text-[#8a95a8] text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Whether you want to collaborate, contribute to open source, or
              just say hello; we&apos;d love to hear from you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#2563eb] hover:bg-[#3b82f6] text-white rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
              >
                Work With Us
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/wyziedevs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.09] text-white rounded-xl border border-white/[0.08] transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
