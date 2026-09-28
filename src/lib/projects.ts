/*
 * Everything Wyzie has made, in one place. Every figure here is traceable to
 * a repository or a live page; if it cannot be, it is not here. A `source` is
 * only set when the repository is public.
 */

export type Status = "live" | "beta" | "sunset" | "superseded";

export type Link = { label: string; href: string };

export type Shot = {
  /** Base path under /public, without the width suffix. */
  src: string;
  alt: string;
};

export type Entry = {
  name: string;
  summary: string;
  stack: string;
  /** The live site, package page or docs. */
  href?: string;
  /** The public repository. */
  source?: string;
  status: Status;
};

export type Group = {
  group: string;
  entries: Entry[];
};

export type Showcase = {
  id: string;
  name: string;
  kind: string;
  status: Status;
  summary: string;
  stack: string;
  href: string;
  host: string;
  source?: string;
  shot: Shot;
};

/* ------------------------------------------------------------------------ */
/* Wyzie Subs, the flagship.                                                 */
/* ------------------------------------------------------------------------ */

export const subs = {
  name: "Wyzie Subs",
  kind: "Subtitle API",
  summary:
    "A subtitle API for movies and TV. Send an IMDb or TMDB ID and get subtitles from seven providers, cleaned of ads, ready to download.",
  facts: [
    "Seven providers, each health-checked every hour",
    "AI translation into more than 80 languages",
    "Docs in 21 languages and a TypeScript SDK",
    "Keys, plans and payments on its own store",
  ],
  stack: "TypeScript, Nitro, Redis, Cloudflare",
  links: [
    { label: "sub.wyzie.io", href: "https://sub.wyzie.io" },
    { label: "Docs", href: "https://docs.wyzie.io" },
    { label: "Status", href: "https://sub.wyzie.io/status" },
  ],
};

/* ------------------------------------------------------------------------ */
/* The other products shown large.                                           */
/* ------------------------------------------------------------------------ */

export const showcase: Showcase[] = [
  {
    id: "kilter",
    name: "Kilter",
    kind: "Workspace app",
    status: "beta",
    summary:
      "Boards, notes, calendar and reminders in one workspace. Type a thought into one box and it lands where it belongs.",
    stack: "SvelteKit, Cloudflare D1, Durable Objects",
    href: "https://kilter.work",
    host: "kilter.work",
    shot: {
      src: "/work/kilter",
      alt: "The kilter.work home page: the headline beside a capture box that has sorted one sentence into an event, a reminder and a card.",
    },
  },
  {
    id: "pitmaster",
    name: "PitMaster",
    kind: "Poker game manager",
    status: "live",
    summary:
      "Runs a home poker game of any size: blind clock, chip math, payouts and a live view for the TV. Fifteen poker variants, eight languages, no accounts.",
    stack: "SvelteKit, Cloudflare Workers, Durable Objects",
    href: "https://pitmaster.cc",
    host: "pitmaster.cc",
    source: "https://github.com/wyziedevs/pitmaster",
    shot: {
      src: "/work/pitmaster",
      alt: "A PitMaster tournament: a 20:00 blind clock at level 1, the prize pool and average stack, and the player list beside the blind structure.",
    },
  },
];

/* ------------------------------------------------------------------------ */
/* The full list: everything, including what is shown large above.          */
/* ------------------------------------------------------------------------ */

