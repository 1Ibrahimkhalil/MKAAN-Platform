import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export function FeaturedPropertiesSkeleton() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Skeleton className="mb-8 h-8 w-48" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="ring-border overflow-hidden rounded-xl ring-1"
            >
              <Skeleton className="aspect-video" />
              <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
