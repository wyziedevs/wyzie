"use client";

import { useSyncExternalStore } from "react";
import { isSoundOn, play, setSoundOn, subscribeSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/*
 * The one switch for every sound on the site. The speaker's waves draw in
 * when it turns on and fold away when it turns off; the choice is kept.
 */
export function SoundToggle({ className }: { className?: string }) {
  const on = useSyncExternalStore(subscribeSound, isSoundOn, () => true);

  return (
    <button
      type="button"
      data-sound="none"
      aria-pressed={on}
      aria-label="Sound"
      title={on ? "Sound on" : "Sound off"}
      onClick={() => {
        if (on) {
          play("close");
          setSoundOn(false);
        } else {
          setSoundOn(true);
          play("switch");
        }
      }}
      className={cn(
        "ctl press flex h-9 w-9 items-center justify-center rounded-control text-ink-subtle hover:bg-raised hover:text-ink",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[1.125rem] w-[1.125rem]"
        data-on={on ? "" : undefined}
      >
        <path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z" />
        <path className="wave wave-1" d="M16 9a5 5 0 0 1 0 6" />
        <path className="wave wave-2" d="M19.4 5.6a9 9 0 0 1 0 12.8" />
        <path className="mute" d="m16 9.5 5 5m0-5-5 5" />
      </svg>
    </button>
  );
}
