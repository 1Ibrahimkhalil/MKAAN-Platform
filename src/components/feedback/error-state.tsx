import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <AlertTriangle className="text-destructive size-12" />
      <p className="text-muted-foreground text-sm">{message ?? "حدث خطأ ما"}</p>
      {onRetry && (
        <Button
          type="button"
          variant="link"
          className="text-action text-sm font-medium underline-offset-4 hover:underline"
          onClick={onRetry}
        >
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}
