"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
      "Most software projects ship within 2–6 weeks. Larger platforms or consulting engagements run 6–12 weeks. We'll give you a realistic timeline during our discovery call. No inflated estimates, no surprises.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. Every project includes 30 days of post-launch support. For long-term partnerships, we offer monthly retainer plans that cover monitoring, updates, and priority bug fixes.",
  },
  {
    question: "Can I use your open source projects commercially?",
    answer:
      "Absolutely. Our open source projects are MIT licensed, meaning you can use, modify, and distribute them freely; including in commercial products. No strings attached.",
  },
  {
    question: "What does your pricing look like?",
    answer:
      "Pricing depends on scope and complexity. Projects typically start at $5,000. Consulting engagements are billed hourly or as a fixed-price package. Reach out for a custom quote, we're transparent about costs from day one.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply email us at hello@wyzie.io. We'll set up a quick discovery consultation to understand your needs and go from there. No commitment required.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-28 relative section-glow">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5">
            Common Questions
          </h2>
          <p className="text-text-muted text-lg max-w-md mx-auto leading-relaxed">
            Everything you need to know about working with us.
          </p>
        </Reveal>

        <StaggerContainer className="space-y-3" staggerDelay={0.08}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <StaggerItem key={faq.question}>
                <div
                  className={`glow-card rounded-2xl bg-bg-surface border overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "border-blue-brand/15 shadow-[0_0_24px_rgba(37,99,235,0.06)]"
                      : "border-border-subtle hover:border-border-muted"
                  }`}
                >
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-px bg-gradient-to-r from-transparent via-blue-brand/25 to-transparent"
                      />
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left group cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span
                      id={`faq-question-${i}`}
                      className={`font-medium text-sm sm:text-base transition-colors duration-300 ${
                        isOpen
                          ? "text-white"
                          : "text-white/70 group-hover:text-white/90"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={`shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-blue-brand/10 border-blue-brand/15 text-blue-pale"
                          : "bg-white/[0.03] border-border-subtle text-text-subtle group-hover:bg-white/[0.06]"
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
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
                          <p className="text-text-muted text-sm leading-relaxed">
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
