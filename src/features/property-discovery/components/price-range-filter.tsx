"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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
        <Input
          type="number"
          placeholder="من"
          value={min}
          onChange={(e) => onChange(e.target.value, max)}
          className="w-1/2"
        />
        <Input
          type="number"
          placeholder="إلى"
          value={max}
          onChange={(e) => onChange(min, e.target.value)}
          className="w-1/2"
        />
      </div>
    </div>
  );
}
