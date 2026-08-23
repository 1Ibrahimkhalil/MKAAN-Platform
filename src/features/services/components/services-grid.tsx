import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { ServiceCard } from "./service-card";

const services = [
  {
    title: "التشطيبات",
    description:
      "بنساعدك تنفذ التشطيبات المناسبة لعقارك بجودة عالية وبما يتناسب مع احتياجاتك.",
    image: "/images/stitch/service-finishing.jpg",
    tags: [
      "تشطيب كامل",
      "تشطيب جزئي",
      "تشطيبات حسب حالة العقار",
      "تشطيبات حسب احتياج العميل",
    ],
    ctaLabel: "اطلب الخدمة",
    ctaHref: "/services/finishing",
  },
  {
    title: "الصيانة",
    description:
      "خدمات صيانة تساعدك تحافظ على العقار وتعالج المشاكل قبل ما تكبر.",
    image: "/images/stitch/service-maintenance.jpg",
    tags: ["كهرباء", "سباكة", "تكييف", "صيانة عامة", "إصلاحات مختلفة"],
    ctaLabel: "اطلب الخدمة",
    ctaHref: "/services/maintenance",
  },
  {
    title: "تجهيز العقار للبيع أو الإيجار",
    description:
      "لو العقار محتاج صيانة أو تشطيب قبل ما تعرضه، MKAAN يساعدك تجهزه ويخليه في أفضل حالة ممكنة للبيع أو الإيجار.",
    image: "/images/stitch/service-property-prep.jpg",
    tags: [
      "الصيانة",
      "التشطيبات",
      "معالجة العيوب والمشاكل",
      "تحسين الشكل العام للعقار",
    ],
    ctaLabel: "جهز عقارك",
    ctaHref: "/contact",
    isPrimary: true,
  },
];

export function ServicesGrid() {
  return (
    <section className="w-full py-8 md:py-10 lg:py-10">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealOnScroll key={service.title}>
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                tags={service.tags}
                ctaLabel={service.ctaLabel}
                ctaHref={service.ctaHref}
                isPrimary={service.isPrimary}
              />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
