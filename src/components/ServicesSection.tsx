import { Headline, Reveal } from "./ui";

/*
 * What we do, as ruled rows rather than a grid of icon cards. A row ends with
 * where to see it done, when there is somewhere public to see it.
 */
const services = [
  {
    title: "Web Apps and Products",
    body: "Customer-facing apps, dashboards and internal tools, designed and built end to end. You get the code, the deployment and the documentation, and you own all three.",
    seen: [
      { label: "Kilter", href: "https://kilter.work" },
      { label: "PitMaster", href: "https://pitmaster.cc" },
    ],
  },
  {
    title: "Websites and Online Stores",
    body: "Fast sites your customers can find, with booking, payments or a full store where you need one. The domain, the hosting and your business email come set up with it.",
    seen: [],
  },
  {
    title: "Phones and VoIP",
    body: "Business phone systems that run over the internet: your numbers moved over, desk phones or an app on every laptop and mobile, call menus, ring groups and voicemail to email. Changed whenever your team does.",
    seen: [],
  },
  {
    title: "Networks, Wi-Fi and Security",
    body: "Office networks and Wi-Fi that reach every desk, firewalls, VPNs for people working away from it, and backups that are tested, so a lost laptop or a bad click stays a small problem.",
    seen: [],
  },
  {
    title: "Email, Accounts and Devices",
    body: "Google Workspace or Microsoft 365 set up properly, laptops and phones ready on someone's first day, and accounts that open and close cleanly as people join and leave.",
    seen: [],
  },
  {
    title: "Cloud, APIs and Infrastructure",
    body: "Moves off old servers, APIs, background jobs and the hosting under them, on Cloudflare, a VPS or both. Metered, monitored, and cheap to keep running.",
    seen: [
      { label: "Wyzie Subs", href: "https://sub.wyzie.io" },
      { label: "i6.shark", href: "https://github.com/wyziedevs/i6.shark" },
    ],
  },
  {
    title: "Integrations and Automation",
    body: "Plugins for the platforms your customers already use, payments with Stripe or crypto, and the glue that stops your team copying data between the services you already pay for.",
    seen: [{ label: "the Wyzie Subs store", href: "https://store.wyzie.io" }],
  },
  {
    title: "New Products and MVPs",
    body: "The smallest version that proves an idea, for a new company or a new line in an established one. Built in weeks rather than months, and built so it does not have to be thrown away once it works.",
    seen: [
      {
        label: "SCeNT, our starter stack",
        href: "https://github.com/wyziedevs/SCeNT",
      },
    ],
  },
  {
    title: "IT Support and Consulting",
    body: "Someone to call when something breaks, on a monthly plan or as needed. Plus architecture and code reviews, and a second opinion before a big decision.",
    seen: [],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="sweep border-t border-line bg-panel">
      <div className="mx-auto w-full max-w-page px-4 py-section sm:px-6">
        <Headline
          text="What We Can Do for You"
          className="mb-14 max-w-reading"
        />

        <ul className="ruled border-y border-line">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.title}
              delay={i * 60}
              className="scan grid gap-3 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
            >
              <h3 className="text-display-md text-balance text-ink sm:col-span-5">
                {service.title}
              </h3>
              <div className="sm:col-span-7 lg:col-span-6 lg:col-start-7">
                <p className="text-standfirst text-ink-muted">{service.body}</p>
                {service.seen.length > 0 && (
                  <p className="mt-4 text-sm text-ink-subtle">
                    See it in{" "}
                    {service.seen.map((s, j) => (
                      <span key={s.href}>
                        {j > 0 &&
                          (j === service.seen.length - 1 ? " and " : ", ")}
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ctl font-semibold text-blue-ink underline decoration-transparent underline-offset-4 hover:text-ink hover:decoration-ink-subtle"
                        >
                          {s.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 max-w-reading">
          <p className="text-standfirst text-ink-muted">
            Something else? If your business runs on it, ask. If someone else
            would do it better, we will say so and point you to them.{" "}
            <a
              href="/contact"
              className="ctl font-semibold text-blue-ink underline decoration-transparent underline-offset-4 hover:text-ink hover:decoration-ink-subtle"
            >
              Tell us what you need
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
