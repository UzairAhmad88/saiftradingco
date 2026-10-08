import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export function CollectionSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Search & Controls Skeleton */}
      <div className="h-16 w-full bg-[#0A0A0A] border border-[#222]" />

      {/* Gemstone Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-[#101010] border border-[#2A2A2A] overflow-hidden"
          >
            <div className="aspect-[4/3] w-full bg-[#181818]" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-3 w-1/3 bg-[#202020]" />
              <Skeleton className="h-6 w-3/4 bg-[#252525]" />
              <Skeleton className="h-3 w-full bg-[#1c1c1c]" />
              <div className="pt-4 border-t border-[#1D1D1D] flex justify-between">
                <Skeleton className="h-4 w-1/4 bg-[#202020]" />
                <Skeleton className="h-4 w-1/4 bg-[#202020]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
