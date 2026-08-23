import { Container } from "@/components/layout/container";
import { PropertyGrid } from "./property-grid";
import { MOCK_PROPERTIES } from "../lib/mock-data";

export function SimilarProperties({ currentId }: { currentId: string }) {
  const similar = MOCK_PROPERTIES.filter((p) => p.id !== currentId).slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="fade-in-up py-12">
      <Container>
        <h2 className="text-headline-md text-primary border-action mb-8 inline-block border-b-2 pb-2 text-2xl font-semibold">
          عقارات مشابهة
        </h2>
        <PropertyGrid properties={similar} />
      </Container>
    </section>
  );
}
