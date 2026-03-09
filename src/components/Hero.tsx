import { ArrowRight, Github, Terminal } from "lucide-react";

const codeSample = `// Fetch subtitles for any content
const res = await fetch(
  'https://sub.wyzie.io/search?id=tt3659388&language=en'
);
const { data } = await res.json();

// Returns structured subtitle data instantly
// → [{ id, display, language, format, source, ... }]`;

function highlightLine(line: string): string {
  const escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  if (escaped.trimStart().startsWith("//")) {
    return `<span style="color:#475569">${escaped}</span>`;
  }
  return escaped
    .replace(/'([^']*)'/g, `<span style="color:#86efac">'$1'</span>`)
    .replace(/\b(const|await|async|fetch|return)\b/g, `<span style="color:#93c5fd">$1</span>`)
    .replace(/\b(data)\b/g, `<span style="color:#fda4af">$1</span>`);
}

const badges = ["TypeScript", "Cloudflare Workers", "Go", "Open Source", "REST APIs"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-grid">
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#2563eb]/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563eb]/5 rounded-full blur-[140px]" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column — copy */}
          <div className="animate-fade-up">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 text-[#60a5fa] text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
              Open-source & available for hire
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="gradient-text">Technology</span>
              <br />
              Solutions for
              <br />
              <span className="text-white">The Modern Web</span>
            </h1>

            <p className="text-[#94a3b8] text-lg leading-relaxed mb-8 max-w-lg">
              We build production-grade APIs, maintain open source projects
              used by millions, and are available for consulting and custom
              development.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {badges.map((b) => (
                <span
                  key={b}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-xs text-[#94a3b8] font-mono"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563eb] hover:bg-[#3b82f6] text-white text-sm font-medium rounded-lg transition-all duration-150 shadow-lg shadow-blue-600/25"
              >
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/wyziedevs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 hover:border-white/20 transition-all duration-150"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right column — code window */}
          <div className="animate-fade-up lg:animate-float" style={{ animationDelay: "0.15s" }}>
            <div className="relative rounded-xl border border-white/10 bg-[#0d0d16] shadow-2xl shadow-black/60 overflow-hidden glow-card">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <div className="ml-auto flex items-center gap-1.5 text-[#64748b] text-xs">
                  <Terminal className="w-3 h-3" />
                  <span>wyzie-subs.ts</span>
                </div>
              </div>

              {/* Code */}
              <div className="p-4 sm:p-6">
                <pre className="text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap break-words">
                  {codeSample.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="select-none w-2 shrink-0 text-[#334155] text-right mr-4 text-xs leading-6">
                        {i + 1}
                      </span>
                      <span
                        className="text-[#e2e8f0]"
                        dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
                      />
                    </div>
                  ))}
                </pre>
              </div>

              {/* Shimmer beam */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
                <div className="animate-beam absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent skew-x-[-20deg]" />
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d0d16] border border-white/10 shadow-xl">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-[#94a3b8]">All systems <span className="text-green-400 font-medium">operational</span></span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#475569] animate-bounce">
          <div className="w-5 h-8 rounded-full border border-[#475569] flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 bg-[#475569] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
