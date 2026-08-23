"use client";

import { cn } from "@/lib/utils";
import { LOCATION_OPTIONS } from "../lib/filter-config";

export function LocationFilter({
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
        المكان
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-secondary border-border focus:border-action focus:ring-action text-foreground w-full rounded-md p-3 text-base outline-none focus:ring-1"
      >
        <option value="">الكل</option>
        {LOCATION_OPTIONS.filter((l) => l.value !== "الكل").map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>
    </div>
  );
}
