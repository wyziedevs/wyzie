import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Wyzie for custom software, websites, VoIP phone systems, networks, cloud and IT support. We respond within 24 hours.",
  openGraph: {
    title: "Contact Wyzie",
    description:
      "Get in touch with Wyzie for custom software, websites, VoIP phone systems, networks, cloud and IT support.",
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
