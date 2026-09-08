"use client";

import { cn } from "@/lib/utils";

export function BedroomsFilter({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const options = ["1", "2", "3", "4+"];

  return (
    <div className={cn("mb-6", className)}>
      <label className="text-foreground mb-2 flex items-center gap-2 text-sm font-medium">
        غرف النوم
      </label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(value === opt ? "" : opt)}
            className={cn(
              "flex-1 rounded-md border py-2 text-xs font-semibold transition-colors",
              value === opt
                ? "border-action bg-action-container text-white"
                : "border-border text-muted-foreground hover:bg-surface-tertiary",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
