import { Lock } from "lucide-react";

export function UnauthorizedState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Lock className="text-muted-foreground/50 size-12" />
      <p className="text-muted-foreground text-sm">
        ليس لديك صلاحية للوصول إلى هذا المحتوى
      </p>
    </div>
  );
}
