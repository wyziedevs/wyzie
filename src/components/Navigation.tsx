"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Documentation", href: "https://docs.wyzie.io", external: true },
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
        "fixed top-0 inset-x-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-[#050508]/80 backdrop-blur-xl border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent border-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <Image
              src="/logo-header.png"
              alt="Wyzie"
              width={140}
              height={44}
              className="h-11 w-auto"
              priority
            />
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
                  <Image src="/logo-header.png" alt="Wyzie" width={110} height={36} className="h-9 w-auto" />
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
                <div className="mt-auto">
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
