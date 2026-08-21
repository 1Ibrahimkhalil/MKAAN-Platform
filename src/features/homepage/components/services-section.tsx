import Link from "next/link";
import { Paintbrush, Wrench, Home } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MOCK_SERVICES } from "./types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Paintbrush,
  Wrench,
  Home,
};

export function ServicesSection() {
  return (
    <section className="bg-surface-secondary py-12 md:py-16">
      <Container>
        <h2 className="text-foreground mb-8 text-2xl font-bold md:text-3xl">
          خدماتنا
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOCK_SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group ring-border rounded-xl bg-white p-6 ring-1 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {Icon && (
                  <div className="bg-action/10 mb-4 flex size-12 items-center justify-center rounded-lg">
                    <Icon className="text-action size-6" />
                  </div>
                )}
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                <span className="text-action mt-4 inline-block text-sm font-medium transition-colors group-hover:underline">
                  المزيد ←
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
