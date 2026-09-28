import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactSection } from "./ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Wyzie what you need: software, a website, a phone system, a network or IT support. Email hello@wyzie.io; we reply within a day with next steps and a written quote.",
  alternates: { canonical: "https://wyzie.io/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
