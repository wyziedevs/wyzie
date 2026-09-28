import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Lightbar } from "@/components/Lightbar";
import { Navigation } from "@/components/Navigation";
import { ButtonLink, Headline, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false },
};

/* A missing page, under a lamp that will not quite catch until pulled. */
export default function NotFound() {
  return (
    <>
      <Navigation />
      <main>
        <section
          data-field
          className="relative isolate flex min-h-[72svh] items-center overflow-hidden"
        >
          <Lightbar broken />
          <div className="mx-auto w-full max-w-page px-4 pt-section pb-section sm:px-6">
            <div className="max-w-reading">
              <Headline
                instant
                as="h1"
                size="xl"
                text="This Page Isn't Here"
                delay={300}
              />
              <Reveal instant delay={700} className="mt-7">
                <p className="text-lead text-balance text-ink-muted">
                  The link is old, or the page moved. While you&apos;re here,
                  the lamp could use a pull
                  <span className="hidden [@media(pointer:fine)]:inline">
                    {" "}
                    (or press L)
                  </span>
                  .
                </p>
              </Reveal>
              <Reveal instant delay={820} className="mt-9">
                <ButtonLink href="/">Back to the Home Page</ButtonLink>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
