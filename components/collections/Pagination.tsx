import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryParams = {},
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build URL with preserved search and filter parameters
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    if (pageNumber > 1) {
      params.set("page", String(pageNumber));
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Catalogue pagination"
      className={cn("flex items-center justify-center gap-2 pt-12 sm:pt-16", className)}
    >
      {/* Previous Page Link */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#242424] rounded-[4px] bg-[#0C0C0C] text-xs uppercase tracking-wider text-[#F5F3EE] hover:border-[#B6D94C]/60 hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#242424]/40 rounded-[4px] bg-[#080808] text-xs uppercase tracking-wider text-[#777772]/40 cursor-not-allowed select-none"
          aria-disabled="true"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </span>
      )}

      {/* Numbered Page Links */}
      <div className="flex items-center gap-1.5">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <Link
              key={p}
              href={createPageUrl(p)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "min-w-[36px] h-9 px-3 flex items-center justify-center text-xs font-mono border rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]",
                isActive
                  ? "border-[#B6D94C] bg-[#B6D94C] text-[#050505] font-bold"
                  : "border-[#242424] bg-[#0C0C0C] text-[#F5F3EE] hover:border-[#B6D94C]/60 hover:text-[#B6D94C]"
              )}
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next Page Link */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#242424] rounded-[4px] bg-[#0C0C0C] text-xs uppercase tracking-wider text-[#F5F3EE] hover:border-[#B6D94C]/60 hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#242424]/40 rounded-[4px] bg-[#080808] text-xs uppercase tracking-wider text-[#777772]/40 cursor-not-allowed select-none"
          aria-disabled="true"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
