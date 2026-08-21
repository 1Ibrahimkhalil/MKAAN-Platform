"use client";

import { SearchBar } from "@/features/property-discovery/components/search-bar";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="bg-primary relative overflow-hidden py-16 md:py-24">
      <div className="from-primary via-primary/95 to-primary/80 absolute inset-0 bg-gradient-to-br" />
      <div className="absolute inset-0 opacity-10" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl leading-tight font-bold text-white md:text-5xl md:leading-tight">
            ابحث عن عقارك المثالي
          </h1>
          <p className="max-w-xl text-base text-white/70 md:text-lg">
            منصة عقارات مصرية متخصصة في العقارات والخدمات العقارية
          </p>
          <SearchBar
            placeholder="ابحث عن عقار..."
            className="w-full md:max-w-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
