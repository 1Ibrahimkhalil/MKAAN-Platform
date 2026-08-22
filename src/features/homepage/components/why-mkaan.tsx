"use client";

import Image from "next/image";
import {
  Camera,
  Layers,
  Headphones,
  Palette,
  Wrench,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { useRevealOnScroll } from "@/lib/hooks/use-reveal-on-scroll";

const features = [
  {
    icon: Camera,
    title: "معاينة وتصوير حقيقي",
    description: "كل عقار بنعرضه بنصوره بنفسنا عشان نضمنلك الواقعية والشفافية.",
  },
  {
    icon: Layers,
    title: "تنوع الخيارات",
    description:
      "عقارات بتناسب كل احتياج، سواء بتدور على سكن فاخر أو استثمار آمن.",
  },
  {
    icon: Headphones,
    title: "متابعة من البداية للنهاية",
    description: "فريقنا معاك خطوة بخطوة من أول اتصال لحد ما تستلم المفتاح.",
  },
  {
    icon: Palette,
    title: "خدمات متكاملة",
    description: "وساطة، تشطيب، صيانة... كله موجود تحت سقف واحد لراحتك.",
  },
  {
    icon: Wrench,
    title: "شبكة فنيين موثوقين",
    description:
      "متعاقدين مع أحسن الصنايعية والفنيين لضمان جودة أي شغل في عقارك.",
  },
  {
    icon: MapPin,
    title: "تركيز محلي",
    description:
      "تركيزنا على المنوفية وشبين الكوم بيخلينا الأقدر على تقديم أحسن خدمة للمنطقة.",
  },
];

export function WhyMkaan() {
  const sectionRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="overflow-hidden py-[clamp(3rem,5vw,6rem)]">
      <Container>
        <div
          ref={sectionRef}
          className="reveal-up items-center gap-[clamp(2rem,3vw+0.5rem,4rem)] lg:grid lg:grid-cols-2"
        >
          <div>
            <span className="text-action mb-2 block text-sm font-bold tracking-wider uppercase">
              لماذا نحن؟
            </span>
            <h2 className="text-primary font-headline-lg mb-4 text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-tight font-extrabold md:mb-6">
              ليه تتعامل مع مكان؟
            </h2>
            <p className="text-muted-foreground mb-8 text-base leading-relaxed font-medium md:mb-10 md:text-lg">
              إحنا مش مجرد منصة عقارية، إحنا شريكك اللي بيوفرلك كل حاجة تحتاجها
              لعقارك في مكان واحد وبأعلى جودة ومصداقية.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-2"
                >
                  <div className="bg-action/10 text-action flex size-12 shrink-0 items-center justify-center rounded-xl md:size-14 md:rounded-2xl">
                    <feature.icon className="size-6 md:size-7" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 text-base font-bold md:text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed font-medium md:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="from-action/20 absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-tr to-transparent transition-transform duration-500 hover:rotate-6" />
            <Image
              src="/images/stitch/prop_office.jpg"
              alt="مكتب عقاري حديث"
              width={800}
              height={600}
              className="relative z-10 rounded-3xl border border-white/50 shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            />
            <div className="border-border/10 absolute -end-4 -bottom-4 z-20 flex animate-bounce items-center gap-3 rounded-2xl border bg-white p-4 shadow-xl md:-end-6 md:-bottom-6 md:p-5">
              <div className="text-action text-2xl font-extrabold md:text-3xl">
                100%
              </div>
              <div className="text-muted-foreground text-xs font-medium md:text-sm">
                شفافية
                <br />
                ومصداقية
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
