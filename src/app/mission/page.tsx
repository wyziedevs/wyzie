import { pageMetadata } from "@/lib/seo";
import { CompanyPage, RuledSection, TextLink } from "@/components/Company";

export const metadata = pageMetadata({
  title: "Our Mission",
  description:
    "Wyzie builds, sets up and runs the technology a business depends on, and keeps it working for as long as the business needs it.",
  path: "/mission",
});

const meaning = [
  {
    title: "All of What a Business Runs On",
    body: "Software and websites, and also the phones, the network, the email, the security and the cloud under them. One team that sees all of it can fix the problems that sit between them, which is where most problems sit.",
  },
  {
    title: "Built to Be Kept",
    body: "We build for the years after launch: code the next person can read, setups that are written down, and monitoring in place before anyone needs it.",
  },
  {
    title: "Proven on Our Own Products",
    body: (
      <>
        We run Wyzie Subs, Kilter and our other projects ourselves, in
        production, every day. What we recommend to you is what we trust with
        our own work. <TextLink href="/#work">See the work</TextLink>.
      </>
    ),
  },
  {
    title: "Honest About Fit",
    body: "If something you can buy off the shelf, or another team, would serve you better, we say so and point you to it.",
  },
];

export default function MissionPage() {
  return (
    <CompanyPage
      title="Our Mission"
      current="/mission"
      lead={
        <p>
          To build, set up and run the technology a business depends on, and to
          keep it working for as long as the business needs it.
        </p>
      }
    >
      <RuledSection
        heading="What That Means"
        intro="A business should be able to forget its technology is there. That takes more than a launch."
        rows={meaning}
      />
    </CompanyPage>
  );
}
