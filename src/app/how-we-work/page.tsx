import { pageMetadata } from "@/lib/seo";
import { CompanyPage, RuledSection, TextLink } from "@/components/Company";

export const metadata = pageMetadata({
  title: "How We Work",
  description:
    "How a Wyzie project runs, from the first conversation and a written quote to launch and the years of support after it.",
  path: "/how-we-work",
});

const steps = [
  {
    title: "A Conversation",
    body: (
      <>
        You tell us what you need, by <TextLink href="/contact">email</TextLink>{" "}
        or a call. We ask about the business around it: who will use it, what it
        replaces and what it has to connect to.
      </>
    ),
  },
  {
    title: "A Written Quote",
    body: "What we will build or set up, what it costs and when it will be done. If the scope changes, the quote changes first, in writing.",
  },
  {
    title: "Building in the Open",
    body: "You see the progress as it happens: working previews, the code, and the decisions with the reasons behind them.",
  },
  {
    title: "Launch",
    body: "We move it into place, test it where it will actually run, and hand over the accounts, the documentation and the keys. You own all of it.",
  },
  {
    title: "After Launch",
    body: "Monitoring, fixes and changes, on a monthly plan or as needed. A year later, the same people answer.",
  },
];

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

export default function HowWeWorkPage() {
  return (
    <CompanyPage
      title="How We Work"
      current="/how-we-work"
      cta="Let's Get It Running"
      lead={
        <p>
          From the first email to the years after launch, this is how a project
          runs. No surprises on the invoice and no one disappears after
          handover.
        </p>
      }
    >
      <RuledSection heading="A Project, Start to Finish" rows={steps} />
      <RuledSection heading="What You Can Count On" rows={principles} />
    </CompanyPage>
  );
}
