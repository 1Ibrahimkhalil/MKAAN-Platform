import type { Metadata } from "next";
import { PropertyDiscovery } from "@/features/properties/components/property-discovery";

export const metadata: Metadata = {
  title: "استكشف العقارات | مكّان",
  description:
    "تصفح أكبر مجموعة من العقارات للبيع والتأجير في مصر. شقق، فلل، مكاتب تجارية، محلات، مستودعات.",
};

export default function PropertiesPage() {
  return <PropertyDiscovery />;
}
