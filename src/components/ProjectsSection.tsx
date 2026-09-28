import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ApiPanel } from "./ApiPanel";
import {
  catalog,
  catalogSize,
  showcase,
  statusLabel,
  subs,
  type Entry,
  type Group,
  type Showcase,
  type Status,
} from "@/lib/projects";
import { Headline, Reveal } from "./ui";

export function ProjectsSection() {
  return (
    <section id="work" className="sweep border-t border-line">
      <div className="mx-auto w-full max-w-page px-4 py-section sm:px-6">
        <Headline text="Things We Built" className="mb-14 max-w-reading" />

        <SubsFeature />

        <div className="mt-24">
          <div className="grid gap-x-8 gap-y-16 lg:grid-cols-2">
            {showcase.map((project, i) => (
              <ProjectShot key={project.id} project={project} delay={i * 120} />
            ))}
          </div>
        </div>

        <FullList />
      </div>
    </section>
  );
}

/* Wyzie Subs, the flagship: one product, shown by what it does. */
function SubsFeature() {
  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-5">
        <h3 className="flex flex-wrap items-baseline gap-x-3 text-display-md text-ink">
          {subs.name}
          <span className="text-sm font-normal tracking-normal text-ink-subtle">
            {subs.kind}
          </span>
        </h3>
        <p className="mt-4 text-standfirst text-ink-muted">{subs.summary}</p>
        <ul className="ruled mt-7 border-y border-line">
          {subs.facts.map((fact) => (
            <li key={fact} className="py-3 text-[0.9375rem] text-ink">
              {fact}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-ink-subtle">{subs.stack}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {subs.links.map((link) => (
            <OutLink key={link.href} href={link.href}>
              {link.label}
            </OutLink>
          ))}
        </div>
      </Reveal>

      <Reveal delay={160} className="lg:col-span-7">
        <div className="frame-in">
          <ApiPanel />
        </div>
      </Reveal>
    </div>
  );
}

