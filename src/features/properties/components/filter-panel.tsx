"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getFilterableFields } from "@/config/dynamic-fields";
import { CategoryFilter } from "./category-filter";
import { TransactionFilter } from "./transaction-filter";
import { LocationFilter } from "./location-filter";
import { PriceRangeFilter } from "./price-range-filter";
import { DynamicFilter } from "./dynamic-filter";
import type { FilterState } from "../types/property";

function FilterContent({
  filters,
  onUpdateFilter,
  onUpdateDynamicFilter,
  onReset,
  onApply,
}: {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  onUpdateDynamicFilter: (fieldId: string, value: string) => void;
  onReset: () => void;
  onApply?: () => void;
}) {
  const dynamicFields = getFilterableFields(filters.category);

  return (
    <div className="bg-surface-secondary border-border custom-scrollbar rounded-lg border p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold">التصفية</h2>
          <p className="text-muted-foreground mt-1 text-sm">توضيع البحث</p>
        </div>
        <Button
          variant="link"
          size="xs"
          onClick={onReset}
          className="text-action"
        >
          مسح الفلاتر
        </Button>
      </div>

      <CategoryFilter
        value={filters.category}
        onChange={(val) => onUpdateFilter("category", val)}
      />

      <TransactionFilter
        value={filters.transactionType}
        onChange={(val) => onUpdateFilter("transactionType", val)}
      />

      <LocationFilter
        value={filters.location}
        onChange={(val) => onUpdateFilter("location", val)}
      />

      <PriceRangeFilter
        min={filters.priceMin}
        max={filters.priceMax}
        onChange={(min, max) => {
          onUpdateFilter("priceMin", min);
          onUpdateFilter("priceMax", max);
        }}
      />

      {dynamicFields.map((field) => {
        const fieldId = field.fieldId;
        const isBedrooms = fieldId === "bedrooms";
        const value = isBedrooms
          ? filters.bedrooms
          : String(filters.dynamicFilters[fieldId] ?? "");

        return (
          <DynamicFilter
            key={fieldId}
            field={field}
            value={value}
            onChange={(val) => {
              if (isBedrooms) {
                onUpdateFilter("bedrooms", val);
              } else {
                onUpdateDynamicFilter(fieldId, val);
              }
            }}
          />
        );
      })}

      {onApply && (
        <Button
          variant="default"
          onClick={onApply}
          className="bg-action hover:bg-action-hover mt-4 w-full rounded-md py-3 text-sm font-medium text-white"
        >
          تطبيق الفلاتر
        </Button>
      )}
    </div>
  );
}

export function FilterPanel({
  filters,
  onUpdateFilter,
  onUpdateDynamicFilter,
  onReset,
  className,
}: {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  onUpdateDynamicFilter: (fieldId: string, value: string) => void;
  onReset: () => void;
  className?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleApply = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setMobileOpen(true)}
        className="bg-surface-secondary border-border hover:bg-surface-tertiary text-foreground flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium md:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="size-4" />
          التصفية
        </span>
      </Button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-80 overflow-y-auto bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-foreground text-lg font-bold">التصفية</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground"
              >
                إغلاق
              </Button>
            </div>
            <FilterContent
              filters={filters}
              onUpdateFilter={onUpdateFilter}
              onUpdateDynamicFilter={onUpdateDynamicFilter}
              onReset={() => {
                onReset();
                setMobileOpen(false);
              }}
              onApply={handleApply}
            />
          </div>
        </div>
      )}

      <div className={cn("hidden md:block", className)}>
        <FilterContent
          filters={filters}
          onUpdateFilter={onUpdateFilter}
          onUpdateDynamicFilter={onUpdateDynamicFilter}
          onReset={onReset}
        />
      </div>
    </>
  );
}
