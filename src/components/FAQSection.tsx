import { Plus } from "lucide-react";
import { Headline, Reveal } from "./ui";

const faqs = [
  {
    question: "What does a project cost?",
    answer:
      "It depends on scope. Software projects typically start at $5,000. Setup work, like a phone system or an office network, is quoted per job, and support and consulting are hourly or a monthly plan. You get a written quote before any work starts, and it does not move without your say.",
  },
  {
    question: "How long does it take?",
    answer:
      "Setting up phones, email or a network usually takes days. Most software projects ship in two to six weeks, and larger platforms run six to twelve. You get a timeline on the first call.",
  },
  {
    question: "How big does my business need to be?",
    answer:
      "It doesn't. We work with a single office as readily as a company with several sites, and we size the work to what you need now, with room to grow.",
  },
  {
    question: "What do you build with?",
    answer:
      "Software: TypeScript and Go, on Cloudflare Workers or a VPS, with Next.js, Svelte or React in front. Phones, email and networks: the providers and hardware you already have where they work, or ones we recommend when they don't. We pick what suits the job and what your team can look after.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every project includes 30 days of support after launch. After that, a monthly plan covers monitoring, updates, help for your staff and priority fixes, if you want one.",
  },
  {
    question: "Can I use your open source projects commercially?",
    answer:
      "Yes, within each project's license. Wyzie Lib, Wyzie Proxy and i6.shark are MIT licensed. For the other repositories, check the license in the repository. The Wyzie Subs API itself is closed source: you use it with an API key, as documented at docs.wyzie.io.",
  },
  {
    question: "How do I start?",
    answer:
      "Email hello@wyzie.io with what you need. We set up a short call to understand it and go from there. No commitment.",
  },
];

export function FAQSection() {
  return (
    <section className="sweep border-t border-line">
      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-section sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Headline text="Before You Write" />
        </div>

        <Reveal as="div" delay={120} className="lg:col-span-8">
          <ul className="ruled border-y border-line">
            {faqs.map((faq) => (
              <li key={faq.question} className="scan">
                <details className="faq group">
                  <summary className="ctl flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold text-ink hover:text-blue-ink [&::-webkit-details-marker]:hidden">
                    <span className="transition-[translate] duration-300 ease-enter group-hover:translate-x-1 group-open:translate-x-0">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-subtle transition-[rotate,background-color,border-color,color] duration-500 ease-enter group-hover:border-line-strong group-hover:text-ink group-open:rotate-[135deg] group-open:border-blue group-open:bg-blue group-open:text-on-blue"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </summary>
                  <p className="faq-answer max-w-reading pb-6 text-standfirst text-ink-muted">
                    {faq.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
