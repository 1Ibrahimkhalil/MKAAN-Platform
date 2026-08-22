import { Hero } from "@/features/homepage/components/hero";
import { FeaturedProperties } from "@/features/homepage/components/featured-properties";
import { LatestProperties } from "@/features/homepage/components/latest-properties";
import { PropertyTypeBrowser } from "@/features/homepage/components/property-type-browser";
import { ServicesSection } from "@/features/homepage/components/services-section";
import { WhyMkaan } from "@/features/homepage/components/why-mkaan";
import { RequestPropertyCta } from "@/features/homepage/components/request-property-cta";
import { ListPropertySteps } from "@/features/homepage/components/list-property-steps";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <LatestProperties />
      <PropertyTypeBrowser />
      <ServicesSection />
      <WhyMkaan />
      <RequestPropertyCta />
      <ListPropertySteps />
    </>
  );
}
