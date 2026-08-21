import { Hero } from "@/features/homepage/components/hero";
import { FeaturedProperties } from "@/features/homepage/components/featured-properties";
import { ServicesSection } from "@/features/homepage/components/services-section";
import { CtaSection } from "@/features/homepage/components/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <ServicesSection />
      <CtaSection />
    </>
  );
}
