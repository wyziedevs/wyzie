import { Github, MessageSquare } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "Wyzie Subs API", href: "https://sub.wyzie.ru" },
    { label: "Wyzie Lib (npm)", href: "https://www.npmjs.com/package/wyzie-lib" },
    { label: "Wyzie Worker", href: "https://github.com/wyziedevs/wyzie-worker" },
    { label: "i6.shark Proxy", href: "https://github.com/wyziedevs/i6.shark" },
  ],
  Documentation: [
    { label: "Getting Started", href: "https://docs.wyzie.ru" },
    { label: "Subs API Reference", href: "https://docs.wyzie.ru/subs/intro" },
    { label: "Usage Guide", href: "https://docs.wyzie.ru/subs/usage" },
    { label: "Donate", href: "https://donate.cozi.lol" },
  ],
  Company: [
    { label: "GitHub Organization", href: "https://github.com/wyziedevs" },
    { label: "Discord Community", href: "https://discord.gg/2mxraHBVtB" },
    { label: "Work With Us", href: "#contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-10 border-t border-white/6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#2563eb] flex items-center justify-center shadow-md shadow-blue-600/25">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h5v2H2V4zm0 6h5v2H2v-2zm7-6l5 4-5 4V4z" fill="white" fillOpacity="0.95" />
                </svg>
              </div>
              <span className="text-[15px] font-bold text-white">Wyzie</span>
            </div>
            <p className="text-[#64748b] text-xs leading-relaxed mb-5">
              Technology solutions company building APIs, open source tools,
              and consulting services for the modern web.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/wyziedevs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-[#94a3b8] hover:text-white transition-all"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://discord.gg/2mxraHBVtB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-[#94a3b8] hover:text-white transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/6">
          <p className="text-[11px] text-[#475569]">
            &copy; {currentYear} Wyzie. All rights reserved.
          </p>
          <p className="text-[11px] text-[#475569]">
            Built with{" "}
            <span className="text-[#60a5fa]">Next.js</span>,{" "}
            <span className="text-[#60a5fa]">Radix UI</span> &amp;{" "}
            <span className="text-[#60a5fa]">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
