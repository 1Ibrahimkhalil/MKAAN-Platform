import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export function ServicesSkeleton() {
  return (
    <section className="bg-surface-secondary py-12 md:py-16">
      <Container>
        <Skeleton className="mb-8 h-8 w-32" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="ring-border rounded-xl bg-white p-6 ring-1">
              <Skeleton className="mb-4 size-12 rounded-lg" />
              <Skeleton className="mb-2 h-5 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
