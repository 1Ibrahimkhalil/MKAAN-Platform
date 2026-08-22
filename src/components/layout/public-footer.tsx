import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import {
  FOOTER_PROPERTY_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_LEGAL_LINKS,
} from "@/config";

export function PublicFooter() {
  return (
    <footer className="bg-primary mt-auto w-full text-white">
      <div className="mx-auto w-full px-[clamp(1rem,2vw+0.5rem,2.5rem)] lg:max-w-[1120px] xl:max-w-[1280px]">
        <div className="rtl grid grid-cols-1 gap-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(2rem,4vw,4rem)] text-start md:grid-cols-2 md:gap-[clamp(2rem,3vw,3rem)] lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h4 className="mb-1 text-[clamp(1rem,1.2vw+0.25rem,1.25rem)] font-bold text-white">
              عن مكان
            </h4>
            <Image
              src="/logo.png"
              alt="MKAAN"
              width={140}
              height={40}
              className="h-10 w-auto object-contain opacity-100 brightness-0 invert md:h-12"
            />
            <p className="mt-1 max-w-sm text-[clamp(0.8125rem,1vw+0.125rem,1rem)] leading-relaxed font-medium text-white/80">
              مكان هي وجهتك الأولى لكل ما يخص العقارات. من البيع والإيجار إلى
              التشطيب والصيانة، بنوفرلك تجربة متكاملة وموثوقة.
            </p>
            <div className="mt-2 flex gap-3">
              <Link
                href="#"
                className="hover:text-primary flex size-9 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                aria-label="فيسبوك"
              >
                <span className="text-lg">f</span>
              </Link>
              <Link
                href="#"
                className="hover:text-primary flex size-9 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                aria-label="مشاركة"
              >
                <span className="text-lg">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3 md:mt-0">
            <h4 className="mb-1 text-[clamp(0.875rem,1vw+0.125rem,1.125rem)] font-bold text-white">
              العقارات
            </h4>
            {FOOTER_PROPERTY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-[clamp(0.8125rem,1vw+0.125rem,0.9375rem)] font-medium text-white/70 transition-all hover:-translate-x-2 hover:text-white rtl:hover:translate-x-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-3 md:mt-0">
            <h4 className="mb-1 text-[clamp(0.875rem,1vw+0.125rem,1.125rem)] font-bold text-white">
              الخدمات
            </h4>
            {FOOTER_SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-[clamp(0.8125rem,1vw+0.125rem,0.9375rem)] font-medium text-white/70 transition-all hover:-translate-x-2 hover:text-white rtl:hover:translate-x-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-2 flex flex-col gap-3 md:mt-0">
            <h4 className="mb-1 text-[clamp(0.875rem,1vw+0.125rem,1.125rem)] font-bold text-white">
              تواصل معنا
            </h4>
            <a
              href="tel:01000000000"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5 text-[clamp(0.8125rem,1vw+0.125rem,0.9375rem)] font-medium text-white/80 transition-all hover:-translate-y-1 hover:bg-white/10 hover:text-white"
            >
              <Phone className="size-4 text-white" />
              01000000000
            </a>
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:border-whatsapp/50 hover:bg-whatsapp/20 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5 text-[clamp(0.8125rem,1vw+0.125rem,0.9375rem)] font-medium text-white/80 transition-all hover:-translate-y-1 hover:text-white"
            >
              <MessageCircle className="text-whatsapp size-4" />
              WhatsApp
            </a>
            <h4 className="mt-2 text-[clamp(0.875rem,1vw+0.125rem,1rem)] font-bold text-white">
              مناطق الخدمة
            </h4>
            <p className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[clamp(0.75rem,0.8vw+0.125rem,0.875rem)] leading-relaxed font-medium text-white/70">
              شبين الكوم والمناطق والقرى المحيطة بيها
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 border-t border-white/10 bg-black/20 py-[clamp(1.5rem,3vw,2rem)]">
          <p className="text-[clamp(0.75rem,1vw+0.25rem,0.9375rem)] font-medium text-white/60">
            © {new Date().getFullYear()} مكان (MKAAN) - جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[clamp(0.75rem,1vw+0.25rem,0.875rem)] text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
