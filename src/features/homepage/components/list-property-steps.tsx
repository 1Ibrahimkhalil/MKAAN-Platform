"use client";

import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Phone,
  MapPin,
  Camera,
  FileEdit,
  Handshake,
  Megaphone,
  Plus,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { useRevealOnScroll } from "@/lib/hooks/use-reveal-on-scroll";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: FileText,
    number: 1,
    title: "طلب",
    description: "سجل بياناتك الأولية",
    isFirst: true,
  },
  {
    icon: CheckCircle,
    number: 2,
    title: "مراجعة",
    description: "دراسة الطلب من فريقنا",
  },
  {
    icon: Phone,
    number: 3,
    title: "تواصل",
    description: "تحديد موعد للمقابلة",
  },
  {
    icon: MapPin,
    number: 4,
    title: "معاينة",
    description: "زيارة ميدانية للعقار",
  },
  {
    icon: Camera,
    number: 5,
    title: "تصوير",
    description: "جلسة تصوير احترافية",
  },
  {
    icon: FileEdit,
    number: 6,
    title: "استكمال البيانات",
    description: "تجهيز ملف العقار",
  },
  {
    icon: Handshake,
    number: 7,
    title: "اتفاق",
    description: "توقيع عقود التسويق",
  },
  {
    icon: Megaphone,
    number: 8,
    title: "نشر وتسويق",
    description: "الوصول لآلاف المشترين",
  },
];

export function ListPropertySteps() {
  const headerRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section
      id="list-property-section"
      className="border-border/10 bg-surface-tertiary overflow-hidden border-y py-[clamp(3rem,5vw,6rem)]"
    >
      <Container>
        <div
          ref={headerRef}
          className="reveal-up relative mb-16 text-center md:mb-20"
        >
          <span className="text-action mb-3 block text-sm font-bold tracking-widest uppercase">
            خطوات بسيطة لبيع عقارك
          </span>
          <h2 className="text-primary font-headline-lg mb-4 text-[clamp(1.5rem,2vw+0.5rem,2.25rem)] leading-tight font-extrabold md:mb-6">
            عندك عقار وعايز تبيعه أو تأجره؟
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed font-medium md:text-lg lg:text-xl">
            ابعتلنا تفاصيل عقارك، وفريق مكان هيتواصل معاك لمعاينته وتصويره
            وتجهيز بياناته وتسويقه بأعلى احترافية.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 400"
          >
            <path
              className="flowing-path"
              d="M 875 48 L 125 48 C 125 170, 875 170, 875 293 L 125 293"
              fill="none"
              stroke="#0061e0"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
            <div className="border-action/20 absolute start-1/4 top-0 bottom-0 border border-dashed" />
            <div className="border-action/20 absolute end-1/4 top-0 bottom-0 border border-dashed" />
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-[clamp(2rem,3vw+1rem,5rem)] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group flex flex-col items-center text-center"
              >
                <div
                  className={`ring-action/5 group-hover:ring-action/20 border-border/30 group-hover:border-action group-hover:shadow-action/10 relative mb-4 flex size-[clamp(4rem,5vw+1rem,6rem)] items-center justify-center rounded-[1.25rem] border bg-white transition-all duration-500 group-hover:shadow-xl md:mb-6 md:rounded-3xl md:ring-4 ${
                    step.isFirst
                      ? "after:bg-action/10 after:absolute after:inset-0 after:z-[-1] after:animate-ping after:rounded-3xl"
                      : ""
                  }`}
                >
                  <step.icon className="text-primary group-hover:text-action size-8 transition-all duration-300 group-hover:rotate-12 md:text-[40px]" />
                  <div className="bg-action absolute -end-2 -top-2 flex size-6 scale-110 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-lg md:-end-3 md:-top-3 md:size-8 md:text-sm">
                    {step.number}
                  </div>
                </div>
                <h4 className="text-primary mb-2 text-base font-bold md:text-lg">
                  {step.title}
                </h4>
                <p className="text-muted-foreground px-4 text-xs font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center md:mt-20">
          <Button
            type="button"
            size="xlg"
            nativeButton={false}
            className="bg-action hover:bg-action-hover shadow-action/20 hover:shadow-action/30 mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-1 md:px-16 md:py-5 md:text-xl"
            render={<Link href="/list-property" />}
          >
            <Plus className="size-6" />
            اعرض عقارك الآن
          </Button>
        </div>
      </Container>
    </section>
  );
}
