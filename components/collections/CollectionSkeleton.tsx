import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export function CollectionSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Search & Controls Skeleton */}
      <div className="h-16 w-full bg-[#0C0C0C] border border-[#242424] rounded-[4px]" />

      {/* Gemstone Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-[#0C0C0C] border border-[#242424] rounded-[4px] overflow-hidden"
          >
            <div className="aspect-[4/3] w-full bg-[#141414]" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-3 w-1/3 bg-[#1A1A1A]" />
              <Skeleton className="h-6 w-3/4 bg-[#1A1A1A]" />
              <Skeleton className="h-3 w-full bg-[#1A1A1A]" />
              <div className="pt-4 border-t border-[#242424] flex justify-between">
                <Skeleton className="h-4 w-1/4 bg-[#1A1A1A]" />
                <Skeleton className="h-4 w-1/4 bg-[#1A1A1A]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
