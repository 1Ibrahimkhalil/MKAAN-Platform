import type { Metadata } from "next";
import { ServicesHero } from "@/features/services/components/services-hero";
import { ServicesGrid } from "@/features/services/components/services-grid";
import { ServicesCTA } from "@/features/services/components/services-cta";

export const metadata: Metadata = {
  title: "خدماتنا | مكان",
  description:
    "نوفر لك خدمات متكاملة تغطي كل احتياجات عقارك من الصيانة إلى التشطيبات والتجهيز.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesCTA />
    </>
  );
}
