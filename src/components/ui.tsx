import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "li" | "header" | "figure" | "p";

/** Rises into place the first time it scrolls into view (globals.css). */
export function Reveal({
  as: El = "div",
  delay = 0,
  className,
  children,
  id,
  instant,
}: {
  as?: Tag;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
  /** Above the fold: plays on first paint instead of on scroll. */
  instant?: boolean;
}) {
  return (
    <El
      id={id}
      data-instant={instant ? "" : undefined}
      className={cn("reveal", className)}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </El>
  );
}

const headlineSizes = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
} as const;

/**
 * A headline whose words arrive one at a time, each out of its own mask. The
 * sentence stays one sentence to a screen reader and to the clipboard.
 */
export function Headline({
  text,
  as: El = "h2",
  size = "lg",
  delay = 0,
  className,
  instant,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof headlineSizes;
  delay?: number;
  className?: string;
  /** Above the fold: plays on first paint instead of on scroll. */
  instant?: boolean;
}) {
  const words = text.split(" ");
  return (
    <El
      data-instant={instant ? "" : undefined}
      className={cn(
        "headline reveal text-ink text-balance",
        headlineSizes[size],
        className,
      )}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="mask">
            <span className="word" style={{ "--i": i } as CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </El>
  );
}

const buttonVariants = {
  primary:
    "btn-lit bg-blue text-on-blue hover:bg-blue-hover border border-transparent",
  secondary:
    "bg-transparent text-ink border border-line-strong hover:bg-raised hover:border-ink-subtle",
  inverse:
    "btn-lit bg-on-blue text-blue-deep hover:bg-on-blue-muted border border-transparent [--glint:oklch(0.55_0.2_263/0.16)] [--btn-glow:oklch(0.98_0.02_258/0.45)]",
} as const;

const buttonSizes = {
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-[0.9375rem]",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  className,
  children,
  external,
}: {
  href: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-tick
      className={cn(
        "ctl press group inline-flex items-center justify-center gap-2 rounded-control font-semibold whitespace-nowrap",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Opens a site that is not wyzie.io in a new tab. */
export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
