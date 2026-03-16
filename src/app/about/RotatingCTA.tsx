"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "something great",
  "your next product",
  "for the future",
  "what matters",
];

export function RotatingCTA() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.2]">
        Let&apos;s build{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="gradient-text inline-block"
          >
            {words[index]}.
          </motion.span>
        </AnimatePresence>
      </h2>
    </div>
  );
}
