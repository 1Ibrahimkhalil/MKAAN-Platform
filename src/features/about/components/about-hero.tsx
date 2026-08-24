import Image from "next/image";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[clamp(320px,42vh,520px)] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stitch/about-hero-bg.jpg"
          alt="عقارات مكان"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="from-primary/60 to-primary/95 absolute inset-0 bg-gradient-to-b" />
      </div>

      <Container className="relative z-10 py-16 text-center md:py-20">
        <RevealOnScroll className="mx-auto max-w-4xl">
          <h1 className="font-headline-xl text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] leading-tight font-extrabold tracking-tight text-white drop-shadow-lg">
            عن مكان
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed font-medium text-white/85 drop-shadow-md md:text-xl lg:text-2xl">
            منصة مصرية رائدة تجمع بين التكنولوجيا والخبرة المحلية في سوق
            العقارات.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
