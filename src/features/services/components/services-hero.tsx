import { RevealOnScroll } from "@/components/feedback/reveal-on-scroll";

export function ServicesHero() {
  return (
    <section className="relative flex h-[250px] items-center justify-center overflow-hidden md:h-[300px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/stitch/services-hero-bg.jpg)",
        }}
      >
        <div className="bg-primary/70 absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-2 px-4 py-10 text-center text-white">
        <RevealOnScroll>
          <h1 className="montserrat mb-2 text-5xl font-bold drop-shadow-lg md:text-6xl">
            خدماتنا
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/80 drop-shadow-md md:text-xl">
            من الصيانة والتشطيبات لحد تجهيز العقار للبيع أو الإيجار، MKAAN
            بيساعدك تحافظ على قيمة عقارك وتخليه جاهز.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
