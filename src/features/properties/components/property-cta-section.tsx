import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function PropertyCTASection() {
  return (
    <section className="bg-surface-container-low py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-primary mb-4 text-2xl font-semibold">
            العقار مناسب ليك؟
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base">
            اطلب معاينة وشوف العقار على الطبيعة، وفريق MKAAN هيتواصل معاك لتأكيد
            التفاصيل والموعد.
          </p>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Button
              variant="default"
              className="bg-action hover:bg-action-hover text-action-foreground rounded-lg px-12 py-3 text-sm font-bold shadow-sm"
            >
              اطلب معاينة
            </Button>
            <Button
              variant="outline"
              className="border-action text-action hover:bg-action/5 rounded-lg px-12 py-3 text-sm font-bold"
            >
              تواصل مع MKAAN
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
