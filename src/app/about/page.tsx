import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { Headline, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wyzie LLC is a technology company that builds its own products, like Wyzie Subs, Kilter and PitMaster, and builds, sets up and runs technology for other businesses.",
  alternates: { canonical: "https://wyzie.io/about" },
};

const principles = [
  {
    title: "Sized to You",
    body: "One office or several sites, a handful of people or a few hundred. We build for what you need now and leave room to grow, so you never pay for a system made for someone else.",
  },
  {
    title: "Work Someone Can Inherit",
    body: "Clear structure, written-down setups and code the next person can read, whether it is an app, a phone system or a network. Often the next person is us.",
  },
  {
    title: "Work in the Open",
    body: "You see the progress, the decisions and the code as it is written. The invoice matches the quote.",
  },
  {
    title: "Fast From the Start",
    body: "Edge hosting, small pages and caching planned in the first week, so speed is part of the design.",
  },
  {
    title: "Still Here After Launch",
    body: "Error handling, monitoring and a 99.9% uptime target. When it needs a change a year later, the same people answer.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="mx-auto w-full max-w-page px-4 pt-section-tight pb-section sm:px-6">
          <div className="max-w-[52rem]">
            <Headline
              instant
              as="h1"
              size="xl"
              text="We Build It, Set It Up, Then Keep It Running"
              delay={80}
            />
            <Reveal instant delay={520}>
              <p className="mt-7 max-w-reading text-lead text-ink-muted">
                Wyzie LLC is a technology company. We build products of our own,
                like Wyzie Subs, Kilter and PitMaster, and we build, set up and
                run the technology other businesses depend on: software,
                websites, phone systems, networks and the cloud under them. Both
                get the same care, because we are the ones who answer when
                something breaks.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="sweep border-t border-line">
          <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-section sm:px-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Headline text="How We Work" />
            </div>
            <ul className="ruled border-y border-line lg:col-span-8">
              {principles.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 60}
                  className="scan py-7"
                >
                  <h3 className="text-display-md text-ink">{p.title}</h3>
                  <p className="mt-3 max-w-reading text-standfirst text-ink-muted">
                    {p.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <CTASection heading="Let's Get It Running" />
      </main>
      <Footer />
    </>
  );
}
