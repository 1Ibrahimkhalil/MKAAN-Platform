import Link from "next/link";
import { Search, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

export function RequestPropertyCta() {
  return (
    <section className="mb-[clamp(3rem,5vw,6rem)] overflow-hidden py-[clamp(3rem,5vw,6rem)]">
      <Container>
        <RevealOnScroll className="border-border/20 bg-primary relative overflow-hidden rounded-3xl border p-[clamp(1.5rem,3vw+0.5rem,5rem)] shadow-xl">
          <div className="absolute -end-16 -top-16 size-48 rounded-full bg-white/5 blur-3xl transition-transform duration-1000 hover:scale-150 md:-end-24 md:-top-24 md:size-64" />
          <div className="absolute -start-16 -bottom-16 size-48 rounded-full bg-white/5 blur-3xl transition-transform duration-1000 hover:scale-150 md:-start-24 md:-bottom-24 md:size-64" />

          <div className="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
            <Search className="mb-4 text-4xl text-white transition-transform hover:rotate-12 md:mb-6 md:text-5xl" />
            <h2 className="font-headline-xl text-[clamp(1.5rem,2.5vw+0.5rem,2.5rem)] leading-tight font-extrabold text-white">
              مش لاقي اللي بتدور عليه؟
            </h2>
            <p className="text-base leading-relaxed font-medium text-white/90 md:text-lg lg:text-xl">
              قولنا إنت محتاج إيه بالظبط، وفريق مكان هيقوم بالمهمة وهيدور لك على
              العقار المناسب اللي يحقق كل طموحاتك.
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row md:mt-10">
              <Link
                href="/request-property"
                className="text-primary hover:text-action flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-bold shadow-lg transition-all hover:-translate-y-1 hover:bg-gray-100 md:px-12 md:py-4 md:text-lg"
              >
                اطلب عقار الآن
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/50 px-8 py-3 text-base font-bold text-white transition-all hover:border-white hover:bg-white/10 md:px-12 md:py-4 md:text-lg"
              >
                <Phone className="size-5" />
                تواصل معنا
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
