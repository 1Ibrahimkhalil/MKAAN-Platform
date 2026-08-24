import type { Metadata } from "next";
import { AboutCta } from "@/features/about/components/about-cta";
import { AboutHero } from "@/features/about/components/about-hero";
import { OurMission } from "@/features/about/components/our-mission";
import { WhatWeDo } from "@/features/about/components/what-we-do";
import { WhoWeAre } from "@/features/about/components/who-we-are";
import { WhyMkaan } from "@/features/about/components/why-mkaan";

export const metadata: Metadata = {
  title: "عن مكان | MKAAN",
  description:
    "تعرف على مكان، منصتك العقارية الرائدة التي تجمع بين التكنولوجيا والخبرة المحلية في سوق العقارات المصري.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <OurMission />
      <WhatWeDo />
      <WhyMkaan />
      <AboutCta />
    </>
  );
}
