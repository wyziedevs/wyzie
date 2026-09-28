"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { play } from "@/lib/sound";
import { sparksFrom } from "@/lib/sparks";

/*
 * One real request and the shape of what comes back, drawn rather than
 * screenshotted: sub.wyzie.io is an API, and an API's face is its response.
 * Pick another language and the request changes and the response streams in
 * again, the way it would.
 */
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
] as const;

type Code = (typeof languages)[number]["code"];

const base = "sub.wyzie.io/search?id=tt3659388&language=";

export function ApiPanel() {
  const [lang, setLang] = useState<Code>("en");
  const [changed, setChanged] = useState(false);
  const [copied, setCopied] = useState(false);
  const index = languages.findIndex((l) => l.code === lang);
  const current = languages[index];

  const response: [string, string][] = [
    ["media", '"The Martian"'],
    ["display", `"${current.name}"`],
    ["language", `"${current.code}"`],
    ["format", '"srt"'],
    ["encoding", '"UTF-8"'],
    ["isHearingImpaired", "false"],
    ["source", '"charlie"'],
    ["url", '"https://sub.wyzie.io/c/…"'],
  ];

  const lines: ReactNode[] = [
    <span key="open" className="text-ink-subtle">
      {"["}
    </span>,
    <span key="obj" className="text-ink-subtle">
      {"  {"}
    </span>,
    ...response.map(([key, value], i) => (
      <span key={key}>
        {"    "}
        <span className="text-ink-subtle">&quot;{key}&quot;</span>
        <span className="text-ink-subtle">: </span>
        <span className={value.startsWith('"') ? "text-blue-ink" : "text-ink"}>
          {value}
        </span>
        <span className="text-ink-subtle">
          {i < response.length - 1 ? "," : ""}
        </span>
      </span>
    )),
    <span key="close" className="text-ink-subtle">
      {"  },"}
    </span>,
    <span key="more" className="text-ink-subtle">
      {"  …"}
    </span>,
    <span key="end" className="text-ink-subtle">
      {"]"}
    </span>,
  ];

  return (
    <div className="spot rounded-panel border border-line bg-panel">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">Search by IMDb ID</p>
        <p
          key={lang}
          className="ping-in text-overline uppercase text-ink-subtle"
        >
          200 OK
        </p>
      </div>

      <div className="flex items-start justify-between gap-3 border-b border-line py-2 pr-2 pl-4">
        <p
          tabIndex={0}
          role="region"
          aria-label="Request"
          className="ctl min-w-0 overflow-x-auto rounded-control py-1 font-mono text-[0.8125rem] leading-relaxed whitespace-nowrap"
        >
          <span className="font-semibold text-blue-ink">GET</span>{" "}
          <span className="text-ink">{base}</span>
          <span key={lang} className={changed ? "flash text-ink" : "text-ink"}>
            {lang}
          </span>
          <span className="text-ink">&amp;key=</span>
          <span className="text-ink-subtle">YOUR_KEY</span>
        </p>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy the request"}
          title="Copy the request"
          onClick={async (e) => {
            const button = e.currentTarget;
            try {
              await navigator.clipboard.writeText(
                `https://${base}${lang}&key=YOUR_KEY`,
              );
              setCopied(true);
              play("success");
              sparksFrom(button, { count: 8, reach: 30, tone: "live" });
              setTimeout(() => setCopied(false), 1800);
            } catch {
              /* No clipboard: the request is right there to select. */
            }
          }}
          className="ctl press flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-ink-subtle hover:bg-raised hover:text-ink"
        >
          {copied ? (
            <Check
              aria-hidden="true"
              className="check-draw h-4 w-4 text-live"
            />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>

      <pre
        tabIndex={0}
        role="region"
        aria-label="Response"
        className="ctl overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed"
      >
        {/* A new language streams in sooner than the first response did. */}
        <code
          key={lang}
          style={
            changed ? ({ "--delay": "-220ms" } as CSSProperties) : undefined
          }
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className="line block"
              style={{ "--i": i } as CSSProperties}
            >
              {line}
            </span>
          ))}
        </code>
      </pre>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-4 py-2.5">
        <p className="text-[0.8125rem] text-ink-subtle">Language</p>
        <div
          role="radiogroup"
          aria-label="Response language"
          className="relative flex gap-1"
        >
          {/* Chips are all one width, so the pill slides by whole steps. */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-9 rounded-control bg-raised shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-[translate] duration-500 ease-enter"
            style={{ translate: `${index * 2.5}rem 0` }}
          />
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              role="radio"
              aria-checked={l.code === lang}
              onClick={() => {
                setLang(l.code);
                setChanged(true);
              }}
              className={`ctl press relative w-9 rounded-control py-1 font-mono text-[0.8125rem] ${
                l.code === lang
                  ? "text-ink"
                  : "text-ink-subtle hover:text-ink-muted"
              }`}
            >
              {l.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
