"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { motion } from "@/components/Motion";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/about" },
  { label: "GitHub", href: "https://github.com/wyziedevs", external: true },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const shouldReduce = useReducedMotion();

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
          ? "bg-bg-base/85 backdrop-blur-md border-white/[0.04] shadow-lg shadow-black/30"
          : "bg-transparent border-transparent",
      )}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center select-none">
            <Image
              src="/logo-header.png"
              alt="Wyzie"
              width={85}
              height={30}
              priority
              className="transition-[filter] duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]"
            />
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="relative px-3.5 py-1.5 text-sm text-text-nav hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/contact"
              className="px-4 py-2 text-sm font-medium bg-blue-brand hover:bg-blue-light text-white rounded-xl transition-all duration-300 shadow-md shadow-blue-600/15 hover:shadow-[0_4px_20px_rgba(37,99,235,0.35)] active:translate-y-px active:shadow-sm"
            >
              Work With Us
            </a>
          </div>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                aria-label="Open menu"
                className="md:hidden p-2.5 min-w-11 min-h-11 flex items-center justify-center rounded-lg text-text-nav hover:text-white hover:bg-white/[0.05] transition-all duration-300"
              >
                <Menu className="w-5 h-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed top-0 right-0 h-full w-[min(18rem,85vw)] bg-bg-surface border-l border-border-subtle z-50 flex flex-col p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
                <Dialog.Title className="sr-only">Navigation Menu</Dialog.Title>
                <div className="flex items-center justify-between mb-6">
                  <Image
                    src="/logo-header.png"
                    alt="Wyzie"
                    width={85}
                    height={30}
                  />
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close menu"
                      className="p-2.5 min-w-11 min-h-11 flex items-center justify-center rounded-md text-text-nav hover:text-white hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <Dialog.Close key={link.label} asChild>
                      <motion.a
                        href={link.href}
                        initial={shouldReduce ? false : { opacity: 0, x: 16 }}
                        animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.08 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="px-3 py-2.5 text-sm text-text-nav hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors duration-300"
                      >
                        {link.label}
                      </motion.a>
                    </Dialog.Close>
                  ))}
                </div>
                <div className="mt-auto">
                  <motion.a
                    href="/contact"
                    initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                    animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="block w-full text-center px-4 py-2.5 text-sm font-medium bg-blue-brand hover:bg-blue-light text-white rounded-xl transition-all duration-300 active:translate-y-px"
                    onClick={() => setOpen(false)}
                  >
                    Work With Us
                  </motion.a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
