"use client";

import { ArrowRight, Github, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const codeSample = `// Fetch subtitles for any content
const res = await fetch(
  'https://sub.wyzie.io/search?id=tt3659388'
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
    .replace(
      /\b(const|await|async|fetch|return)\b/g,
      `<span style="color:#93c5fd">$1</span>`,
    )
    .replace(/\b(data)\b/g, `<span style="color:#fda4af">$1</span>`);
}

const badges = [
  "TypeScript",
  "Cloudflare Workers",
  "Go",
  "Open Source",
  "REST APIs",
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-grid">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#2563eb]/8 rounded-full blur-[140px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[120px]"
          animate={{ scale: [1, 0.95, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2563eb]/4 rounded-full blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2563eb]/25 bg-[#2563eb]/8 text-[#60a5fa] text-xs font-medium mb-7 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]" />
              </span>
              Trusted by Millions &middot; Available for Hire
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              <span className="gradient-text">Next-Gen</span>
              <br />
              Solutions for
              <br />
              <span className="text-white">The Modern Web</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="text-[#8a95a8] text-lg leading-relaxed mb-8 max-w-md"
            >
              Production-grade APIs and infrastructure on Cloudflare&apos;s
              edge, handling 10M+ daily requests. We build, ship, and consult.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {badges.map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.06, ease }}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-[#8a95a8] font-mono hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 cursor-default"
                >
                  {b}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#services"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] hover:bg-[#3b82f6] text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:shadow-xl"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://github.com/wyziedevs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 4 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="lg:animate-float"
            style={{ perspective: 1000 }}
          >
            <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a14] shadow-2xl shadow-black/50 overflow-hidden glow-card">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                <div className="ml-auto flex items-center gap-1.5 text-[#5a657a] text-xs">
                  <Terminal className="w-3 h-3" />
                  <span>wyzie-subs.ts</span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <pre className="text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap break-words">
                  {codeSample.split("\n").map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.7 + i * 0.05,
                        ease,
                      }}
                      className="flex"
                    >
                      <span className="select-none shrink-0 text-[#2a3040] text-right mr-4 text-xs leading-6 w-4">
                        {i + 1}
                      </span>
                      <span
                        className="text-[#d4dae4]"
                        dangerouslySetInnerHTML={{
                          __html: highlightLine(line),
                        }}
                      />
                    </motion.div>
                  ))}
                </pre>
              </div>

              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
                <div className="animate-beam absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.008] to-transparent skew-x-[-20deg]" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/[0.12] flex items-start justify-center p-1.5"
          >
            <div className="w-0.5 h-1.5 bg-white/20 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
