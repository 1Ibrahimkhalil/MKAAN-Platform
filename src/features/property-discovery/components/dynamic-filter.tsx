"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { FieldDefinition } from "@/config/dynamic-fields";

export function DynamicFilter({
  field,
  value,
  onChange,
  className,
}: {
  field: FieldDefinition;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  if (field.type === "select" && field.options) {
    return (
      <div className={cn("mb-6", className)}>
        <label className="text-foreground mb-2 flex items-center gap-2 text-sm font-medium">
          {field.label}
        </label>
        <div className="flex flex-wrap gap-2">
          {field.options.map((opt) => (
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

  if (field.type === "number") {
    return (
      <div className={cn("mb-6", className)}>
        <label className="text-foreground mb-2 flex items-center gap-2 text-sm font-medium">
          {field.label}
        </label>
        <Input
          type="number"
          placeholder={field.label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === "boolean" && field.options) {
    return (
      <div className={cn("mb-6", className)}>
        <label className="text-foreground mb-2 flex items-center gap-2 text-sm font-medium">
          {field.label}
        </label>
        <div className="flex gap-2">
          {field.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(value === opt.value ? "" : opt.value)}
              className={cn(
                "flex-1 cursor-pointer rounded-md border px-4 py-2 text-xs font-semibold transition-colors",
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

  return null;
}
