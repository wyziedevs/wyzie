"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { play } from "@/lib/sound";
import { sparksFrom } from "@/lib/sparks";
import { sites } from "@/lib/projects";

type Times = Record<string, number | null>;

const timed = sites.filter((site) => site.ping !== false);

/*
 * Every site we run, each timed from the visitor's own browser the moment the
 * panel is on screen: a warm-up request opens the connection, the second one
 * is the number shown. A real measurement, taken just now, rather than a
 * claim about uptime. A site that does not answer shows no number at all.
 */
async function roundTrip(href: string) {
  const once = async () => {
    const start = performance.now();
    await fetch(href, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    return performance.now() - start;
  };
  try {
    await once();
    return Math.max(1, Math.round(await once()));
  } catch {
    return null;
  }
}

/* Three bars under 90 ms, two under 220, one past that. */
function level(ms: number | null | undefined) {
  if (typeof ms !== "number") return 0;
  return ms < 90 ? 3 : ms < 220 ? 2 : 1;
}

export function SitesPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const alive = useRef(true);
  const [times, setTimes] = useState<Times>({});
  const [running, setRunning] = useState(false);

  // Each answer sounds as it lands, a faster site a higher note. Before the
  // visitor has pressed anything the audio is asleep, and these stay quiet.
  const measure = useCallback(() => {
    setRunning(true);
    setTimes({});
    let left = timed.length;
    timed.forEach((site, i) => {
      setTimeout(async () => {
        const ms = await roundTrip(site.href);
        if (!alive.current) return;
        setTimes((t) => ({ ...t, [site.host]: ms }));
        if (ms !== null) {
          play("blip", Math.min(1.5, Math.max(0.7, 1.45 - ms / 250)));
          // The answer lands with a spark off its signal bars.
          const bars = ref.current?.querySelector(
            `[data-host="${site.host}"] .signal`,
          );
          if (bars)
            sparksFrom(bars, {
              count: 5,
              reach: 20,
              spread: 140,
              fall: 10,
              tone: "live",
            });
        }
        if (--left === 0) setRunning(false);
      }, i * 110);
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    alive.current = true;
    let timer = 0;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      // Let the entrance play first; the numbers arrive as the rows settle.
      timer = window.setTimeout(measure, 900);
    });
    io.observe(el);

    return () => {
      alive.current = false;
      clearTimeout(timer);
      io.disconnect();
    };
  }, [measure]);

  const answered = Object.values(times).some((t) => t !== null);

  return (
    <div
      ref={ref}
      className="panel-3d spot rounded-panel border border-line bg-panel"
    >
      {/* Depth: a soft light behind the glass. */}
      <span aria-hidden="true" className="panel-plate" />
      <div className="panel-head flex items-center justify-between px-4 py-3">
        <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full transition-colors duration-500 ${
              answered ? "beat bg-live text-live" : "bg-line-strong"
            }`}
          />
          Live Now
        </p>
        <p className="text-overline uppercase text-ink-subtle">
          {sites.length} sites
        </p>
      </div>
      <ul className="panel-rows ruled px-4 [--row-bleed:0.5rem]">
        {sites.map((site, i) => {
          const ms = times[site.host];
          const pending = running && site.ping !== false && ms === undefined;
          return (
            <li
              key={site.host}
              data-host={site.host}
              data-tick
              className="line row-light relative"
              style={{ "--i": i } as CSSProperties}
            >
              <a
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ctl group flex items-center justify-between gap-4 py-2.5"
              >
                <span className="min-w-0">
                  <span className="ctl block truncate text-[0.9375rem] font-semibold text-ink group-hover:text-blue-ink">
                    {site.host}
                  </span>
                  <span className="block text-[0.8125rem] text-ink-subtle">
                    {site.what}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2.5">
                  {typeof ms === "number" && (
                    <span className="ping-in text-[0.8125rem] text-ink-subtle tabular-nums">
                      {ms} ms
                    </span>
                  )}
                  {site.ping !== false && (
                    <span
                      aria-hidden="true"
                      className="signal"
                      data-level={level(ms)}
                      data-pending={pending ? "" : undefined}
                    >
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-ink-subtle transition-[translate,color] duration-300 ease-enter group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
