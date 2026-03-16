import Image from "next/image";
import { Reveal } from "./Motion";
import { Github, MessageCircle } from "lucide-react";

const footerLinks = {
  Projects: [
    { label: "Wyzie Subs API", href: "https://sub.wyzie.io" },
    {
      label: "Wyzie Lib (npm)",
      href: "https://www.npmjs.com/package/wyzie-lib",
    },
    { label: "i6.shark Proxy", href: "https://github.com/wyziedevs/i6.shark" },
  ],
  Documentation: [
    { label: "Getting Started", href: "https://docs.wyzie.io" },
    { label: "Subs API Reference", href: "https://docs.wyzie.io/subs/intro" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "GitHub Organization", href: "https://github.com/wyziedevs" },
    { label: "Discord Community", href: "https://discord.gg/2mxraHBVtB" },
    { label: "Work With Us", href: "/contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 border-t border-white/[0.04]">
      <div className="section-divider absolute top-0 inset-x-0" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-14">
            <div className="col-span-2 md:col-span-1 mb-2 md:mb-0">
              <div className="flex items-center gap-2.5 mb-4">
                <Image
                  src="/logo-header.png"
                  alt="Wyzie"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-text-subtle text-sm sm:text-xs leading-relaxed mb-5">
                Bespoke software company building web applications, open source
                tools, and offering consulting services for the modern web.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/wyziedevs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-white/[0.04] border border-border-subtle flex items-center justify-center text-text-subtle hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.gg/2mxraHBVtB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-white/[0.04] border border-border-subtle flex items-center justify-center text-text-subtle hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                  aria-label="Discord"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white/80 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-sm sm:text-xs text-text-subtle hover:text-text-muted transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-text-footer">
            &copy; {currentYear} Wyzie. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              className="text-xs text-text-footer hover:text-text-muted transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs text-text-footer hover:text-text-muted transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
