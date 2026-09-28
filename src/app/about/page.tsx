import { JsonLd, breadcrumbs, pageMetadata } from "@/lib/seo";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CTASection } from "@/components/CTASection";
import { MorePages } from "@/components/Company";
import { Headline, Reveal } from "@/components/ui";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Wyzie LLC is a technology company that builds its own products, like Wyzie Subs, Kilter and PitMaster, and builds, sets up and runs technology for other businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbs("About", "/about")} />
      <Navigation />
      <main id="main">
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
                websites, phone systems, networks and the cloud.
              </p>
            </Reveal>
          </div>
        </section>

        <MorePages />

        <CTASection heading="Let's Get It Running" />
      </main>
      <Footer />
    </>
  );
}
