import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { PropertyCard } from "@/features/properties/components/property-card";
import type { PropertyCardData } from "@/features/properties/types/property";

const MOCK_LATEST: PropertyCardData[] = [
  {
    id: "l1",
    slug: "apartment-cairo-manial",
    title: "شقة مودرن بتصميم عصري",
    location: "شبين الكوم، البر الشرقي",
    price: 1850000,
    image: "/images/stitch/prop_living_room.jpg",
    category: "شقة",
    transactionType: "sale",
    rooms: 3,
    area: 140,
  },
  {
    id: "l2",
    slug: "clinic-mansoura",
    title: "مكتب إداري في موقع حيوي",
    location: "شبين الكوم، شارع الجلاء",
    price: 8000,
    priceSuffix: "ج.م / شهر",
    image: "/images/stitch/prop_office.jpg",
    category: "مكتب",
    transactionType: "rent",
    rooms: 2,
    area: 85,
  },
  {
    id: "l3",
    slug: "villa-6october-modern",
    title: "فيلا توين هاوس بتشطيب راقي",
    location: "قويسنا، طريق مصر اسكندرية",
    price: 4200000,
    image: "/images/stitch/prop_villa_garden.jpg",
    category: "فيلا",
    transactionType: "sale",
    badge: "لقطة",
    rooms: 4,
    area: 280,
  },
];

export function LatestProperties() {
  return (
    <section className="bg-surface-tertiary overflow-hidden py-[clamp(3rem,5vw,6rem)]">
      <Container>
        <RevealOnScroll className="mb-[clamp(2rem,4vw,3rem)] flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <h2 className="text-primary font-headline-lg text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] font-extrabold tracking-tight">
            أحدث العقارات
          </h2>
          <Link
            href="/properties"
            className="bg-action hover:bg-action-hover btn-interactive flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-base font-bold text-white transition-colors md:w-auto"
          >
            شوف كل العقارات
            <ArrowLeft className="size-5 rtl:rotate-180" />
          </Link>
        </RevealOnScroll>
        <div className="grid grid-cols-1 gap-[clamp(1.5rem,2vw+0.5rem,2.5rem)] sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_LATEST.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
