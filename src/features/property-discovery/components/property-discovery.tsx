"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { PropertyGrid } from "./property-grid";
import { PropertyGridSkeleton } from "./property-skeleton";
import { FilterPanel } from "./filter-panel";
import { ActiveFilters } from "./active-filters";
import { SortControl } from "./sort-control";
import { LoadMore } from "./load-more";
import { usePropertySearch } from "../hooks/use-property-search";
import { useInfiniteScroll } from "../hooks/use-infinite-scroll";
import { buildActiveFilterChips } from "../lib/filter-config";
import { MOCK_PROPERTIES, MOCK_TOTAL_PROPERTIES } from "../lib/mock-data";

export function PropertyDiscovery() {
  const {
    filters,
    sort,
    updateFilter,
    updateDynamicFilter,
    removeFilter,
    resetFilters,
    setSort,
    loadMore,
  } = usePropertySearch();

  const isLoading = false;
  const hasError = false;
  const properties = MOCK_PROPERTIES;
  const totalCount = MOCK_TOTAL_PROPERTIES;
  const hasMore = properties.length < totalCount;

  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    loading: isLoading,
    onLoadMore: loadMore,
  });

  const activeChips = buildActiveFilterChips(filters);

  if (hasError) {
    return (
      <Container className="py-12">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">
            حدث خطأ أثناء تحميل العقارات. يرجى المحاولة مرة أخرى.
          </p>
          <Button
            variant="link"
            onClick={() => {}}
            className="text-action text-sm font-medium"
          >
            إعادة المحاولة
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Hero — full-bleed with background image */}
      <section
        className="fade-in-up relative mb-8 flex w-full flex-col items-center justify-center overflow-hidden pt-16 pb-6 text-center md:mb-12 md:pt-20 md:pb-8"
        style={{
          minHeight: "clamp(340px, 50vh, 480px)",
          backgroundImage:
            "linear-gradient(rgba(13, 28, 50, 0.7), rgba(13, 28, 50, 0.4)), url(/images/stitch/properties-hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 md:px-10">
          <h1 className="mb-4 text-[28px] font-bold text-white md:mb-6 md:text-[56px]">
            العقارات
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-[16px] leading-relaxed text-white/90 md:mb-10 md:text-[18px]">
            اختار العقار المناسب ليك من العقارات المتاحة للبيع والإيجار في
            المناطق اللي بنخدمها.
          </p>
          <div className="mx-auto max-w-2xl">
            <SearchBar
              defaultValue={filters.search}
              onSearch={(q) => updateFilter("search", q)}
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <Container className="py-8 md:py-12">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-80">
            <FilterPanel
              filters={filters}
              onUpdateFilter={updateFilter}
              onUpdateDynamicFilter={updateDynamicFilter}
              onReset={resetFilters}
            />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="bg-surface-secondary border-border mb-8 flex flex-col items-center justify-between gap-4 rounded-xl border p-6 md:flex-row">
              <div className="text-right">
                <h3 className="text-foreground mb-1 text-lg font-bold">
                  مش لاقي العقار اللي بتدور عليه؟
                </h3>
                <p className="text-muted-foreground text-base">
                  اطلب عقار وإحنا نساعدك تلاقيه.
                </p>
              </div>
              <Link
                href="/request-property"
                className="bg-action hover:bg-action-hover text-action-foreground flex cursor-pointer items-center justify-center rounded-full px-8 py-3 text-sm font-bold whitespace-nowrap shadow-sm transition-colors"
              >
                اطلب عقار
              </Link>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-foreground text-lg font-bold">
                  {totalCount} عقار متاح
                </h2>
                <ActiveFilters
                  chips={activeChips}
                  onRemove={removeFilter}
                  onClearAll={resetFilters}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="md:hidden">
                  <FilterPanel
                    filters={filters}
                    onUpdateFilter={updateFilter}
                    onUpdateDynamicFilter={updateDynamicFilter}
                    onReset={resetFilters}
                  />
                </div>
                <SortControl value={sort} onChange={setSort} />
              </div>
            </div>

            {isLoading && properties.length === 0 ? (
              <PropertyGridSkeleton count={9} />
            ) : properties.length === 0 ? (
              <div className="border-border bg-surface-secondary rounded-xl border py-20 text-center shadow-sm">
                <p className="text-muted-foreground/50 mb-2 text-4xl">?</p>
                <h3 className="text-foreground mb-2 text-lg font-bold">
                  ملقيناش عقارات مطابقة لبحثك
                </h3>
                <p className="text-muted-foreground mb-6 text-base">
                  جرب تغير الفلاتر أو تبحث في منطقة تانية.
                </p>
                <Button
                  variant="default"
                  onClick={resetFilters}
                  className="bg-action hover:bg-action-hover rounded-md px-6 py-2 text-sm font-medium text-white"
                >
                  مسح كل الفلاتر
                </Button>
              </div>
            ) : (
              <>
                <PropertyGrid properties={properties} />
                <LoadMore
                  loading={isLoading}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                  sentinelRef={sentinelRef}
                />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
