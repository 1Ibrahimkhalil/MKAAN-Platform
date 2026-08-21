import { CheckCircle } from "lucide-react";

export function SuccessState({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <CheckCircle className="text-success size-12" />
      <p className="text-muted-foreground text-sm">
        {message ?? "تمت العملية بنجاح"}
      </p>
    </div>
  );
}