export const catalog: Group[] = [
  {
    group: "Products",
    entries: [
      {
        name: "Wyzie Subs",
        summary:
          "A subtitle API: seven providers searched by IMDb or TMDB ID, cleaned of ads.",
        stack: "TypeScript, Nitro, Redis",
        href: "https://sub.wyzie.io",
        status: "live",
      },
      {
        name: "Kilter",
        summary: "Boards, notes, calendar and reminders in one workspace.",
        stack: "SvelteKit, Cloudflare D1",
        href: "https://kilter.work",
        status: "beta",
      },
      {
        name: "PitMaster",
        summary:
          "A home poker game manager: blind clock, chip math, payouts and a TV view.",
        stack: "SvelteKit, Cloudflare Workers",
        href: "https://pitmaster.cc",
        source: "https://github.com/wyziedevs/pitmaster",
        status: "live",
      },
    ],
  },
  {
    group: "Open Source",
    entries: [
      {
        name: "i6.shark",
        summary:
          "An IPv6 proxy that sends each request from a random address in a /48 range.",
        stack: "Go",
        href: "https://docs.wyzie.io/i6shark/intro",
        source: "https://github.com/wyziedevs/i6.shark",
        status: "live",
      },
      {
        name: "coderaft",
        summary:
          "Isolated development environments in Docker, one per project, with your code kept on the host.",
        stack: "Go, Docker",
        href: "https://coderaft.ar0.eu",
        source: "https://github.com/itzcozi/coderaft",
        status: "live",
      },
      {
        name: "SCeNT",
        summary:
          "Our starter stack: SvelteKit, Cloudflare, Nitro and TypeScript. PitMaster is built on it.",
        stack: "SvelteKit, Nitro",
        source: "https://github.com/wyziedevs/SCeNT",
        status: "live",
      },
      {
        name: "tinybones",
        summary: "A minimal, fast blog template for Astro.",
        stack: "Astro",
        href: "https://tinybones.pages.dev",
        source: "https://github.com/itzcozi/tinybones",
        status: "live",
      },
      {
        name: "nofingdashes",
        summary:
          "Rules that stop AI coding tools from writing em dashes, for Claude Code, Cursor, Copilot and more than 40 others.",
        stack: "Markdown",
        source: "https://github.com/itzcozi/nofingdashes",
        status: "live",
      },
      {
        name: "CDJFormat",
        summary:
          "A command-line tool that formats USB drives for rekordbox players, with safety checks and batch mode.",
        stack: "Go",
        source: "https://github.com/itzcozi/CDJFormat",
        status: "live",
      },
      {
        name: "sudo-flix",
        summary:
          "An open-source movie and TV streaming web app, with its own browser extension and backend.",
        stack: "React, TypeScript",
        source: "https://github.com/sussy-code/smov",
        status: "sunset",
      },
      {
        name: "Wyzie Proxy",
        summary:
          "A proxy for requests blocked by CORS. Wyzie Subs moved to i6.shark.",
        stack: "Nitro",
        href: "https://docs.wyzie.io/proxy/intro",
        source: "https://github.com/wyziedevs/wyzie-proxy",
        status: "superseded",
      },
    ],
  },
  {
    group: "Side Projects",
    entries: [
      {
        name: "MarkD",
        summary: "A live Markdown editor in the browser, built from scratch.",
        stack: "SvelteKit",
        href: "https://markd.it",
        source: "https://github.com/itzcozi/markd",
        status: "live",
      },
      {
        name: "QNote",
        summary: "A notepad replacement for Windows.",
        stack: "C++",
        href: "https://qnote.ar0.eu",
        source: "https://github.com/itzcozi/QNote",
        status: "live",
      },
      {
        name: "GLaDOS",
        summary: "A chat interface for Grok.",
        stack: "React, shadcn/ui",
        href: "https://glados.ar0.eu",
        source: "https://github.com/itzcozi/GLaDOS",
        status: "live",
      },
      {
        name: "Stremio guide",
        summary: "A guide to installing and setting up Stremio.",
        stack: "SvelteKit",
        href: "https://stremio.ar0.eu",
        source: "https://github.com/itzcozi/stremio-guide",
        status: "live",
      },
    ],
  },
];

/**
 * The biggest sites we run, for the panel beside the headline, each timed
 * from the visitor's browser. `ping: false` marks a site whose headers
 * (Cross-Origin-Resource-Policy) refuse a request from another origin, so it
 * cannot be timed from here.
 */
export const sites: {
  host: string;
  what: string;
  href: string;
  ping?: false;
}[] = [
  {
    host: "sub.wyzie.io",
    what: "Subtitle API",
    href: "https://sub.wyzie.io",
  },
  {
    host: "kilter.work",
    what: "Workspace app",
    href: "https://kilter.work",
  },
  {
    host: "pitmaster.cc",
    what: "Poker game manager",
    href: "https://pitmaster.cc",
    ping: false,
  },
  {
    host: "markd.it",
    what: "Markdown editor",
    href: "https://markd.it",
  },
  {
    host: "coderaft.ar0.eu",
    what: "Docker dev environments",
    href: "https://coderaft.ar0.eu",
  },
  {
    host: "qnote.ar0.eu",
    what: "Notepad for Windows",
    href: "https://qnote.ar0.eu",
  },
  {
    host: "glados.ar0.eu",
    what: "Chat UI for LLMs",
    href: "https://glados.ar0.eu",
  },
];

export const statusLabel: Record<Status, string> = {
  live: "Live",
  beta: "Beta",
  sunset: "Sunset",
  superseded: "Superseded",
};

/** Every entry in the full list, for counting. */
export const catalogSize = catalog.reduce((n, g) => n + g.entries.length, 0);
