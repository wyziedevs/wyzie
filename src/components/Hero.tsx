import { ArrowDown } from "lucide-react";
import { Lightbar } from "./Lightbar";
import { SitesPanel } from "./SitesPanel";
import { ButtonLink, Headline, Reveal } from "./ui";

/*
 * The pitch on the left; on the right, the proof in its shortest form: every
 * site the same team built and keeps running, each one a link and each one
 * timed from the visitor's browser. Over both, the lamp.
 *
 * The hero is a depth field (Tactile): the panel turns to face the pointer
 * and the lamp's beam leans after it, while the words and buttons hold still.
 * Scrolled past, it falls away behind the page (`hero-exit`).
 */
export function Hero() {
  return (
    <section data-field className="relative isolate overflow-hidden">
      <Lightbar />
      <div className="mx-auto w-full max-w-page px-4 pt-section pb-section sm:px-6">
        <div className="hero-exit grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Headline
              instant
              as="h1"
              size="xl"
              text="Business Technology, Built and Kept Running"
              delay={420}
            />

            <Reveal instant delay={900} className="mt-7">
              <p className="max-w-reading text-lead text-balance text-ink-muted">
                Wyzie builds, sets up and runs what a business depends on:
                software and websites, phones, networks, the cloud and the
                support behind them. You work directly with the people doing it,
                the same team that runs Wyzie Subs, Kilter and PitMaster.
              </p>
            </Reveal>

            <Reveal
              instant
              delay={1020}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/contact">Start a Project</ButtonLink>
              <ButtonLink href="#work" variant="secondary">
                See the Work
                <ArrowDown
                  aria-hidden="true"
                  className="h-4 w-4 transition-[translate] duration-300 ease-enter group-hover:translate-y-0.5"
                />
              </ButtonLink>
            </Reveal>
          </div>

          {/* A stage for the panel: it floats at an angle, turns to face
              the pointer, and its layers stand apart in depth. */}
          <Reveal instant delay={700} className="stage-3d lg:col-span-5">
            <div className="float-3d">
              <div className="tilt tilt-3d [--drift:12px] [--tilt:9deg]">
                <SitesPanel />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
