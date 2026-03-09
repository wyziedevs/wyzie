import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Navigation />
      <Hero />
      <StatsSection />
      <ServicesSection />
      <ProjectsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
