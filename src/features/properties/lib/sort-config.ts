import type { SortOption } from "../types/property";

export const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "الأحدث" },
  { value: "price_asc", label: "السعر (أقل لأعلى)" },
  { value: "price_desc", label: "السعر (أعلى لأقل)" },
  { value: "area", label: "المساحة" },
];

export const DEFAULT_SORT = "newest";
