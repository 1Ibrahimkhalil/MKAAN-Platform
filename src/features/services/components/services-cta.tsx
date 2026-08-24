import Link from "next/link";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

export function ServicesCTA() {
  return (
    <section className="bg-action py-10 md:py-10">
      <Container>
        <RevealOnScroll className="flex flex-col items-center gap-4 text-center">
          <h2 className="montserrat text-3xl font-bold text-white">
            محتاج خدمة لعقارك؟
          </h2>
          <p className="max-w-2xl text-lg text-white/80">
            قولنا محتاج إيه، وفريق MKAAN هيتواصل معاك ويحدد معاك الخطوات
            المناسبة.
          </p>
          <Link
            href="/contact"
            className="text-action mt-2 rounded-lg bg-white px-8 py-3 text-sm font-medium shadow-md transition-colors hover:bg-white/90"
          >
            اطلب خدمة
          </Link>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
