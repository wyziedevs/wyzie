"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SoundToggle } from "./SoundToggle";
import { ButtonLink } from "./ui";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "GitHub", href: "https://github.com/wyziedevs", external: true },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line bg-page">
      <a
        href="#main"
        data-sound="none"
        className="sr-only rounded-control bg-blue px-4 py-2 text-sm font-semibold text-on-blue focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-4 focus-visible:z-10"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-page items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="ctl -mx-1 flex items-center rounded-control px-1 py-1"
        >
          <span className="logo-glint">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-header.png"
              alt="Wyzie"
              width={177}
              height={65}
              fetchPriority="high"
              className="h-6 w-auto"
            />
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="ctl draw-line rounded-control px-3 py-1.5 text-sm text-ink-muted [--line-bottom:0.2rem] [--line-inset:0.75rem] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <SoundToggle className="ml-1" />
          <ButtonLink href="/contact" size="md" className="ml-2">
            Start a Project
          </ButtonLink>
        </div>

        <div className="-mr-2 flex items-center gap-1 md:hidden">
          <SoundToggle className="h-11 w-11" />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            data-sound={open ? "close" : "open"}
            onClick={() => setOpen((o) => !o)}
            className="ctl press flex h-11 w-11 items-center justify-center rounded-control text-ink-muted hover:bg-raised hover:text-ink"
          >
            {/* Both icons are always there; one turns into the other. */}
            <span
              aria-hidden="true"
              className="menu-icon"
              data-open={open ? "" : undefined}
            >
              <Menu className="h-5 w-5" />
              <X className="h-5 w-5" />
            </span>
          </button>
        </div>
      </nav>

      <div
        aria-hidden="true"
        data-open={open ? "" : undefined}
        data-sound="close"
        onClick={() => setOpen(false)}
        className="menu-scrim md:hidden"
      />

      {/* Drops from under the header and folds back up into it; while shut
          it is inert, so neither focus nor a screen reader finds it. */}
      <div
        id="mobile-menu"
        inert={!open}
        data-open={open ? "" : undefined}
        className="mobile-menu border-b border-line bg-page px-4 pb-5 md:hidden"
      >
        <ul className="ruled">
          {navLinks.map((link, i) => (
            <li key={link.label} style={{ "--i": i } as CSSProperties}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="ctl block py-3.5 text-[0.9375rem] text-ink-muted hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ "--i": navLinks.length } as CSSProperties}>
          <ButtonLink href="/contact" className="mt-3 w-full">
            Start a Project
          </ButtonLink>
        </div>
      </div>

      {/* How far down the page, as a beam along the header's edge. */}
      <span aria-hidden="true" className="scroll-beam" />
    </header>
  );
}
