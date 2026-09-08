"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { VALIDATION_MESSAGES } from "@/lib/validation";

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
  const invalidRange =
    min !== "" &&
    max !== "" &&
    !Number.isNaN(Number(min)) &&
    !Number.isNaN(Number(max)) &&
    Number(min) > Number(max);

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
          aria-invalid={invalidRange}
          className="w-1/2"
        />
        <Input
          type="number"
          placeholder="إلى"
          value={max}
          onChange={(e) => onChange(min, e.target.value)}
          aria-invalid={invalidRange}
          className="w-1/2"
        />
      </div>
      {invalidRange && (
        <p className="text-destructive mt-1 text-xs" role="alert">
          {VALIDATION_MESSAGES.priceMinMax}
        </p>
      )}
    </div>
  );
}
