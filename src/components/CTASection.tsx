import { ArrowRight, MessageSquare, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#2563eb]/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0d0d16] via-[#0f0f1e] to-[#0d0d16] border border-white/8 p-12 sm:p-16 overflow-hidden">
          {/* Inner glow accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563eb]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 via-transparent to-transparent pointer-events-none" />

          {/* Grid pattern */}
          <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none rounded-2xl" />

          <div className="relative max-w-2xl mx-auto text-center">
            <p className="text-[#2563eb] text-sm font-semibold uppercase tracking-wider mb-4">
              Hire Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5">
              Ready to build something{" "}
              <span className="gradient-text">great together?</span>
            </h2>
            <p className="text-[#94a3b8] text-lg leading-relaxed mb-10">
              Whether you need a custom API, a performance consultation, or a
              full-stack development partner — let&apos;s talk. We&apos;re open
              to new projects.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://discord.gg/2mxraHBVtB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#2563eb] hover:bg-[#3b82f6] text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-600/25 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on Discord
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@wyzie.io"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-all text-sm"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>

            {/* Trust signals */}
            <p className="mt-8 text-xs text-[#475569]">
              Typical response within 24 hours &middot; No commitment required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
