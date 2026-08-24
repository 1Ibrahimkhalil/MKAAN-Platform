import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      new: "bg-action text-action-foreground",
      contacted: "bg-info text-info-foreground",
      "in-progress": "bg-warning text-warning-foreground",
      completed: "bg-success text-success-foreground",
      cancelled: "bg-muted text-muted-foreground",
      published: "bg-success text-success-foreground",
      unpublished: "bg-muted text-muted-foreground",
      "under-review": "bg-warning text-warning-foreground",
    },
  },
  defaultVariants: {
    status: "new",
  },
});

const statusLabels: Record<string, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  "in-progress": "قيد التنفيذ",
  completed: "مكتمل",
  cancelled: "ملغي",
  published: "منشور",
  unpublished: "غير منشور",
  "under-review": "قيد المراجعة",
};

export function StatusBadge({
  status,
  label,
  className,
}: VariantProps<typeof statusBadgeVariants> & {
  label?: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(statusBadgeVariants({ status }), className)}
    >
      {label ?? statusLabels[status ?? "new"]}
    </Badge>
  );
}
