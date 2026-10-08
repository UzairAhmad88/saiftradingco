import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function GemstoneDetailLoading() {
  return (
    <div className="w-full bg-[#050505] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="h-4 w-48 bg-[#181818]" />

        {/* Hero Two-Column Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 aspect-[4/3] bg-[#0A0A0A] border border-[#222]" />
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="h-4 w-28 bg-[#181818]" />
            <Skeleton className="h-10 w-3/4 bg-[#202020]" />
            <Skeleton className="h-4 w-32 bg-[#181818]" />
            <Skeleton className="h-20 w-full bg-[#141414]" />
            <Skeleton className="h-16 w-full bg-[#181818]" />
            <Skeleton className="h-12 w-full bg-[#202020]" />
          </div>
        </div>

        {/* Specifications Skeleton */}
        <div className="h-64 bg-[#0A0A0A] border border-[#222]" />
      </div>
    </div>
  );
}
