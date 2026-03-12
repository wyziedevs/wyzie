"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal, motion } from "./Motion";
import { AnimatePresence } from "framer-motion";

const phrases = [
  { verb: "Build", noun: "Something Great." },
  { verb: "Ship", noun: "What Matters." },
  { verb: "Scale", noun: "Without Limits." },
  { verb: "Launch", noun: "Your Next Idea." },
  { verb: "Craft", noun: "Bold Solutions." },
];

export function CTASection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glow-card relative rounded-3xl bg-gradient-to-br from-[#0a0a14] via-[#0c0c1a] to-[#0a0a14] border border-white/[0.06] hover:border-[#2563eb]/30 p-8 sm:p-14 lg:p-20 overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none rounded-3xl" />

            <div className="relative max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.2]">
                <span className="block mb-1">
                  Let&apos;s{" "}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phrases[index].verb}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="inline-block"
                    >
                      {phrases[index].verb}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phrases[index].noun}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="gradient-text inline-block"
                  >
                    {phrases[index].noun}
                  </motion.span>
                </AnimatePresence>
              </h2>

              <p className="text-[#8a95a8] text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                Whether you need a custom web app, a complete platform, or a
                dedicated technology partner, we deliver solutions that work.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:shadow-xl text-sm"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
