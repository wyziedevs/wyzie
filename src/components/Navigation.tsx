"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Documentation", href: "https://docs.wyzie.ru", external: true },
  { label: "GitHub", href: "https://github.com/wyziedevs", external: true },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors shadow-lg shadow-blue-500/25">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h5v2H2V4zm0 6h5v2H2v-2zm7-6l5 4-5 4V4z"
                  fill="white"
                  fillOpacity="0.95"
                />
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-tight text-white">
              Wyzie
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-3 py-1.5 text-sm text-[#94a3b8] hover:text-white rounded-md hover:bg-white/5 transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://discord.gg/2mxraHBVtB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#94a3b8] hover:text-white transition-colors"
            >
              Discord
            </a>
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium bg-[#2563eb] hover:bg-[#3b82f6] text-white rounded-lg transition-all duration-150 shadow-md shadow-blue-600/20"
            >
              Work With Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all">
                <Menu className="w-5 h-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed top-0 right-0 h-full w-72 bg-[#0d0d16] border-l border-white/8 z-50 flex flex-col p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-200">
                <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[15px] font-bold text-white">Wyzie</span>
                  <Dialog.Close asChild>
                    <button className="p-1.5 rounded-md text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Dialog.Close key={link.label} asChild>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="px-3 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {link.label}
                      </a>
                    </Dialog.Close>
                  ))}
                </div>
                <div className="mt-auto space-y-3">
                  <a
                    href="https://discord.gg/2mxraHBVtB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2.5 text-sm text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
                  >
                    Join Discord
                  </a>
                  <a
                    href="#contact"
                    className="block w-full text-center px-4 py-2.5 text-sm font-medium bg-[#2563eb] hover:bg-[#3b82f6] text-white rounded-lg transition-all"
                    onClick={() => setOpen(false)}
                  >
                    Work With Us
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
