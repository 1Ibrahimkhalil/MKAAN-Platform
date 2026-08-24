import type { Metadata } from "next";
import { RequestPropertyHero } from "@/features/request-property/components/request-property-hero";
import { RequestPropertyForm } from "@/features/request-property/components/request-property-form";

export const metadata: Metadata = {
  title: "اطلب عقار | مكان",
  description:
    "اكتب مواصفات العقار اللي بتدور عليه وفريق MKAAN هيبحثلك عنه ويوصلك بأفضل سعر.",
};

export default function RequestPropertyPage() {
  return (
    <>
      <RequestPropertyHero />
      <RequestPropertyForm />
    </>
  );
}
