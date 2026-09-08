import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { PropertyCard } from "@/features/properties/components/property-card";
import type { PropertyCardData } from "@/features/properties/types/property";

const MOCK_PROPERTIES: PropertyCardData[] = [
  {
    id: "1",
    slug: "apartment-shebin-luxury",
    title: "شقة سكنية فاخرة - تشطيب سوبر لوكس",
    location: "شبين الكوم، حي الجامعة",
    price: 2500000,
    image: "/images/stitch/prop_living_room.jpg",
    category: "شقة",
    transactionType: "sale",
    badge: "لقطة",
    rooms: 3,
    bathrooms: 2,
    area: 150,
  },
  {
    id: "2",
    slug: "office-shebin-downtown",
    title: "مقر إداري مجهز بالكامل",
    location: "شبين الكوم، شارع باريس",
    price: 15000,
    priceSuffix: "ج.م / شهر",
    image: "/images/stitch/prop_office.jpg",
    category: "مكتب",
    transactionType: "rent",
    rooms: 4,
    bathrooms: 2,
    area: 200,
  },
  {
    id: "3",
    slug: "villa-quweisna-garden",
    title: "فيلا مستقلة مع حديقة خاصة",
    location: "قويسنا، حي الفيلات",
    price: 5200000,
    image: "/images/stitch/prop_villa_garden.jpg",
    category: "فيلا",
    transactionType: "sale",
    badge: "جديد",
    rooms: 5,
    bathrooms: 4,
    area: 350,
  },
];

export function FeaturedProperties() {
  return (
    <section className="bg-surface-tertiary overflow-hidden py-[clamp(3rem,5vw,6rem)]">
      <Container>
        <RevealOnScroll className="mb-[clamp(2rem,4vw,3rem)] flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-action mb-2 block text-sm font-bold tracking-wider uppercase">
              العناصر المميزة
            </span>
            <h2 className="text-primary font-headline-lg text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] font-extrabold tracking-tight">
              عقارات مختارة ليك
            </h2>
          </div>
          <Link
            href="/properties"
            className="bg-action hover:bg-action-hover btn-interactive flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-base font-bold text-white transition-colors md:w-auto"
          >
            شوف كل العقارات
            <ArrowLeft className="size-5 rtl:rotate-180" />
          </Link>
        </RevealOnScroll>
        <div className="grid grid-cols-1 gap-[clamp(1.5rem,2vw+0.5rem,2.5rem)] sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
