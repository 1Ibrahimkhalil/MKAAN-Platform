import { SearchX } from "lucide-react";

export function NotFoundState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <SearchX className="text-muted-foreground/50 size-12" />
      <p className="text-muted-foreground text-sm">الصفحة غير موجودة</p>
    </div>
  );
}
