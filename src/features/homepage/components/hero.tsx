import Image from "next/image";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { HeroSearchCard } from "./hero-search-card";

export function Hero() {
  return (
    <section className="relative flex min-h-[clamp(400px,65vh,800px)] w-full items-center justify-center overflow-hidden py-4">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stitch/hero_bg.jpg"
          alt="MKAAN Hero"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </div>

      <Container className="relative z-10 flex min-h-[inherit] flex-col items-center justify-end pb-[clamp(1.5rem,5vw,8rem)]">
        <RevealOnScroll className="mb-[clamp(1rem,3vw,3rem)] text-center">
          <span className="font-headline-md mb-3 block text-sm font-bold tracking-[0.3em] text-white/80 uppercase md:text-base">
            MKAAN
          </span>
          <h1 className="font-headline-xl mb-4 text-[clamp(2rem,3.5vw+0.5rem,4rem)] leading-tight font-extrabold tracking-tight text-white drop-shadow-lg md:mb-6">
            دَوّر على المكان اللي يناسبك
          </h1>
          <p className="mx-auto max-w-3xl text-[clamp(1rem,1.2vw+0.5rem,1.5rem)] leading-relaxed font-medium text-white/90 drop-shadow-md">
            بيع، إيجار، تشطيبات وصيانة... كل اللي يخص العقار هتلاقيه مع مكان.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="w-full max-w-5xl">
          <HeroSearchCard />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
