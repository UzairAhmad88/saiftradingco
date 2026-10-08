"use client";

import React, { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface GemstonesPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export function GemstonesPagination({
  page,
  pageSize,
  total,
  totalPages,
}: GemstonesPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1 && total <= pageSize) {
    return null;
  }

  const navigateToPage = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages || targetPage === page) return;

    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", targetPage.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const startIdx = Math.min((page - 1) * pageSize + 1, total);
  const endIdx = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-2 border-t border-[#262626]">
      <p className="text-xs text-[#9A9A94] font-mono">
        Showing <span className="text-[#F5F5F0]">{startIdx}</span> to{" "}
        <span className="text-[#F5F5F0]">{endIdx}</span> of{" "}
        <span className="text-[#F5F5F0]">{total}</span> specimens
      </p>

      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => navigateToPage(page - 1)}
          disabled={page <= 1 || isPending}
          className="p-1.5 text-xs text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/40 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page counter display */}
        <div className="px-3 py-1 bg-[#111111] border border-[#262626] rounded-[4px] text-xs font-mono text-[#F5F5F0]">
          Page {page} of {totalPages}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => navigateToPage(page + 1)}
          disabled={page >= totalPages || isPending}
          className="p-1.5 text-xs text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/40 disabled:opacity-30 disabled:pointer-events-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
