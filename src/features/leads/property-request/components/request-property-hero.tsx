import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

export function RequestPropertyHero() {
  return (
    <section className="relative flex h-[250px] items-center justify-center overflow-hidden md:h-[300px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/stitch/properties-hero-bg.jpg)",
        }}
      >
        <div className="bg-primary/70 absolute inset-0" />
      </div>

      <Container className="relative z-10">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-md md:text-3xl lg:text-4xl">
            مواصفاتك عندنا.. اطلب عقارك دلوقتي وهنجيبهولك لحد عندك
          </h1>
          <p className="text-sm leading-relaxed text-white/80 drop-shadow-sm md:text-base lg:text-lg">
            متشيلش هم التدوير، فريق MKAAN هيقلب لك الدنيا عشان يوصلك للعقار اللي
            بتحلم بيه في أسرع وقت وأحسن سعر.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
