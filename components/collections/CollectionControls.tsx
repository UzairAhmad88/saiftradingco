"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CollectionControlsProps {
  totalCount: number;
  availableColors?: string[];
  initialSearch?: string;
  initialStatus?: string;
  initialColor?: string;
  initialCarat?: string;
  initialSort?: string;
}

export function CollectionControls({
  totalCount,
  availableColors = [],
  initialSearch = "",
  initialStatus = "all",
  initialColor = "all",
  initialCarat = "all",
  initialSort = "featured",
}: CollectionControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileFilterPanelRef = useRef<HTMLDivElement>(null);

  const handleCloseMobileFilter = () => {
    setIsMobileFilterOpen(false);
    filterTriggerRef.current?.focus();
  };

  // Sync internal state with URL params
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  // Mobile drawer focus trap, scroll lock, and ESC key listener
  useEffect(() => {
    if (!isMobileFilterOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button inside panel
    const closeBtn = mobileFilterPanelRef.current?.querySelector<HTMLButtonElement>(
      'button[aria-label="Close filter drawer"]'
    );
    closeBtn?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseMobileFilter();
        return;
      }

      if (e.key === "Tab" && mobileFilterPanelRef.current) {
        const focusable = mobileFilterPanelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileFilterOpen]);

  const activeStatus = searchParams.get("status") || initialStatus;
  const activeColor = searchParams.get("color") || initialColor;
  const activeCarat = searchParams.get("carat") || initialCarat;
  const activeSort = searchParams.get("sort") || initialSort;

  // Count active non-default filters
  const activeFilterCount =
    (activeStatus !== "all" ? 1 : 0) +
    (activeColor !== "all" ? 1 : 0) +
    (activeCarat !== "all" ? 1 : 0) +
    (searchValue.trim() ? 1 : 0);

  // Helper to update query parameters cleanly
  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset pagination to page 1 when changing filters
    params.delete("page");

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(targetUrl, { scroll: false });
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuery({ search: searchValue.trim() });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    updateQuery({ search: null });
  };

  const handleClearAllFilters = () => {
    setSearchValue("");
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Primary Toolbar: Search + Quick Selects + Filter Trigger */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[#0A0A0A] border border-[#222]">
        {/* Search Input Field */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1 max-w-md"
          role="search"
        >
          <label htmlFor="gemstone-search" className="sr-only">
            Search specimens by name, SKU, or color
          </label>
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="gemstone-search"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search specimens by name or SKU..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#050505] border border-[#2A2A2A] text-xs text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#B69B5E] focus:ring-1 focus:ring-[#B69B5E] transition-colors"
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#F5F5F5] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Desktop Quick Filters */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Availability Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
            <label htmlFor="filter-status" className="text-[11px] uppercase tracking-wider text-[#737373]">
              Status:
            </label>
            <select
              id="filter-status"
              value={activeStatus}
              onChange={(e) => updateQuery({ status: e.target.value })}
              className="bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
            >
              <option value="all">All Specimens</option>
              <option value="available">Available Only</option>
              <option value="sold">Sold / Archive</option>
            </select>
          </div>

          {/* Carat Weight Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
            <label htmlFor="filter-carat" className="text-[11px] uppercase tracking-wider text-[#737373]">
              Carat:
            </label>
            <select
              id="filter-carat"
              value={activeCarat}
              onChange={(e) => updateQuery({ carat: e.target.value })}
              className="bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
            >
              <option value="all">All Weights</option>
              <option value="under-50">&lt; 50 ct</option>
              <option value="50-100">50 – 100 ct</option>
              <option value="over-100">&gt; 100 ct</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
            <label htmlFor="sort-select" className="text-[11px] uppercase tracking-wider text-[#737373]">
              Sort:
            </label>
            <select
              id="sort-select"
              value={activeSort}
              onChange={(e) => updateQuery({ sort: e.target.value })}
              className="bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="carat-desc">Carat: High to Low</option>
              <option value="carat-asc">Carat: Low to High</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Mobile / Tablet Filter Button */}
        <div className="flex lg:hidden items-center justify-between gap-3">
          <Button
            ref={filterTriggerRef}
            variant="secondary"
            size="sm"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 min-h-[44px]"
            aria-expanded={isMobileFilterOpen}
            aria-controls="mobile-filter-panel"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B69B5E]" />
            <span>Filters & Sort</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#B69B5E] text-[#050505] text-[10px] font-mono font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Compact Sort on Mobile */}
          <select
            value={activeSort}
            onChange={(e) => updateQuery({ sort: e.target.value })}
            aria-label="Sort specimens"
            className="bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="carat-desc">Weight ↓</option>
            <option value="carat-asc">Weight ↑</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips & Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs">
        <div className="flex items-center gap-2 text-[#A3A3A3]">
          <span className="font-mono text-xs text-[#F5F5F5] font-medium" aria-live="polite">
            {totalCount}
          </span>
          <span>{totalCount === 1 ? "specimen catalogued" : "specimens catalogued"}</span>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeStatus !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#141414] border border-[#2A2A2A] text-[11px] text-[#E5E5E5]">
                <span>Status: {activeStatus}</span>
                <button
                  type="button"
                  onClick={() => updateQuery({ status: null })}
                  className="hover:text-[#B69B5E]"
                  aria-label="Remove status filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeCarat !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#141414] border border-[#2A2A2A] text-[11px] text-[#E5E5E5]">
                <span>Carat: {activeCarat}</span>
                <button
                  type="button"
                  onClick={() => updateQuery({ carat: null })}
                  className="hover:text-[#B69B5E]"
                  aria-label="Remove carat filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchValue && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#141414] border border-[#2A2A2A] text-[11px] text-[#E5E5E5]">
                <span>Keyword: &ldquo;{searchValue}&rdquo;</span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="hover:text-[#B69B5E]"
                  aria-label="Remove keyword search"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleClearAllFilters}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#B69B5E] hover:underline ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controlled Filter Drawer / Sheet */}
      {isMobileFilterOpen && (
        <div
          ref={mobileFilterPanelRef}
          id="mobile-filter-panel"
          className="fixed inset-0 z-50 flex justify-end bg-[#050505]/80 backdrop-blur-sm lg:hidden animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Filter specimens"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseMobileFilter();
          }}
        >
          <div className="w-full max-w-sm h-full bg-[#0D0D0D] border-l border-[#2A2A2A] p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                <h3 className="font-serif text-xl text-[#F5F5F5]">Filter & Refine</h3>
                <button
                  type="button"
                  onClick={handleCloseMobileFilter}
                  className="text-[#A3A3A3] hover:text-[#F5F5F5] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
                  aria-label="Close filter drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Section */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#B69B5E] block">
                  Availability
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "All", value: "all" },
                    { label: "Available", value: "available" },
                    { label: "Sold", value: "sold" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateQuery({ status: opt.value })}
                      className={`min-h-[44px] px-3 py-2 text-xs border transition-colors ${
                        activeStatus === opt.value
                          ? "border-[#B69B5E] bg-[#171717] text-[#B69B5E] font-medium"
                          : "border-[#2A2A2A] bg-[#050505] text-[#A3A3A3]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carat Weight Section */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#B69B5E] block">
                  Carat Weight Range
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "All Weights", value: "all" },
                    { label: "< 50 ct", value: "under-50" },
                    { label: "50 – 100 ct", value: "50-100" },
                    { label: "> 100 ct", value: "over-100" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateQuery({ carat: opt.value })}
                      className={`min-h-[44px] px-3 py-2 text-xs border transition-colors ${
                        activeCarat === opt.value
                          ? "border-[#B69B5E] bg-[#171717] text-[#B69B5E] font-medium"
                          : "border-[#2A2A2A] bg-[#050505] text-[#A3A3A3]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Order Section */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#B69B5E] block">
                  Sort Order
                </span>
                <select
                  value={activeSort}
                  onChange={(e) => updateQuery({ sort: e.target.value })}
                  className="w-full bg-[#050505] border border-[#2A2A2A] p-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E] min-h-[44px]"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="carat-desc">Carat: High to Low</option>
                  <option value="carat-asc">Carat: Low to High</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>

              {/* Color Filter (if available) */}
              {availableColors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-[#B69B5E] block">
                    Observed Color Tone
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuery({ color: "all" })}
                      className={`min-h-[44px] px-3 py-2 text-xs border transition-colors ${
                        activeColor === "all"
                          ? "border-[#B69B5E] bg-[#171717] text-[#B69B5E]"
                          : "border-[#2A2A2A] bg-[#050505] text-[#A3A3A3]"
                      }`}
                    >
                      All Colors
                    </button>
                    {availableColors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => updateQuery({ color: c })}
                        className={`min-h-[44px] px-3 py-2 text-xs border transition-colors ${
                          activeColor === c
                            ? "border-[#B69B5E] bg-[#171717] text-[#B69B5E]"
                            : "border-[#2A2A2A] bg-[#050505] text-[#A3A3A3]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#222] flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={handleClearAllFilters}
                className="flex-1 min-h-[44px]"
              >
                Reset All
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleCloseMobileFilter}
                className="flex-1 min-h-[44px]"
              >
                View Results ({totalCount})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
