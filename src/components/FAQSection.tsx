"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem, motion } from "./Motion";
import { AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What tech stack do you work with?",
    answer:
      "We specialize in TypeScript, Go, and Cloudflare Workers for edge-first development. On the frontend, we work with Next.js, Svelte, and React. We choose the right tool for the job, never force a stack.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most software projects ship within 2–6 weeks. Larger platforms or consulting engagements run 6–12 weeks. We'll give you a realistic timeline during our discovery call — no padding, no sandbagging.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. Every project includes 30 days of post-launch support. For long-term partnerships, we offer monthly retainer plans that cover monitoring, updates, and priority bug fixes with guaranteed response times.",
  },
  {
    question: "Can I use your open source projects commercially?",
    answer:
      "Absolutely. Our open source projects are MIT licensed, meaning you can use, modify, and distribute them freely — including in commercial products. No strings attached.",
  },
  {
    question: "What does your pricing look like?",
    answer:
      "Pricing depends on scope and complexity. Projects typically start at $5,000. Consulting engagements are billed hourly or as a fixed-price package. Reach out for a custom quote — we're transparent about costs from day one.",
  },
  {
    question: "How do I get started?",
    answer:
      "Email us at hello@wyzie.io or use our contact form to schedule a discovery call. We'll discuss your requirements, timeline, and budget — then provide a detailed proposal. No commitment required.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 relative">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-[#2563eb] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5">
            Common Questions
          </h2>
          <p className="text-[#8a95a8] text-lg max-w-md mx-auto leading-relaxed">
            Everything you need to know before working with us.
          </p>
        </Reveal>

        <StaggerContainer className="space-y-3" staggerDelay={0.08}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <StaggerItem key={i}>
                <div
                  className={`glow-card rounded-2xl bg-[#0a0a14] border overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "border-[#2563eb]/15 shadow-[0_0_24px_rgba(37,99,235,0.06)]"
                      : "border-white/[0.06] hover:border-white/[0.1]"
                  }`}
                >
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-px bg-gradient-to-r from-transparent via-[#2563eb]/25 to-transparent"
                      />
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-medium text-sm sm:text-base transition-colors duration-300 ${
                        isOpen
                          ? "text-white"
                          : "text-white/70 group-hover:text-white/90"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#2563eb]/10 border-[#2563eb]/15 text-[#60a5fa]"
                          : "bg-white/[0.03] border-white/[0.06] text-[#5a657a] group-hover:bg-white/[0.06]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="text-[#8a95a8] text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
