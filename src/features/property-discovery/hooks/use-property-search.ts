"use client";

import { useState, useCallback, useMemo } from "react";
import { DEFAULT_FILTERS, PAGE_SIZE } from "../types/property";
import type { FilterState } from "../types/property";
import { DEFAULT_SORT } from "../lib/sort-config";
import { getCategoryFieldIds } from "@/config/dynamic-fields";

export function usePropertySearch() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [page, setPage] = useState(1);

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => {
        const next = { ...prev, [key]: value };

        if (key === "category") {
          const allowedFields = getCategoryFieldIds(value as string);
          const cleanedDynamic: Record<string, string | number | boolean> = {};
          for (const [k, v] of Object.entries(next.dynamicFilters)) {
            if (allowedFields.includes(k)) {
              cleanedDynamic[k] = v;
            }
          }
          next.dynamicFilters = cleanedDynamic;

          if (!allowedFields.includes("bedrooms")) {
            next.bedrooms = "";
          }
        }

        return next;
      });
      setPage(1);
    },
    [],
  );

  const updateDynamicFilter = useCallback(
    (fieldId: string, value: string | number | boolean) => {
      setFilters((prev) => ({
        ...prev,
        dynamicFilters: { ...prev.dynamicFilters, [fieldId]: value },
      }));
      setPage(1);
    },
    [],
  );

  const removeDynamicFilter = useCallback((fieldId: string) => {
    setFilters((prev) => {
      const next = { ...prev.dynamicFilters };
      delete next[fieldId];
      return { ...prev, dynamicFilters: next };
    });
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const removeFilter = useCallback((key: string) => {
    if (key === "price") {
      setFilters((prev) => ({
        ...prev,
        priceMin: "",
        priceMax: "",
      }));
    } else if (key === "bedrooms") {
      setFilters((prev) => ({ ...prev, bedrooms: "" }));
    } else if (key === "category") {
      setFilters((prev) => ({ ...prev, category: "" }));
    } else if (key === "transactionType") {
      setFilters((prev) => ({ ...prev, transactionType: "" }));
    } else if (key === "location") {
      setFilters((prev) => ({ ...prev, location: "" }));
    } else if (key.startsWith("dynamic:")) {
      const fieldId = key.slice("dynamic:".length);
      setFilters((prev) => {
        const next = { ...prev.dynamicFilters };
        delete next[fieldId];
        return { ...prev, dynamicFilters: next };
      });
    }
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const searchParams = useMemo(
    () => ({
      filters,
      sort,
      page,
      pageSize: PAGE_SIZE,
    }),
    [filters, sort, page],
  );

  return {
    filters,
    sort,
    page,
    searchParams,
    updateFilter,
    updateDynamicFilter,
    removeDynamicFilter,
    removeFilter,
    resetFilters,
    setSort,
    loadMore,
  };
}
