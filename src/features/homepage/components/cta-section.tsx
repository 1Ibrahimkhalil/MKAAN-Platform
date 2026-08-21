import Link from "next/link";
import { Container } from "@/components/layout/container";

export function CtaSection() {
  return (
    <section className="bg-primary py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            هل تبحث عن عقار؟
          </h2>
          <p className="max-w-lg text-base text-white/70">
            سواء كنت تبحث عن شقة أو فيلا أو أرض، نحن هنا لمساعدتك
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request-property"
              className="bg-action hover:bg-action-hover inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
            >
              ابحث عن عقارك
            </Link>
            <Link
              href="/list-property"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              أضف عقارك
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
