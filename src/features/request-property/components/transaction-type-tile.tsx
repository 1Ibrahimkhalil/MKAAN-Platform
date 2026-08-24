"use client";

import { cn } from "@/lib/utils";

interface TransactionTypeTileProps {
  name: string;
  value: string;
  label: string;
  icon: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export function TransactionTypeTile({
  name,
  value,
  label,
  icon,
  checked,
  onChange,
}: TransactionTypeTileProps) {
  return (
    <label className="group cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="sr-only"
      />
      <div
        className={cn(
          "flex h-28 flex-col items-center justify-center gap-1 rounded-xl border-2 p-4 transition-all duration-200",
          checked
            ? "border-action bg-action/5 shadow-sm"
            : "border-border bg-surface-secondary hover:border-border/80",
        )}
      >
        <span
          className={cn(
            "material-symbols-outlined text-3xl transition-colors",
            checked ? "text-action" : "text-muted-foreground",
          )}
          style={checked ? { fontVariationSettings: '"FILL" 1' } : undefined}
        >
          {icon}
        </span>
        <span
          className={cn(
            "text-sm font-bold transition-colors",
            checked ? "text-action" : "text-foreground",
          )}
        >
          {label}
        </span>
      </div>
    </label>
  );
}
