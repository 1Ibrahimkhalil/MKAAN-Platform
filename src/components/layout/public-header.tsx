import Link from "next/link";
import { Home, Building2, Phone, ListOrdered } from "lucide-react";
import { Container } from "./container";

const navLinks = [
  { href: "/properties", label: "العقارات", icon: Building2 },
  { href: "/services", label: "الخدمات", icon: Home },
  { href: "/list-property", label: "أضف عقارك", icon: ListOrdered },
  { href: "/contact", label: "تواصل معنا", icon: Phone },
];

export function PublicHeader() {
  return (
    <header className="bg-surface-secondary/80 border-border sticky top-0 z-50 border-b backdrop-blur-md">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-primary flex items-center gap-2 text-lg font-bold"
          >
            MKAAN
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-foreground hover:bg-muted rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/request-property"
              className="bg-action hover:bg-action-hover inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors"
            >
              ابحث عن عقار
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
