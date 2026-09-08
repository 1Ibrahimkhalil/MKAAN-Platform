import type { Metadata } from "next";
import { ListPropertyHero } from "@/features/leads/listing-request/components/list-property-hero";
import { ListPropertySteps } from "@/features/leads/listing-request/components/list-property-steps";
import { ListPropertyForm } from "@/features/leads/listing-request/components/list-property-form";
import { ListPropertySidebar } from "@/features/leads/listing-request/components/list-property-sidebar";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

export const metadata: Metadata = {
  title: "اعرض عقارك | مكان",
  description:
    "اعرض عقارك مع MKAAN — معاينة احترافية، تصوير احترافي، ووصول مباشر للمشترين والمستأجرين.",
};

export default function ListPropertyPage() {
  return (
    <>
      <ListPropertyHero />

      <Container className="py-8">
        <ListPropertySteps />

        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ListPropertyForm />
            </div>
            <div className="lg:col-span-4">
              <ListPropertySidebar />
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </>
  );
}
