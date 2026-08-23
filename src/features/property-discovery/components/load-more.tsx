"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LoadMore({
  loading,
  hasMore,
  onLoadMore,
  sentinelRef,
  className,
}: {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  sentinelRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  if (!hasMore && !loading) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        لا عقارات أخرى
      </p>
    );
  }

  return (
    <div
      ref={sentinelRef}
      className={cn(
        "text-muted-foreground mt-12 flex flex-col items-center justify-center py-8",
        className,
      )}
    >
      {loading ? (
        <>
          <div className="border-surface-tertiary border-t-action mb-2 size-8 animate-spin rounded-full border-4" />
          <span className="text-sm">جاري تحميل المزيد من العقارات...</span>
        </>
      ) : (
        <Button
          variant="outline"
          onClick={onLoadMore}
          className="border-action text-action hover:bg-action hover:text-action-foreground rounded-full px-8 py-3 text-sm font-bold"
        >
          عرض المزيد
        </Button>
      )}
    </div>
  );
}
