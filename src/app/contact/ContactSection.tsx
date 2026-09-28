"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Headline, Reveal } from "@/components/ui";
import { play } from "@/lib/sound";
import { sparksFrom } from "@/lib/sparks";

/* 16px on phones, so iOS never zooms the page to a focused field. */
const field = "field px-3.5 py-2.5 text-base sm:text-[0.9375rem]";

const MESSAGE_MAX = 5000;

type Missing = { subject?: boolean; message?: boolean };

export function ContactSection() {
  const [opened, setOpened] = useState(false);
  // Back from the sent note, the form fades in rather than snapping back.
  const [back, setBack] = useState(false);
  const [copied, setCopied] = useState(false);
  const [missing, setMissing] = useState<Missing>({});
  const [length, setLength] = useState(0);

  return (
    <section className="mx-auto w-full max-w-page px-4 pt-section-tight pb-section sm:px-6">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Headline
            instant
            as="h1"
            size="xl"
            text="Tell Us What You Need"
            delay={80}
          />
          <Reveal instant delay={480}>
            <p className="mt-7 max-w-reading text-lead text-ink-muted">
              What it is, who it is for, and when you need it. We reply within a
              day, set up a short call if it helps, and send a written quote.
            </p>
          </Reveal>

          <Reveal instant delay={600}>
            <ul className="ruled mt-10 border-y border-line">
              <li className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm text-ink-subtle">Email</p>
                  <a
                    href="mailto:hello@wyzie.io"
                    className="ctl text-[1.0625rem] font-semibold text-ink hover:text-blue-ink"
                  >
                    hello@wyzie.io
                  </a>
                </div>
                <button
                  type="button"
                  onClick={async (e) => {
                    const button = e.currentTarget;
                    try {
                      await navigator.clipboard.writeText("hello@wyzie.io");
                      setCopied(true);
                      play("success");
                      sparksFrom(button, { count: 8, reach: 30, tone: "live" });
                      setTimeout(() => setCopied(false), 2000);
                    } catch {
                      window.location.href = "mailto:hello@wyzie.io";
                    }
                  }}
                  className="ctl press inline-flex h-9 items-center gap-2 rounded-control border border-line-strong px-3 text-sm font-semibold text-ink-muted hover:bg-raised hover:text-ink"
                >
                  {copied ? (
                    <Check
                      aria-hidden="true"
                      className="check-draw h-4 w-4 text-live"
                    />
                  ) : (
                    <Copy aria-hidden="true" className="h-4 w-4" />
                  )}
                  <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                </button>
              </li>
              <li className="py-4">
                <p className="text-sm text-ink-subtle">Discord</p>
                <a
                  href="https://discord.gg/2mxraHBVtB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ctl inline-flex items-center gap-1.5 text-[1.0625rem] font-semibold text-ink hover:text-blue-ink"
                >
                  Join the server
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal instant delay={300} className="lg:col-span-6 lg:col-start-7">
          <div className="spot rounded-panel border border-line bg-panel">
            <div className="border-b border-line px-5 py-3.5">
              <p className="text-sm font-semibold text-ink">Write to us</p>
            </div>
            {opened ? (
              <div className="ping-in px-5 py-10">
                <p className="text-display-md text-ink">
                  Your mail app is open.
                </p>
                <p className="mt-3 max-w-reading text-standfirst text-ink-muted">
                  The message is written; send it from there. If nothing opened,
                  email hello@wyzie.io directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOpened(false);
                    setBack(true);
                  }}
                  className="ctl mt-6 text-sm font-semibold text-blue-ink hover:text-ink"
                >
                  Back to the form
                </button>
              </div>
            ) : (
              // The browser's own validation bubble looks different in every
              // browser and sits over the page; this form says what is missing
              // under the field instead, in the page's own voice.
              <form
                noValidate
                className={`flex flex-col gap-5 px-5 py-6 ${back ? "ping-in" : ""}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const subjectText = String(data.get("subject") ?? "").trim();
                  const messageText = String(data.get("message") ?? "").trim();
                  const gaps = {
                    subject: !subjectText,
                    message: !messageText,
                  };
                  if (gaps.subject || gaps.message) {
                    setMissing(gaps);
                    play("error");
                    const form = e.currentTarget;
                    // Restart the shake even if the last one is still going.
                    form.classList.remove("shake");
                    void form.offsetWidth;
                    form.classList.add("shake");
                    form
                      .querySelector<HTMLElement>(
                        `#${gaps.subject ? "subject" : "message"}`,
                      )
                      ?.focus();
                    return;
                  }
                  const subject = encodeURIComponent(subjectText);
                  const body = encodeURIComponent(messageText);
                  window.location.href = `mailto:hello@wyzie.io?subject=${subject}&body=${body}`;
                  play("success");
                  setOpened(true);
                }}
              >
                <div className="field-wrap">
                  <label
                    htmlFor="subject"
                    className="field-label mb-1.5 block text-sm font-semibold text-ink"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={200}
                    autoComplete="off"
                    placeholder="New phones for our office"
                    aria-invalid={missing.subject || undefined}
                    aria-describedby={
                      missing.subject ? "subject-missing" : undefined
                    }
                    onInput={() =>
                      missing.subject &&
                      setMissing((m) => ({ ...m, subject: false }))
                    }
                    className={field}
                  />
                  {missing.subject && (
                    <p
                      id="subject-missing"
                      className="ping-in mt-1.5 text-[0.8125rem] text-sunset"
                    >
                      Add a line about what it is.
                    </p>
                  )}
                </div>
                <div className="field-wrap">
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <label
                      htmlFor="message"
                      className="field-label block text-sm font-semibold text-ink"
                    >
                      Message
                    </label>
                    <span
                      aria-hidden="true"
                      className={`text-[0.75rem] tabular-nums transition-[opacity,color] duration-300 ${
                        length === 0
                          ? "opacity-0"
                          : length > MESSAGE_MAX * 0.9
                            ? "text-sunset"
                            : "text-ink-subtle"
                      }`}
                    >
                      {length.toLocaleString("en-US")} /{" "}
                      {MESSAGE_MAX.toLocaleString("en-US")}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    maxLength={MESSAGE_MAX}
                    placeholder="What it should do, who uses it, and when you need it."
                    aria-invalid={missing.message || undefined}
                    aria-describedby={
                      missing.message ? "message-missing" : undefined
                    }
                    onInput={(e) => {
                      setLength(e.currentTarget.value.length);
                      if (missing.message)
                        setMissing((m) => ({ ...m, message: false }));
                    }}
                    className={field}
                  />
                  {missing.message && (
                    <p
                      id="message-missing"
                      className="ping-in mt-1.5 text-[0.8125rem] text-sunset"
                    >
                      Tell us a little about it first.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[0.8125rem] text-ink-subtle">
                    Opens your mail app. Nothing is sent to our servers.
                  </p>
                  <button
                    type="submit"
                    className="ctl press btn-lit inline-flex h-11 items-center justify-center rounded-control bg-blue px-5 text-[0.9375rem] font-semibold text-on-blue hover:bg-blue-hover"
                  >
                    Write the Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
