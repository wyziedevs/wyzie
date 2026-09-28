import { ArrowRight } from "lucide-react";
import { Motes } from "./Motes";
import { ButtonLink, Reveal } from "./ui";

/*
 * The one place the page commits to the blue: the whole band is it. Written
 * as plain words on the logo's own blue, with the address itself as the
 * largest link, because the address is the thing a reader is here to take.
 * The pointer carries a wash of light across it and finds the same dotted
 * wall as the hero's (Tactile, globals.css), and motes of light rise through
 * it on their own.
 */
export function CTASection({
  heading = "Need Something Built or Set Up?",
}: {
  heading?: string;
}) {
  return (
    <section
      id="contact"
      data-field
      className="sweep band-light bg-blue-deep text-on-blue [--sweep-color:var(--color-on-blue)]"
    >
      <div aria-hidden="true" className="light-wall" />
      <Motes />
      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-section sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <Reveal className="lg:col-span-7">
          <h2 className="text-display-xl text-balance text-on-blue">
            {heading}
          </h2>
          <p className="mt-6 max-w-reading text-lead text-on-blue-muted">
            Software, a website, new phones, a network that works. Tell us what
            it is and when you need it. You get a reply, a call if it helps, and
            a written quote.
          </p>
        </Reveal>

        <Reveal delay={140} className="lg:col-span-5">
          <a
            href="mailto:hello@wyzie.io"
            className="ctl group relative block pb-3 text-display-md text-on-blue"
          >
            hello@wyzie.io
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-on-blue/40"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-on-blue transition-[scale] duration-700 ease-enter group-hover:scale-x-100"
            />
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" variant="inverse">
              Start a Project
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-[translate] duration-300 ease-enter group-hover:translate-x-1"
              />
            </ButtonLink>
            <a
              href="https://discord.gg/2mxraHBVtB"
              target="_blank"
              rel="noopener noreferrer"
              className="ctl px-2 py-2 text-[0.9375rem] font-semibold text-on-blue-muted underline decoration-on-blue/40 underline-offset-4 hover:text-on-blue hover:decoration-on-blue"
            >
              Or find us on Discord
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
