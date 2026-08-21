import Link from "next/link";
import { Container } from "./container";

const footerLinks = [
  {
    title: "العقارات",
    links: [
      { href: "/properties", label: "تصفح العقارات" },
      { href: "/request-property", label: "ابحث عن عقار" },
      { href: "/list-property", label: "أضف عقارك" },
    ],
  },
  {
    title: "الخدمات",
    links: [
      { href: "/services", label: "جميع الخدمات" },
      { href: "/services/finishing", label: "التشطيب" },
      { href: "/services/maintenance", label: "الصيانة" },
      { href: "/services/preparation", label: "تحضير العقار للبيع/الإيجار" },
    ],
  },
  {
    title: "تواصل معنا",
    links: [
      { href: "/contact", label: "نموذج التواصل" },
      { href: "https://wa.me/201000000000", label: "واتساب", external: true },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="bg-primary text-white/80">
      <Container>
        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="mb-4 inline-block text-lg font-bold text-white"
            >
              MKAAN
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              منصة عقاقية مصرية متخصصة في العقارات والخدمات العقارية
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold text-white">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} MKAAN. جميع الحقوق محفوظة.</p>
        </div>
      </Container>
    </footer>
  );
}
