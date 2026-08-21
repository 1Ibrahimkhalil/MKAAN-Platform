import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader2 className="text-action size-8 animate-spin" />
      <p className="text-muted-foreground text-sm">جاري التحميل...</p>
    </div>
  );
}
