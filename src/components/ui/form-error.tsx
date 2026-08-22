import { cn } from "@/lib/utils";

export function FormError({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <p className={cn("text-destructive text-xs", className)} role="alert">
      {message}
    </p>
  );
}
