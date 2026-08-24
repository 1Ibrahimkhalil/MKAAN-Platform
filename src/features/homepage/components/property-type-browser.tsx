"use client";

import Link from "next/link";
import {
  Building2,
  Home,
  Store,
  Briefcase,
  LandPlot,
  Warehouse,
  Tent,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { useRevealOnScroll } from "@/lib/hooks/use-reveal-on-scroll";
import { PROPERTY_TYPES } from "@/config";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const propertyTypeIcons = [
  {
    type: PROPERTY_TYPES[0],
    icon: Building2,
    href: "/properties?type=apartment",
  },
  { type: PROPERTY_TYPES[1], icon: Home, href: "/properties?type=villa" },
  { type: PROPERTY_TYPES[2], icon: Home, href: "/properties?type=house" },
  { type: PROPERTY_TYPES[3], icon: Store, href: "/properties?type=shop" },
  { type: PROPERTY_TYPES[4], icon: Briefcase, href: "/properties?type=office" },
  { type: PROPERTY_TYPES[5], icon: LandPlot, href: "/properties?type=land" },
  {
    type: PROPERTY_TYPES[6],
    icon: Warehouse,
    href: "/properties?type=warehouse",
  },
  { type: PROPERTY_TYPES[7], icon: Tent, href: "/properties?type=chalet" },
];

export function PropertyTypeBrowser() {
  const sectionRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section>
      <Container>
        <div ref={sectionRef} className="reveal-up group relative">
          <h2 className="text-primary font-headline-lg mb-8 text-center text-[clamp(1.5rem,2vw+0.5rem,2.5rem)] font-extrabold md:mb-12">
            دَوّر حسب نوع العقار
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: false,
              direction: "rtl",
            }}
            className="w-full"
          >
            <CarouselContent className="px-6 py-6">
              {propertyTypeIcons.map((type) => (
                <CarouselItem
                  key={type.href}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <Link
                    href={type.href}
                    className="glass-card border-border/40 hover:shadow-card-hover flex flex-col items-center gap-4 rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-[5px] md:p-8"
                  >
                    <div className="bg-action/10 group-hover:bg-action flex size-14 items-center justify-center rounded-2xl transition-colors duration-300 md:size-16 md:rounded-3xl">
                      <type.icon className="text-action size-8 transition-transform group-hover:scale-110 group-hover:text-white md:text-4xl" />
                    </div>
                    <span className="text-primary text-base font-bold md:text-lg">
                      {type.type.label}
                    </span>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-border/40 text-action hover:bg-action hover:text-action-foreground absolute inset-s-0 top-0 my-auto hidden size-12 rounded-full border bg-white shadow-xl transition-all md:flex" />

            <CarouselNext className="border-border/40 text-action hover:bg-action hover:text-action-foreground absolute inset-e-0 my-auto hidden size-12 rounded-full border bg-white shadow-xl transition-all md:flex" />
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
