import { Inbox } from "lucide-react";

export function EmptyState({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Inbox className="text-muted-foreground/50 size-12" />
      <p className="text-muted-foreground text-sm">
        {message ?? "لا توجد نتائج"}
      </p>
    </div>
  );
}
