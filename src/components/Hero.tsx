"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroWords = [
  "Next-Gen",
  "Bespoke",
  "Scalable",
  "Modern",
  "Powerful",
];


const badges = [
  "Enterprise",
  "Edge Computing",
  "Business Solutions",
  "Open Source",
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % heroWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-grid">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 w-full">
        <div className="grid gap-12 lg:gap-16 items-center max-w-2xl">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2563eb]/20 bg-[#2563eb]/[0.06] text-[#60a5fa] text-xs font-medium mb-7 backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.08)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]" />
              </span>
              Trusted by Millions Worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="hero-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroWords[wordIndex]}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="gradient-text inline-block"
                >
                  {heroWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
              <br />
              Solutions for
              <br />
              <span className="text-white">The Modern Web</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="text-[#8a95a8] text-lg leading-relaxed mb-8 max-w-lg"
            >
              We craft software solutions, from full-stack web
              applications to edge infrastructure. We design, build, and deliver
              technology that drives your business forward.
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
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </div>
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
