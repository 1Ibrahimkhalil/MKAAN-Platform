import Link from "next/link";
import { HousePlus, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config";

export function AboutCta() {
  return (
    <section className="pb-[clamp(3rem,5vw,6rem)]">
      <Container>
        <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-headline-lg text-primary mb-4 text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] font-extrabold tracking-tight">
            ابدأ رحلتك العقارية اليوم
          </h2>
          <p className="text-muted-foreground mb-[clamp(2rem,3vw+0.5rem,3rem)] max-w-2xl text-base leading-relaxed font-medium md:text-lg lg:text-xl">
            سواء كنت تبحث عن منزل أحلامك أو ترغب في عرض عقارك للبيع أو الإيجار،
            مكان هي بوابتك الموثوقة.
          </p>

          <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row md:gap-6">
            <Button
              variant="default"
              size="xlg"
              nativeButton={false}
              render={<Link href={ROUTES.PROPERTIES} />}
              className="bg-action shadow-action/30 hover:bg-action-hover hover:shadow-action/40 w-full gap-3 rounded-xl px-10 text-lg font-bold shadow-lg transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              استكشف العقارات
              <Search className="size-5" />
            </Button>

            <Button
              variant="outline"
              size="xlg"
              nativeButton={false}
              render={<Link href={ROUTES.LIST_PROPERTY} />}
              className="border-primary/10 hover:border-primary hover:bg-primary/5 text-primary w-full gap-3 rounded-xl bg-white px-10 text-lg font-bold transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              اعرض عقارك
              <HousePlus className="size-5" />
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
