import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export function HeroSkeleton() {
  return (
    <section className="bg-primary relative overflow-hidden py-16 md:py-24">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <Skeleton className="h-12 w-80 bg-white/10 md:h-16 md:w-[500px]" />
          <Skeleton className="h-6 w-64 bg-white/10 md:w-96" />
          <Skeleton className="h-14 w-full rounded-2xl bg-white/10 md:max-w-2xl" />
        </div>
      </Container>
    </section>
  );
}
