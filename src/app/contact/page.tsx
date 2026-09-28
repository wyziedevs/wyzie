import { JsonLd, breadcrumbs, pageMetadata } from "@/lib/seo";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactSection } from "./ContactSection";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Wyzie what you need: software, a website, a phone system, a network, security or IT support. Email hello@wyzie.io; we reply within a day with next steps and a written quote.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs("Contact", "/contact")} />
      <Navigation />
      <main id="main">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
