import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <ProjectsSection />
        <ServicesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
