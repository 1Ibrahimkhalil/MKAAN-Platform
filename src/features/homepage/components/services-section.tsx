import Link from "next/link";
import { LandPlot, Paintbrush, Wrench, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

const services = [
  {
    icon: LandPlot,
    title: "الوساطة العقارية",
    description:
      "بيع أو إيجار؟ هنساعدك تلاقي العقار المناسب ونتابع معاك لحد إتمام الصفقة.",
    cta: "استكشف العقارات",
    href: "/properties",
  },
  {
    icon: Paintbrush,
    title: "التشطيبات والتجهيز",
    description: "من أول المعاينة لحد التنفيذ والتسليم، حسب احتياجك ورؤيتك.",
    cta: "اطلب تشطيب",
    href: "/services/finishing",
  },
  {
    icon: Wrench,
    title: "الصيانة",
    description:
      "أي مشكلة في عقارك، هنساعدك نوصل للفني المناسب ونتابع الخدمة لضمان جودتها.",
    cta: "اطلب صيانة",
    href: "/services/maintenance",
  },
];

export function ServicesSection() {
  return (
    <section className="from-surface-tertiary relative overflow-hidden bg-gradient-to-b to-white py-[clamp(3rem,5vw,6rem)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              height="40"
              id="grid"
              patternUnits="userSpaceOnUse"
              width="40"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%" />
        </svg>
      </div>

      <Container className="relative z-10">
        <RevealOnScroll className="mb-12 text-center md:mb-16">
          <span className="text-action mb-3 block text-sm font-bold tracking-widest uppercase">
            خدماتنا المتكاملة
          </span>
          <h2 className="text-primary font-headline-lg mb-4 text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] font-extrabold tracking-tight md:mb-6">
            خدمات مكان
          </h2>
          <p className="text-muted-foreground/90 mx-auto max-w-2xl text-base leading-relaxed font-medium md:text-lg lg:text-xl">
            مش بس بنساعدك تلاقي العقار، بنوفر لك كمان الخدمات اللي تحتاجها بعد
            كده.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-[clamp(1.25rem,1.5vw+0.5rem,2rem)] md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.href}
              className="group border-border/20 hover:border-action/30 hover:shadow-action/10 flex flex-col items-center rounded-[2rem] border bg-white p-[clamp(1.5rem,2vw+0.5rem,2.5rem)] text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:rounded-[2.5rem]"
            >
              <div className="bg-action/10 mb-6 flex size-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 md:mb-8 md:size-20 md:rounded-3xl">
                <service.icon className="text-action size-10 md:text-5xl" />
              </div>
              <h3 className="text-primary font-headline-md group-hover:text-action mb-4 text-xl font-extrabold transition-colors md:text-2xl">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-medium md:text-base">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="bg-action shadow-action/20 hover:bg-action-hover hover:shadow-action/30 mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all md:rounded-2xl md:py-4 md:text-base"
              >
                {service.cta}
                <ArrowLeft className="size-5 rtl:rotate-180" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
