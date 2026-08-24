import Image from "next/image";
import { Armchair, Building2, Paintbrush, Wrench } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { SectionHeading } from "./section-heading";

const services = [
  {
    icon: Building2,
    title: "العقارات",
    description:
      "بيع، شراء، وتأجير العقارات السكنية والتجارية بأفضل الأسعار وأدق التفاصيل.",
  },
  {
    icon: Paintbrush,
    title: "التشطيبات",
    description:
      "خدمات تشطيب متكاملة وعالية الجودة لتجهيز وحدتك على أعلى مستوى.",
  },
  {
    icon: Wrench,
    title: "الصيانة",
    description: "فريق متخصص لصيانة العقارات والمرافق لضمان استدامتها وراحتك.",
  },
  {
    icon: Armchair,
    title: "تجهيز العقار",
    description:
      "تأثيث وتجهيز العقارات بالكامل لتكون جاهزة للسكن أو العمل فورًا.",
  },
];

export function WhatWeDo() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/stitch/about-hero-bg.jpg"
          alt="عمارة مصرية حديثة"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-primary/85 absolute inset-0 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 py-[clamp(3rem,5vw,6rem)]">
        <Container>
          <RevealOnScroll className="mb-[clamp(2rem,3vw+0.5rem,3.5rem)] flex justify-center">
            <SectionHeading align="center" onDark title="ماذا نقدم" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <RevealOnScroll key={service.title}>
                <div className="group bg-primary/70 hover:border-action/60 flex h-full flex-col rounded-3xl border border-white/10 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="bg-action/20 group-hover:bg-action mb-8 flex size-16 items-center justify-center rounded-2xl transition-colors duration-300">
                    <service.icon className="size-9 text-white" />
                  </div>
                  <h3 className="font-headline-md mb-4 text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/70">
                    {service.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
