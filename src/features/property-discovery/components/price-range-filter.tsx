"use client";

import { cn } from "@/lib/utils";

export function PriceRangeFilter({
  min,
  max,
  onChange,
  className,
}: {
  min: string;
  max: string;
  onChange: (min: string, max: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      <label className="text-foreground mb-2 flex items-center gap-2 text-sm font-medium">
        السعر (جنيه)
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="من"
          value={min}
          onChange={(e) => onChange(e.target.value, max)}
          className="bg-surface-secondary border-border focus:border-action focus:ring-action text-foreground w-1/2 rounded-md p-3 text-base outline-none focus:ring-1"
        />
        <input
          type="number"
          placeholder="إلى"
          value={max}
          onChange={(e) => onChange(min, e.target.value)}
          className="bg-surface-secondary border-border focus:border-action focus:ring-action text-foreground w-1/2 rounded-md p-3 text-base outline-none focus:ring-1"
        />
      </div>
    </div>
  );
}
