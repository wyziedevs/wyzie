import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Lightbar } from "@/components/Lightbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Navigation />
      <div className="relative">
        <Lightbar />
        <Hero />
      </div>
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
