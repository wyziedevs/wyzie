"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
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
        "fixed top-0 inset-x-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "bg-[#050508]/70 backdrop-blur-2xl border-white/[0.04] shadow-lg shadow-black/30"
          : "bg-transparent border-transparent",
      )}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center select-none">
            <Image
              src="/logo-header.png"
              alt="Wyzie"
              width={85}
              height={30}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-3.5 py-1.5 text-sm text-[#8a95a8] hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/contact"
              className="px-4 py-2 text-sm font-medium bg-[#2563eb] hover:bg-[#3b82f6] text-white rounded-xl transition-all duration-300 shadow-md shadow-blue-600/15 hover:shadow-blue-600/25"
            >
              Work With Us
            </a>
          </div>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="md:hidden p-2 rounded-lg text-[#8a95a8] hover:text-white hover:bg-white/[0.05] transition-all duration-300">
                <Menu className="w-5 h-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed top-0 right-0 h-full w-72 bg-[#0a0a14] border-l border-white/[0.06] z-50 flex flex-col p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
                <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
                <div className="flex items-center justify-between mb-6">
                  <Image
                    src="/logo-header.png"
                    alt="Wyzie"
                    width={85}
                    height={30}
                  />
                  <Dialog.Close asChild>
                    <button className="p-1.5 rounded-md text-[#8a95a8] hover:text-white hover:bg-white/[0.05] transition-all duration-300">
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
                        className="px-3 py-2.5 text-sm text-[#8a95a8] hover:text-white hover:bg-white/[0.05] rounded-lg transition-all duration-300"
                      >
                        {link.label}
                      </a>
                    </Dialog.Close>
                  ))}
                </div>
                <div className="mt-auto">
                  <a
                    href="/contact"
                    className="block w-full text-center px-4 py-2.5 text-sm font-medium bg-[#2563eb] hover:bg-[#3b82f6] text-white rounded-xl transition-all duration-300"
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