function ProjectShot({ project, delay }: { project: Showcase; delay: number }) {
  return (
    <Reveal as="figure" delay={delay}>
      {/* The frame tips up to face the reader as it scrolls in, and turns
          toward the pointer while it is over it (Tactile). */}
      <div data-field className="frame-in rounded-panel">
        <div className="tilt glow-under [--tilt:3.5deg]">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ctl spot group block rounded-panel border border-line bg-panel hover:[--spot-line:var(--color-line-strong)]"
          >
            <span className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5">
              <span className="ctl truncate text-[0.8125rem] text-ink-subtle group-hover:text-ink-muted">
                {project.host}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-ink-subtle transition-[translate,color] duration-300 ease-enter group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              />
            </span>
            <span className="shine block aspect-[16/10] overflow-hidden rounded-b-panel bg-page">
              {/* Pre-sized WebP at two widths; the Pages build has no image optimizer. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${project.shot.src}-1600.webp`}
                srcSet={`${project.shot.src}-800.webp 800w, ${project.shot.src}-1600.webp 1600w`}
                sizes="(min-width: 1024px) 570px, 100vw"
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                alt={project.shot.alt}
                className="h-full w-full object-cover object-top transition-[scale] duration-[1200ms] ease-enter group-hover:scale-[1.025]"
              />
            </span>
          </a>
        </div>
      </div>
      <figcaption className="mt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-[1.1875rem] font-semibold tracking-[-0.01em] text-ink">
            {project.name}
          </h3>
          {project.status !== "live" && <StatusTag status={project.status} />}
          <span className="text-sm text-ink-subtle">{project.kind}</span>
        </div>
        <p className="mt-2 max-w-reading text-standfirst text-ink-muted">
          {project.summary}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          <span className="text-ink-subtle">{project.stack}</span>
          {project.source && (
            <OutLink href={project.source} small>
              Source
            </OutLink>
          )}
        </div>
      </figcaption>
    </Reveal>
  );
}

/*
 * Everything, as a dense index rather than more cards: a name, what it is,
 * what it runs on, and where to find it. The name is the row's link and
 * stretches over the whole row; the source link sits above that stretch so
 * both work. The arrow means a site you can open; "Source" means the code.
 */
function FullList() {
  return (
    <div className="mt-section">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <Headline
          text="Everything We've Made"
          size="md"
          className="max-w-reading"
        />
        <Reveal delay={160}>
          <p className="text-sm text-ink-subtle">
            {catalogSize} projects ·{" "}
            <a
              href="https://github.com/wyziedevs"
              target="_blank"
              rel="noopener noreferrer"
              className="ctl font-semibold text-blue-ink hover:text-ink"
            >
              GitHub
            </a>
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-14">
        {catalog.map((group) => (
          <Reveal key={group.group}>
            <div className="border-b border-line pb-3">
              <GroupHeading group={group} />
            </div>
            <Rows entries={group.entries} flushTop />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function GroupHeading({ group }: { group: Group }) {
  return (
    <h3 className="text-[1.1875rem] font-semibold tracking-[-0.01em] text-ink">
      {group.group}
      <span className="ml-2 text-sm font-normal text-ink-subtle tabular-nums">
        {group.entries.length}
      </span>
    </h3>
  );
}

function Rows({ entries, flushTop }: { entries: Entry[]; flushTop?: boolean }) {
  return (
    <ul className={`ruled border-b border-line ${flushTop ? "" : "border-t"}`}>
      {entries.map((entry) => {
        const target = entry.href ?? entry.source;
        return (
          <li
            key={entry.name}
            data-tick={target ? "" : undefined}
            className={`group relative grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-6 ${target ? "row-light" : ""}`}
          >
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:col-span-3">
              {target ? (
                <a
                  href={target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ctl text-[1.0625rem] font-semibold text-ink group-hover:text-blue-ink after:absolute after:inset-0 after:content-['']"
                >
                  {/* Only the text moves: a moved link would pull the row-wide hit area in with it. */}
                  <span className="inline-block transition-[translate] duration-300 ease-enter group-hover:translate-x-1">
                    {entry.name}
                  </span>
                </a>
              ) : (
                <span className="text-[1.0625rem] font-semibold text-ink">
                  {entry.name}
                </span>
              )}
              {entry.status !== "live" && <StatusTag status={entry.status} />}
            </div>
            <p className="col-start-1 text-[0.9375rem] text-ink-muted sm:col-span-6 sm:col-start-auto">
              {entry.summary}
            </p>
            <p className="col-start-1 text-sm text-ink-subtle sm:col-span-2 sm:col-start-auto">
              {entry.stack}
            </p>
            <div className="col-start-2 row-span-3 row-start-1 flex items-center justify-end gap-3 self-start sm:col-span-1 sm:col-start-auto sm:row-span-1 sm:row-start-auto sm:self-baseline">
              {entry.source && (
                <a
                  href={entry.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ctl relative z-10 text-sm text-ink-subtle underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink-subtle"
                >
                  Source
                </a>
              )}
              {/* The arrow's slot is kept even when empty, so every "Source" lines up. */}
              <span className="flex w-4 shrink-0 justify-end">
                {entry.href && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-ink-subtle transition-[translate,color] duration-300 ease-enter group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const statusTone: Record<Status, string> = {
  live: "text-live",
  beta: "text-blue-ink",
  sunset: "text-sunset",
  superseded: "text-ink-subtle",
};

export function StatusTag({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-control border border-line px-1.5 py-0.5 text-overline uppercase ${statusTone[status]}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current"
      />
      {statusLabel[status]}
    </span>
  );
}

function OutLink({
  href,
  children,
  small,
}: {
  href: string;
  children: ReactNode;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ctl group/out inline-flex items-center gap-1 font-semibold text-blue-ink hover:text-ink ${small ? "text-sm" : "text-[0.9375rem]"}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-[translate] duration-300 ease-enter group-hover/out:translate-x-0.5 group-hover/out:-translate-y-0.5"
      />
    </a>
  );
}
