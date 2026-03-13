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

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-3"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5"
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
            <div className="rounded-2xl bg-[#0d0d16] border border-white/8 p-6 sm:p-8 overflow-hidden relative glow-card">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center mb-5">
                    <Mail className="w-7 h-7 text-[#60a5fa]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Mail Client Opened
                  </h3>
                  <p className="text-[#94a3b8] text-sm max-w-sm">
                    Your default mail app should have opened with the message
                    ready to send.
                  </p>
                </div>
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
                      className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/30 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-[#94a3b8] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project, timeline, and any requirements..."
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/30 transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 hover:shadow-xl text-sm w-full sm:w-auto justify-center"
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
              <div className="rounded-xl bg-[#0d0d16] border border-white/8 p-5 glow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#60a5fa]" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Email</h3>
                </div>
                <p className="text-xs text-[#94a3b8] mb-3">
                  For business inquiries, partnerships, or custom development.
                </p>
                <a
                  href="mailto:hello@wyzie.io"
                  className="text-sm text-[#2563eb] hover:text-[#3b82f6] font-medium transition-colors duration-300"
                >
                  hello@wyzie.io
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl bg-[#0d0d16] border border-white/8 p-5 glow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Discord</h3>
                </div>
                <p className="text-xs text-[#94a3b8] mb-3">
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
