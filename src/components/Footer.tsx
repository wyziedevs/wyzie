import Image from "next/image";

const columns = [
  {
    heading: "Work",
    links: [
      { label: "Wyzie Subs", href: "https://sub.wyzie.io" },
      { label: "Kilter", href: "https://kilter.work" },
      { label: "PitMaster", href: "https://pitmaster.cc" },
      { label: "MarkD", href: "https://markd.it" },
      { label: "coderaft", href: "https://coderaft.ar0.eu" },
      { label: "Everything we've made", href: "/#work" },
    ],
  },
  {
    heading: "Wyzie Subs",
    links: [
      { label: "Docs", href: "https://docs.wyzie.io" },
      { label: "Status", href: "https://sub.wyzie.io/status" },
      { label: "News", href: "https://sub.wyzie.io/news" },
      { label: "Get a key", href: "https://store.wyzie.io" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: "https://github.com/wyziedevs" },
      { label: "Discord", href: "https://discord.gg/2mxraHBVtB" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="sweep border-t border-line">
      <div className="mx-auto w-full max-w-page px-4 pt-16 pb-10 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-3 lg:col-span-6">
            <Image
              src="/logo-header.png"
              alt="Wyzie"
              width={177}
              height={65}
              className="h-6 w-auto"
            />
            <p className="mt-4 max-w-[22rem] text-sm text-ink-subtle">
              Business technology, built and kept running.
            </p>
            <a
              href="mailto:hello@wyzie.io"
              className="ctl mt-4 inline-block text-sm font-semibold text-ink hover:text-blue-ink"
            >
              hello@wyzie.io
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <h2 className="text-overline uppercase text-ink-subtle">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="ctl draw-line text-sm text-ink-muted hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[0.8125rem] text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Wyzie LLC</p>
          <div className="flex gap-5">
            <a href="/privacy" className="ctl hover:text-ink">
              Privacy
            </a>
            <a href="/terms" className="ctl hover:text-ink">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
