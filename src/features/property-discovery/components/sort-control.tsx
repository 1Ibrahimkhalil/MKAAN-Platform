"use client";

import { cn } from "@/lib/utils";

export function SortControl({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const options = [
    { value: "newest", label: "الأحدث" },
    { value: "price_asc", label: "السعر (أقل لأعلى)" },
    { value: "price_desc", label: "السعر (أعلى لأقل)" },
    { value: "area", label: "المساحة" },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label className="text-muted-foreground text-sm whitespace-nowrap">
        ترتيب حسب:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-secondary border-border focus:border-action text-foreground rounded-md border p-2 text-sm font-medium outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
