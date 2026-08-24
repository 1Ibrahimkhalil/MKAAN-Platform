import { Eye, Handshake, MonitorSmartphone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";
import { SectionHeading } from "./section-heading";

export function WhoWeAre() {
  return (
    <section className="py-[clamp(3rem,5vw,6rem)]">
      <Container>
        <RevealOnScroll className="items-center gap-[clamp(2rem,3vw+0.5rem,4rem)] lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title="من نحن"
              className="mb-[clamp(1.5rem,2vw+0.5rem,2.5rem)]"
            />
            <div className="space-y-4">
              <p className="text-muted-foreground text-base leading-relaxed font-medium md:text-lg">
                مكان هي منصتك العقارية اللي بتجمع بين أصحاب العقارات والباحثين
                عن العقار المناسب، وبتوفرلك كل اللي تحتاجه في مكان واحد. سواء
                كنت صاحب عقار وعايز تبيعه أو تأجره، أو بتدور على شقة أو عقار
                مناسب، إحنا بنسهّل عليك الطريق من أول البحث والعرض لحد المعاينة
                والتعاقد.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed font-medium md:text-lg">
                وكمان بنقدم خدمات التشطيبات والصيانة وتجهيز العقار للبيع أو
                الإيجار، علشان نخلي تجربتك العقارية أبسط، أوضح، وأكثر تنظيمًا.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7 lg:mt-0">
            <div className="border-border/30 hover:border-action/30 bg-surface-secondary flex flex-col items-center justify-center rounded-3xl border p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl max-sm:min-h-48 sm:aspect-square">
              <Handshake className="text-action mb-4 size-12 md:size-14" />
              <h3 className="font-headline-md text-primary mb-2 text-xl font-bold md:text-2xl">
                ثقة
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                معاملات آمنة وموثوقة
              </p>
            </div>

            <div className="bg-primary flex flex-col items-center justify-center rounded-3xl p-8 text-center text-white shadow-xl transition-all duration-300 hover:shadow-2xl max-sm:min-h-48 sm:aspect-square sm:translate-y-6">
              <Eye className="text-action mb-4 size-12 md:size-14" />
              <h3 className="font-headline-md mb-2 text-xl font-bold text-white md:text-2xl">
                شفافية
              </h3>
              <p className="text-sm text-white/80 md:text-base">
                وضوح تام في التفاصيل
              </p>
            </div>

            <div className="border-border/30 hover:border-action/30 bg-surface-secondary flex items-center justify-between gap-4 rounded-3xl border p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 md:p-8">
              <div>
                <h3 className="font-headline-md text-primary mb-2 text-xl font-bold md:text-2xl">
                  تجربة مبسطة
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  واجهة مستخدم مصممة لراحتك
                </p>
              </div>
              <div className="bg-action/10 flex size-14 shrink-0 items-center justify-center rounded-full md:size-16">
                <MonitorSmartphone className="text-action size-8 md:size-9" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
