"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { PropertyGrid } from "@/features/property-discovery/components/property-grid";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { MOCK_FEATURED_PROPERTIES, type FeaturedProperty } from "./types";

function formatPropertyData(properties: FeaturedProperty[]) {
  return properties.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    price: p.price,
    image: p.image,
    category: p.category,
    transactionType: p.transactionType,
  }));
}

export function FeaturedProperties() {
  const [error, setError] = useState<string | null>(null);

  const properties = formatPropertyData(MOCK_FEATURED_PROPERTIES);

  if (error) {
    return (
      <section className="py-12 md:py-16">
        <Container>
          <h2 className="text-foreground mb-8 text-2xl font-bold md:text-3xl">
            عقارات مميزة
          </h2>
          <ErrorState message={error} onRetry={() => setError(null)} />
        </Container>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-12 md:py-16">
        <Container>
          <h2 className="text-foreground mb-8 text-2xl font-bold md:text-3xl">
            عقارات مميزة
          </h2>
          <EmptyState message="لا توجد عقارات مميزة حالياً" />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="text-foreground mb-8 text-2xl font-bold md:text-3xl">
          عقارات مميزة
        </h2>
        <PropertyGrid properties={properties} />
      </Container>
    </section>
  );
}
