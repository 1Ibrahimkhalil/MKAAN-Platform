import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  loading,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { loading?: boolean }) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className={cn("min-w-[120px]", className)}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </Button>
  );
}
