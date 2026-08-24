import { Rocket } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

export function OurMission() {
  return (
    <section className="bg-surface-secondary border-border/20 relative overflow-hidden border-y py-[clamp(3rem,5vw,6rem)]">
      <div className="bg-action/5 absolute -end-24 -top-24 size-96 rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute -start-24 -bottom-24 size-96 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="bg-action/10 mb-8 flex size-24 items-center justify-center rounded-full">
            <Rocket className="text-action size-12" />
          </div>
          <h2 className="font-headline-lg text-primary mb-4 text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] font-extrabold tracking-tight">
            مهمتنا
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-medium md:text-lg lg:text-xl">
            تبسيط رحلة العقارات في مصر وتقديم خدمات موثوقة تخدم المجتمع المحلي.
            نسعى لنكون الوجهة الأولى لكل من يبحث عن الاستقرار أو الاستثمار
            العقاري بأعلى معايير الجودة والاحترافية.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
