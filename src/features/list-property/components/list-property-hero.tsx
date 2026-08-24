import { Container } from "@/components/layout/container";
import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

const STITCH_HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAeTwheEJTph5YvGQ2GO_jLwYs24l-WLjgyez4RydkSS9Mz-2rFOqYmRwnjLL4JxLItkt4m54fwJeIBvL-Pw85YTJ2GA6OIG-HRCy2SxXowuVOE_eD0PQTEUKwqI_9nFDza0M2xR_bt5y_vObRnu9jYLTVG8nrXsTN54yss1YwSJakb4OrSsEIlFfWfckE-PTZPgENEWlTnYL7SIaaAq4xmK6ZJAAiWbWfJxTOcXbJQr4powEiRFOlf";

export function ListPropertyHero() {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${STITCH_HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="relative z-10 py-12 text-center">
        <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-white drop-shadow-md md:text-4xl lg:text-5xl">
            عايز تعرض عقارك؟
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-sm md:text-lg lg:text-xl">
            سيب بيانات عقارك لفريق MKAAN، وإحنا هنتواصل معاك ونكمل معاك خطوات
            المعاينة والتصوير وتجهيز الإعلان.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
