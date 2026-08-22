import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export function FormField({
  label,
  htmlFor,
  error,
  helperText,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;
  const helperId = htmlFor ? `${htmlFor}-helper` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} className="gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {helperText && !error && (
        <p id={helperId} className="text-muted-foreground text-xs">
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-destructive text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
