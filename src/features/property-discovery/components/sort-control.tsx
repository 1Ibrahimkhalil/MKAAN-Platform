"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Select value={value} onValueChange={(v) => onChange(v ?? "newest")}>
        <SelectTrigger className="w-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
