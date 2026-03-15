import { ArrowRight } from "lucide-react";
import { Reveal } from "./Motion";

export function CTASection() {
  return (
    <section id="contact" className="py-16 sm:py-28 relative overflow-hidden">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glow-card relative rounded-3xl bg-gradient-to-br from-bg-surface via-[#0c0c1a] to-bg-surface border border-border-subtle hover:border-blue-brand/30 p-8 sm:p-14 lg:p-20 overflow-hidden transition-colors duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-brand/20 to-transparent" />

            <div className="relative max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
                Let&apos;s build{" "}
                <span className="gradient-text">something great.</span>
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
