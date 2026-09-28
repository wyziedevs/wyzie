import { pageMetadata } from "@/lib/seo";
import { CompanyPage, RuledSection, TextLink } from "@/components/Company";

export const metadata = pageMetadata({
  title: "Our Values",
  description:
    "What Wyzie holds to on every project: the truth about the work, small and efficient builds, plain words, written-down setups and public code.",
  path: "/values",
});

const values = [
  {
    title: "Tell the Truth About the Work",
    body: "A quote that matches the invoice, a date we can keep, and a straight answer when something goes wrong: what happened, what we did, and what changes so it does not happen again.",
  },
  {
    title: "Build Small and Efficient",
    body: "Build only what is needed and make it in the most optimal way possible. We prioritize speed and efficiency here at Wyzie.",
  },
  {
    title: "Say It Plainly",
    body: "No jargon to hide behind. You should understand what you are paying for, what it does and why we chose it.",
  },
  {
    title: "Write It Down",
    body: "Passwords in a manager, setups in a document, code with its reasons. Nothing important lives only in one person's head, including ours.",
  },
  {
    title: "Respect the People Using It",
    body: "Fast pages, readable text, keyboards and screen readers supported, and nothing collected that the job does not need.",
  },
  {
    title: "Share What We Can",
    body: (
      <>
        Much of what we build is public, so anyone can read it, use it and check
        it. <TextLink href="/open-source">Our open source</TextLink>.
      </>
    ),
  },
];

export default function ValuesPage() {
  return (
    <CompanyPage
      title="Our Values"
      current="/values"
      lead={
        <p>
          What we hold to on every project, large or small, ours or yours. They
          are how you can judge us, so we keep them short.
        </p>
      }
    >
      <RuledSection heading="What We Hold To" rows={values} />
    </CompanyPage>
  );
}
