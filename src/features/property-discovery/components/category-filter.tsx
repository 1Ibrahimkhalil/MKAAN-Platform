"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_OPTIONS } from "../lib/filter-config";

export function CategoryFilter({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      <label className="text-foreground mb-2 flex items-center gap-2 text-sm font-medium">
        التصنيف
      </label>
      <div className="flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(value === opt.value ? "" : opt.value)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              value === opt.value
                ? "border-action bg-action-container text-white"
                : "border-border text-muted-foreground hover:bg-surface-tertiary",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
