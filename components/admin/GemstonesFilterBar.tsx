"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, RotateCcw } from "lucide-react";

export interface GemstonesFilterBarProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  currentSearch?: string;
  currentStatus?: string;
  currentCategory?: string;
  currentFeatured?: string;
  currentSort?: string;
}

export function GemstonesFilterBar({
  categories,
  currentSearch = "",
  currentStatus = "all",
  currentCategory = "all",
  currentFeatured = "all",
  currentSort = "newest",
}: GemstonesFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = React.useState(currentSearch);

  // Sync internal search input if external query changes
  React.useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 on filter/search change
    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", searchValue.trim());
  };

  const handleClearSearch = () => {
    setSearchValue("");
    updateParam("search", "");
  };

  const handleResetFilters = () => {
    setSearchValue("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters =
    Boolean(currentSearch) ||
    currentStatus !== "all" ||
    currentCategory !== "all" ||
    currentFeatured !== "all" ||
    currentSort !== "newest";

  return (
    <div className="bg-[#101010] border border-[#2A2A2A] p-4 space-y-4">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Input Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1 max-w-lg"
          role="search"
        >
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by specimen name, SKU, or slug..."
              className="w-full bg-[#050505] border border-[#2A2A2A] pl-10 pr-9 py-2 text-xs text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#B69B5E] transition-colors"
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#737373] hover:text-[#F5F5F5]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-status" className="text-[10px] uppercase tracking-wider text-[#737373] font-mono">
              Status:
            </label>
            <select
              id="filter-status"
              value={currentStatus}
              onChange={(e) => updateParam("status", e.target.value)}
              className="bg-[#050505] border border-[#2A2A2A] text-xs text-[#F5F5F5] py-1.5 px-2.5 focus:outline-none focus:border-[#B69B5E]"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available (Public)</option>
              <option value="draft">Draft (Private)</option>
              <option value="sold">Sold</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-category" className="text-[10px] uppercase tracking-wider text-[#737373] font-mono">
              Category:
            </label>
            <select
              id="filter-category"
              value={currentCategory}
              onChange={(e) => updateParam("category", e.target.value)}
              className="bg-[#050505] border border-[#2A2A2A] text-xs text-[#F5F5F5] py-1.5 px-2.5 focus:outline-none focus:border-[#B69B5E]"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-featured" className="text-[10px] uppercase tracking-wider text-[#737373] font-mono">
              Featured:
            </label>
            <select
              id="filter-featured"
              value={currentFeatured}
              onChange={(e) => updateParam("featured", e.target.value)}
              className="bg-[#050505] border border-[#2A2A2A] text-xs text-[#F5F5F5] py-1.5 px-2.5 focus:outline-none focus:border-[#B69B5E]"
            >
              <option value="all">All</option>
              <option value="featured">Featured Only</option>
              <option value="not_featured">Standard Only</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-sort" className="text-[10px] uppercase tracking-wider text-[#737373] font-mono">
              Sort:
            </label>
            <select
              id="filter-sort"
              value={currentSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="bg-[#050505] border border-[#2A2A2A] text-xs text-[#F5F5F5] py-1.5 px-2.5 focus:outline-none focus:border-[#B69B5E]"
            >
              <option value="newest">Newest Added</option>
              <option value="updated">Recently Updated</option>
              <option value="oldest">Oldest Added</option>
              <option value="name_asc">Name A → Z</option>
              <option value="name_desc">Name Z → A</option>
              <option value="price_asc">Price Low → High</option>
              <option value="price_desc">Price High → Low</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              disabled={isPending}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#B69B5E] hover:text-[#F5F5F5] border border-[#2A2A2A] hover:border-[#B69B5E] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {isPending && (
        <div className="text-[10px] text-[#B69B5E] font-mono animate-pulse">
          Applying catalogue filters...
        </div>
      )}
    </div>
  );
}
