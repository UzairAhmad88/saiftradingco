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
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#262626] rounded-[4px] bg-[#0A0A0A] text-xs uppercase tracking-wider text-[#9A9A94] hover:text-[#9CCB63] hover:border-[#9CCB63]/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#1A1A1A] rounded-[4px] bg-[#070707] text-xs uppercase tracking-wider text-[#404040] cursor-not-allowed select-none"
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
                "min-w-[36px] h-9 px-3 flex items-center justify-center text-xs font-mono border rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]",
                isActive
                  ? "border-[#9CCB63] bg-[#111111] text-[#9CCB63] font-bold"
                  : "border-[#262626] bg-[#0A0A0A] text-[#9A9A94] hover:text-[#F5F5F0] hover:border-[#3A3A3A]"
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
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#262626] rounded-[4px] bg-[#0A0A0A] text-xs uppercase tracking-wider text-[#9A9A94] hover:text-[#9CCB63] hover:border-[#9CCB63]/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 border border-[#1A1A1A] rounded-[4px] bg-[#070707] text-xs uppercase tracking-wider text-[#404040] cursor-not-allowed select-none"
          aria-disabled="true"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
