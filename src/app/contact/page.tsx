import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactSection } from "./ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Wyzie. We'd love to hear about your project and explore how we can help.",
  alternates: { canonical: "https://wyzie.io/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-base">
      <Navigation />
      <ContactSection />
      <Footer />
    </main>
  );
}
