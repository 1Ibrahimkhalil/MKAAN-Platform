import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PropertyGallery } from "@/features/properties/components/property-gallery";
import { PropertyInfo } from "@/features/properties/components/property-info";
import { PropertyCTAs } from "@/features/properties/components/property-ctas";
import { PropertyCTASection } from "@/features/properties/components/property-cta-section";
import { SimilarProperties } from "@/features/properties/components/similar-properties";
import { MOCK_PROPERTIES } from "@/features/properties/lib/mock-data";
import type { PropertyDetail } from "@/features/properties/types/property";

function getPropertyBySlug(slug: string): PropertyDetail | null {
  const base = MOCK_PROPERTIES.find((p) => p.slug === slug);
  if (!base) return null;

  return {
    ...base,
    description: `شقة لقطة للبيع في أرقى مناطق ${base.location}، تشطيب سوبر لوكس جاهزة للسكن الفوري. تتميز الشقة بإطلالة رائعة وتهوية ممتازة في جميع الغرف. العمارة حديثة وبها أسانسير وحارس مقيم. الموقع مميز جداً بالقرب من جميع الخدمات والمواصلات والمدارس. فرصة ممتازة للسكن أو الاستثمار.`,
    images: [
      base.image,
      "/images/stitch/prop_office.jpg",
      "/images/stitch/prop_villa_garden.jpg",
    ],
    yearBuilt: 2022,
    floor: base.rooms != null && base.rooms > 3 ? 3 : 2,
    propertyCondition: "سوبر لوكس",
    whatsappPhone: "+201000000000",
    phoneNumber: "+201000000000",
    features: [
      { icon: "elevator", label: "أسانسير" },
      { icon: "local_parking", label: "جراج" },
      { icon: "security", label: "أمن وحراسة" },
      { icon: "storefront", label: "قريب من الخدمات" },
    ],
    dynamicFields: [
      { fieldId: "type", label: "النوع", value: base.category },
      {
        fieldId: "transaction",
        label: "العملية",
        value: base.transactionType === "sale" ? "بيع" : "إيجار",
      },
      { fieldId: "floor", label: "الدور", value: "الثالث" },
      { fieldId: "finish", label: "التشطيب", value: "سوبر لوكس" },
      { fieldId: "furnished", label: "مفروشة", value: "لا" },
      { fieldId: "yearBuilt", label: "سنة البناء", value: "2022" },
    ],
    createdAt: "2025-01-15",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "عقار غير موجود | مكّان" };

  return {
    title: `${property.title} | مكّان`,
    description: `${property.title} في ${property.location}. السعر: ${property.price.toLocaleString("ar-EG")} جنيه.`,
  };
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="bg-surface min-h-screen flex-grow py-8">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="fade-in-up flex flex-col gap-4 lg:col-span-2">
            <PropertyGallery images={property.images} title={property.title} />
          </div>

          <div className="fade-in-up lg:col-span-1">
            <PropertyCTAs property={property} />
          </div>
        </div>
      </Container>

      <Container>
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-12 lg:col-span-2">
            <PropertyInfo property={property} />
          </div>
        </div>
      </Container>

      <PropertyCTASection />

      <SimilarProperties currentId={property.id} />
    </main>
  );
}
