import { Headphones, Images, Map, MousePointerClick } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { SectionHeading } from "./section-heading";

const features = [
  {
    icon: Map,
    title: "الخبرة المحلية",
    description: "فهم عميق للسوق المصري وتوجهاته لتقديم أفضل النصائح والفرص.",
  },
  {
    icon: Images,
    title: "عرض احترافي",
    description: "تصوير عالي الجودة ووصف دقيق لكل عقار لإبراز قيمته الحقيقية.",
  },
  {
    icon: MousePointerClick,
    title: "سهولة الوصول",
    description:
      "منصة رقمية متطورة تتيح لك البحث والتواصل بضغطة زر وفي أي وقت.",
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    description:
      "فريق دعم متواجد دائمًا للإجابة على استفساراتك وتوجيهك خطوة بخطوة.",
  },
];

export function WhyMkaan() {
  return (
    <section className="py-[clamp(3rem,5vw,6rem)]">
      <Container>
        <RevealOnScroll className="items-center gap-[clamp(2rem,3vw+0.5rem,4rem)] lg:grid lg:grid-cols-2">
          <div>
            <SectionHeading
              title="لماذا مكان؟"
              className="mb-[clamp(2rem,3vw+0.5rem,3rem)]"
            />
            <div className="space-y-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-5 md:gap-6">
                  <div className="bg-action/10 text-action flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-sm md:size-16">
                    <feature.icon className="size-6 md:size-7" />
                  </div>
                  <div>
                    <h4 className="font-headline-md text-primary mb-2 text-xl font-bold md:text-2xl">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="border-border/10 bg-surface-secondary relative aspect-square w-full overflow-hidden rounded-[2rem] border p-6 shadow-2xl md:p-8">
              <div className="bg-action/10 absolute -end-20 -top-20 size-96 rounded-full blur-3xl" />
              <div className="bg-primary/5 absolute -start-20 -bottom-20 size-96 rounded-full blur-3xl" />

              <div className="relative z-10 mx-auto grid w-full max-w-md grid-cols-2 gap-5 md:gap-6">
                <div className="border-border/10 bg-surface-container-low flex aspect-square flex-col justify-end rounded-2xl border p-5 shadow-sm max-sm:aspect-auto max-sm:min-h-40 md:translate-y-6">
                  <div className="bg-primary/10 mb-3 h-3 w-full rounded-full" />
                  <div className="bg-primary/10 h-3 w-2/3 rounded-full" />
                </div>

                <div className="bg-primary flex aspect-square flex-col justify-end rounded-2xl p-5 shadow-xl max-sm:aspect-auto max-sm:min-h-40">
                  <div className="mb-3 h-3 w-full rounded-full bg-white/20" />
                  <div className="h-3 w-3/4 rounded-full bg-white/20" />
                </div>

                <div className="bg-action flex aspect-square flex-col justify-end rounded-2xl p-5 shadow-xl max-sm:aspect-auto max-sm:min-h-40 md:translate-y-6">
                  <div className="mb-3 h-3 w-full rounded-full bg-white/30" />
                  <div className="h-3 w-1/2 rounded-full bg-white/30" />
                </div>

                <div className="border-border/10 bg-surface-container-low flex aspect-square flex-col justify-end rounded-2xl border p-5 shadow-sm max-sm:aspect-auto max-sm:min-h-40">
                  <div className="bg-primary/10 mb-3 h-3 w-full rounded-full" />
                  <div className="bg-primary/10 h-3 w-5/6 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
