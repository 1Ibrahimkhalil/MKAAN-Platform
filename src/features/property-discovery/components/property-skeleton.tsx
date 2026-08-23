import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border bg-surface-secondary overflow-hidden rounded-xl border shadow-sm",
        className,
      )}
    >
      <div className="bg-surface-tertiary h-48 w-full animate-pulse" />
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-surface-tertiary h-6 w-3/4 animate-pulse rounded" />
        <div className="bg-surface-tertiary h-4 w-1/2 animate-pulse rounded" />
        <div className="bg-surface-tertiary h-8 w-1/3 animate-pulse rounded" />
        <div className="border-border flex items-center justify-between border-t pt-4">
          <div className="flex gap-4">
            <div className="bg-surface-tertiary h-4 w-8 animate-pulse rounded" />
            <div className="bg-surface-tertiary h-4 w-8 animate-pulse rounded" />
            <div className="bg-surface-tertiary h-4 w-12 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
