import { GOVERNORATES } from "@/config";
import { TRANSACTION_OPTIONS } from "@/config/options";
import { getCategoryFieldIds } from "@/config/dynamic-fields";
import type { FilterState } from "../types/property";

export const CATEGORY_OPTIONS = [
  { value: "سكني", label: "سكني" },
  { value: "تجاري", label: "تجاري" },
  { value: "إداري", label: "إداري" },
  { value: "أرض", label: "أرض" },
] as const;

export { TRANSACTION_OPTIONS };

export const LOCATION_OPTIONS = GOVERNORATES.map((g) => ({
  value: g.value,
  label: g.label,
}));

export const BEDROOMS_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4+" },
] as const;

export function getDynamicFieldLabel(fieldId: string): string {
  const LABELS: Record<string, string> = {
    area: "المساحة",
    floor: "الدور",
    bathrooms: "دورات المياه",
    furnished: "مفروشة",
    commercialType: "نوع النشاط",
    landType: "نوع الأرض",
    bedrooms: "غرف النوم",
  };
  return LABELS[fieldId] ?? fieldId;
}

export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.search !== "" ||
    filters.category !== "" ||
    filters.transactionType !== "" ||
    filters.location !== "" ||
    filters.priceMin !== "" ||
    filters.priceMax !== "" ||
    filters.bedrooms !== "" ||
    Object.keys(filters.dynamicFilters).length > 0
  );
}

export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  if (filters.category) count++;
  if (filters.transactionType) count++;
  if (filters.location) count++;
  if (filters.priceMin || filters.priceMax) count++;
  if (filters.bedrooms) count++;
  count += Object.keys(filters.dynamicFilters).length;
  return count;
}

export function buildActiveFilterChips(
  filters: FilterState,
): { key: string; label: string; value: string }[] {
  const chips: { key: string; label: string; value: string }[] = [];

  if (filters.category) {
    chips.push({ key: "category", label: "التصنيف", value: filters.category });
  }
  if (filters.transactionType) {
    const label = filters.transactionType === "sale" ? "للبيع" : "للإيجار";
    chips.push({
      key: "transactionType",
      label: "نوع المعاملة",
      value: label,
    });
  }
  if (filters.location) {
    const loc = LOCATION_OPTIONS.find((l) => l.value === filters.location);
    chips.push({
      key: "location",
      label: "المكان",
      value: loc?.label ?? filters.location,
    });
  }
  if (filters.priceMin || filters.priceMax) {
    const min = filters.priceMin ? Number(filters.priceMin) : 0;
    const max = filters.priceMax ? Number(filters.priceMax) : "∞";
    chips.push({
      key: "price",
      label: "السعر",
      value: `${min.toLocaleString("ar-EG")} - ${max.toLocaleString("ar-EG")}`,
    });
  }
  if (filters.bedrooms) {
    chips.push({
      key: "bedrooms",
      label: "غرف النوم",
      value: filters.bedrooms,
    });
  }

  const fieldIds = getCategoryFieldIds(filters.category);
  for (const fieldId of fieldIds) {
    if (fieldId === "bedrooms") continue;
    const val = filters.dynamicFilters[fieldId];
    if (val !== undefined && val !== "" && val !== false) {
      const label = getDynamicFieldLabel(fieldId);
      chips.push({
        key: `dynamic:${fieldId}`,
        label,
        value: String(val),
      });
    }
  }

  return chips;
}
