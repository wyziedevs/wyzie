import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { Headline, Reveal } from "./ui";
import { JsonLd, breadcrumbs } from "@/lib/seo";

/* The pages about the company, each with a line on what it answers. */
export const companyPages = [
  {
    href: "/mission",
    title: "Our Mission",
    line: "Why Wyzie exists and what we are here to do.",
  },
  {
    href: "/values",
    title: "Our Values",
    line: "What we hold to on every project, ours or yours.",
  },
  {
    href: "/how-we-work",
    title: "How We Work",
    line: "A project from the first email to the years after launch.",
  },
  {
    href: "/open-source",
    title: "Open Source",
    line: "The code we publish, and why we publish it.",
  },
] as const;

type CompanyHref = (typeof companyPages)[number]["href"];

/*
 * A page about the company: the header, a headline with its lead, the
 * page's own sections, the rest of the company pages as rows, the contact
 * band and the footer.
 */
export function CompanyPage({
  title,
  lead,
  current,
  cta,
  children,
}: {
  title: string;
  lead: ReactNode;
  current?: CompanyHref;
  cta?: string;
  children: ReactNode;
}) {
  return (
    <>
      {current && <JsonLd data={breadcrumbs(title, current)} />}
      <Navigation />
      <main id="main">
        <section className="mx-auto w-full max-w-page px-4 pt-section-tight pb-section sm:px-6">
          <div className="max-w-[52rem]">
            <Headline instant as="h1" size="xl" text={title} delay={80} />
            <Reveal instant delay={420}>
              <div className="mt-7 max-w-reading text-lead text-ink-muted">
                {lead}
              </div>
            </Reveal>
          </div>
        </section>

        {children}

        <MorePages current={current} />

        <CTASection heading={cta} />
      </main>
      <Footer />
    </>
  );
}

/*
 * A section of ruled rows: the heading on the left, the rows on the right,
 * each row lighting its rule as it passes the middle of the screen.
 */
export function RuledSection({
  heading,
  intro,
  rows,
}: {
  heading: string;
  intro?: ReactNode;
  rows: { title: string; body: ReactNode }[];
}) {
  return (
    <section className="sweep border-t border-line">
      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-section sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Headline text={heading} />
          {intro && (
            <Reveal delay={200}>
              <div className="mt-5 max-w-[26rem] text-standfirst text-ink-muted">
                {intro}
              </div>
            </Reveal>
          )}
        </div>
        <ul className="ruled border-y border-line lg:col-span-8">
          {rows.map((row, i) => (
            <Reveal
              as="li"
              key={row.title}
              delay={i * 60}
              className="scan py-7"
            >
              <h3 className="text-display-md text-ink">{row.title}</h3>
              <div className="mt-3 max-w-reading text-standfirst text-ink-muted">
                {row.body}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* The other company pages, as rows that warm and tick under the pointer. */
export function MorePages({
  current,
  heading = "More About Wyzie",
}: {
  current?: CompanyHref;
  heading?: string;
}) {
  const pages = companyPages.filter((p) => p.href !== current);
  return (
    <section className="sweep border-t border-line">
      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-section sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Headline text={heading} />
        </div>
        <ul className="ruled border-y border-line lg:col-span-8">
          {pages.map((p, i) => (
            <Reveal
              as="li"
              key={p.href}
              delay={i * 50}
              className="scan group relative row-light"
            >
              <a
                href={p.href}
                data-tick
                className="ctl flex items-center justify-between gap-6 py-6"
              >
                <span>
                  <span className="block text-[1.1875rem] font-semibold tracking-[-0.01em] text-ink transition-[translate,color] duration-300 ease-enter group-hover:translate-x-1 group-hover:text-blue-ink">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-ink-muted">
                    {p.line}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-ink-subtle transition-[translate,color] duration-300 ease-enter group-hover:translate-x-1 group-hover:text-ink"
                />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A link inside running copy. */
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="ctl font-semibold text-blue-ink hover:text-ink"
    >
      {children}
    </a>
  );
}
