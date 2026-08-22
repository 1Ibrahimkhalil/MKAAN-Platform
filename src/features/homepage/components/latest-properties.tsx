"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Square, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { useRevealOnScroll } from "@/lib/hooks/use-reveal-on-scroll";
import { formatPrice } from "@/lib/utils";
import { TRANSACTION_LABELS, CURRENCY_SYMBOL } from "@/config";

interface LatestProperty {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  priceSuffix?: string;
  image: string;
  transactionType: "sale" | "rent";
  badge?: string;
  rooms?: number;
  area?: number;
}

const MOCK_LATEST: LatestProperty[] = [
  {
    id: "l1",
    slug: "modern-apartment",
    title: "شقة مودرن بتصميم عصري",
    location: "شبين الكوم، البر الشرقي",
    price: 1850000,
    image: "/images/stitch/prop_living_room.jpg",
    transactionType: "sale",
    rooms: 3,
    area: 140,
  },
  {
    id: "l2",
    slug: "office-space",
    title: "مكتب إداري في موقع حيوي",
    location: "شبين الكوم، شارع الجلاء",
    price: 8000,
    priceSuffix: "ج.م / شهر",
    image: "/images/stitch/prop_office.jpg",
    transactionType: "rent",
    rooms: 2,
    area: 85,
  },
  {
    id: "l3",
    slug: "twin-house",
    title: "فيلا توين هاوس بتشطيب راقي",
    location: "قويسنا، طريق مصر اسكندرية",
    price: 4200000,
    image: "/images/stitch/prop_villa_garden.jpg",
    transactionType: "sale",
    badge: "لقطة",
    rooms: 4,
    area: 280,
  },
];

function LatestCard({ property }: { property: LatestProperty }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group border-border/10 flex flex-col overflow-hidden rounded-3xl border bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_30px_-10px_rgba(10,25,47,0.15)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute end-3 top-3 flex gap-1.5 sm:end-4 sm:top-4 sm:gap-2">
          <span className="text-action rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-bold shadow-sm backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs">
            {TRANSACTION_LABELS[property.transactionType]}
          </span>
          {property.badge && (
            <span className="bg-destructive flex items-center gap-0.5 rounded-lg px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:gap-1 sm:px-3 sm:py-1.5 sm:text-xs">
              ★ {property.badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-[clamp(1rem,2vw,2rem)] transition-colors duration-300 group-hover:bg-white">
        <div className="text-action mb-3 text-[clamp(1rem,1.5vw+0.25rem,1.5rem)] font-extrabold">
          {formatPrice(property.price)}{" "}
          <span className="text-muted-foreground text-[clamp(0.75rem,0.8vw+0.125rem,0.875rem)] font-medium">
            {property.priceSuffix ?? CURRENCY_SYMBOL}
          </span>
        </div>
        <h3 className="text-foreground group-hover:text-action mb-2 line-clamp-1 text-[clamp(0.875rem,1vw+0.125rem,1.125rem)] font-bold transition-colors">
          {property.title}
        </h3>
        <p className="text-muted-foreground mb-4 flex items-center gap-2 text-[clamp(0.75rem,0.8vw+0.125rem,0.875rem)] font-medium">
          <MapPin className="text-action/60 size-4" />
          {property.location}
        </p>
        <div className="border-border/10 text-muted-foreground/90 mt-auto flex flex-wrap justify-between gap-2 border-t pt-4 text-[clamp(0.6875rem,0.7vw+0.125rem,0.8125rem)] font-semibold">
          {property.rooms && (
            <span className="bg-surface-tertiary/50 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3">
              <BedDouble className="text-action size-4" />
              {property.rooms} غرف
            </span>
          )}
          {property.area && (
            <span className="bg-surface-tertiary/50 flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 sm:px-3">
              <Square className="text-action size-4" />
              {property.area} م²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function LatestProperties() {
  const headerRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="bg-surface/50 overflow-hidden py-[clamp(3rem,5vw,6rem)]">
      <Container>
        <div
          ref={headerRef}
          className="reveal-up mb-[clamp(2rem,4vw,3rem)] flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end"
        >
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
        </div>
        <div className="grid grid-cols-1 gap-[clamp(1.5rem,2vw+0.5rem,2.5rem)] sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_LATEST.map((property) => (
            <LatestCard key={property.id} property={property} />
          ))}
        </div>
      </Container>
    </section>
  );
}
