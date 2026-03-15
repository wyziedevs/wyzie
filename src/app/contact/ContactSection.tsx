"use client";

import { useState } from "react";
import {
  Reveal,
  StaggerContainer,
  StaggerItem,
  motion,
} from "@/components/Motion";
import { Mail, MessageSquare, ArrowRight, Send } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-blue-brand text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5"
          >
            Say Hello,
            <span className="gradient-text"> We&apos;d Love to Chat.</span>
          </motion.h1>
        </div>

        <StaggerContainer
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
          staggerDelay={0.15}
        >
          <StaggerItem className="lg:col-span-3">
            <div className="rounded-2xl bg-bg-surface border border-border-subtle p-6 sm:p-8 overflow-hidden relative glow-card">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-14 h-14 rounded-full bg-blue-brand/10 border border-blue-brand/20 flex items-center justify-center mb-5"
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="none"
                      stroke="var(--color-blue-pale)"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </motion.svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Ready to Send
                  </h3>
                  <p className="text-text-muted text-sm max-w-sm">
                    Your mail app opened with your message. Just hit send!
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const subject = formData.get("subject") as string;
                    const message = formData.get("message") as string;

                    const mailtoSubject = encodeURIComponent(
                      subject || "Contact from wyzie.io",
                    );
                    const mailtoBody = encodeURIComponent(message);
                    window.location.href = `mailto:hello@wyzie.io?subject=${mailtoSubject}&body=${mailtoBody}`;
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium text-text-muted mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      maxLength={200}
                      placeholder="What's this about?"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-border-muted text-base sm:text-sm text-white placeholder:text-text-subtle focus:outline-none focus:border-blue-brand/50 focus:ring-1 focus:ring-blue-brand/30 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-text-muted mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      maxLength={5000}
                      placeholder="Tell us about your project, timeline, and any requirements..."
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-border-muted text-base sm:text-sm text-white placeholder:text-text-subtle focus:outline-none focus:border-blue-brand/50 focus:ring-1 focus:ring-blue-brand/30 transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-brand hover:bg-blue-light text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:shadow-xl active:translate-y-px active:shadow-sm text-sm w-full sm:w-auto justify-center"
                  >
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2 space-y-5">
            <Reveal>
              <div className="rounded-xl bg-bg-surface border border-border-subtle p-5 glow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-brand/10 border border-blue-brand/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-pale" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Email</h3>
                </div>
                <p className="text-xs text-text-muted mb-3">
                  For business inquiries, partnerships, or custom development.
                </p>
                <button
                  type="button"
                  title="Click to copy email address"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText("hello@wyzie.io");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    } catch {
                      window.location.href = "mailto:hello@wyzie.io";
                    }
                  }}
                  className="text-sm text-blue-brand hover:text-blue-light font-medium transition-all duration-300 cursor-pointer"
                >
                  {copied ? (
                    <span className="text-emerald-400">
                      Copied to clipboard!
                    </span>
                  ) : (
                    "hello@wyzie.io"
                  )}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl bg-bg-surface border border-border-subtle p-5 glow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Discord</h3>
                </div>
                <p className="text-xs text-text-muted mb-3">
                  Join our community for support, updates, and quick questions.
                </p>
                <a
                  href="https://discord.gg/2mxraHBVtB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/discord inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors duration-300"
                >
                  Join Discord
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/discord:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
