"use client";

import { cn } from "@/lib/utils";

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  children,
  className,
}: {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "border-input bg-surface-secondary hover:border-action/40 flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all",
        checked && "border-action bg-action/5 ring-action/20 ring-2",
        className,
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="sr-only"
      />
      <span
        className={cn(
          "border-input flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
          checked && "border-action",
        )}
      >
        {checked && <span className="bg-action size-2 rounded-full" />}
      </span>
      <span className="text-sm">{children}</span>
    </label>
  );
}
