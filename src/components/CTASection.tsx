"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Motion";

const words = [
  "Something Great",
  "Your Next Product",
  "For the Future",
  "What Matters",
];

export function CTASection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-16 sm:py-28 relative overflow-hidden">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glow-card relative rounded-3xl bg-gradient-to-br from-bg-surface via-[#0c0c1a] to-bg-surface border border-border-subtle hover:border-blue-brand/30 p-8 sm:p-14 lg:p-20 overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-brand/20 to-transparent" />

            <div className="relative max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
                Let&apos;s build
                <span
                  className="block overflow-hidden"
                  style={{ height: "1.3em" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[index]}
                      initial={{ opacity: 0, y: "100%" }}
                      animate={{ opacity: 1, y: "0%" }}
                      exit={{ opacity: 0, y: "-100%" }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="gradient-text block"
                    >
                      {words[index]}.
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>

              <p className="text-text-muted text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                Whether you need a custom web app, a complete platform, or a
                dedicated technology partner, we deliver solutions that work.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-blue-brand hover:bg-blue-light text-white font-medium rounded-xl transition-all duration-300 shadow-md shadow-blue-600/15 hover:shadow-blue-600/20 active:translate-y-px active:shadow-sm text-sm"
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
