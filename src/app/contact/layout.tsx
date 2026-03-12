import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Wyzie for bespoke software development, technology consulting, or custom solutions. We respond within 24 hours.",
  openGraph: {
    title: "Contact Wyzie",
    description:
      "Get in touch with Wyzie for bespoke software development, technology consulting, or custom solutions.",
    url: "https://wyzie.io/contact",
  },
  alternates: {
    canonical: "https://wyzie.io/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
