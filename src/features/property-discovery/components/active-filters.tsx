"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ActiveFilterChip {
  key: string;
  label: string;
  value: string;
}

export function ActiveFilters({
  chips,
  onRemove,
  onClearAll,
  className,
}: {
  chips: ActiveFilterChip[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
  className?: string;
}) {
  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="bg-surface-tertiary text-muted-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
        >
          {chip.value}
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRemove(chip.key)}
            className="hover:text-destructive ms-1"
            aria-label={`إزالة ${chip.label}`}
          >
            <X className="size-3.5" />
          </Button>
        </span>
      ))}
      {chips.length > 1 && (
        <Button
          variant="link"
          size="xs"
          onClick={onClearAll}
          className="text-action ms-2"
        >
          مسح الكل
        </Button>
      )}
    </div>
  );
}
