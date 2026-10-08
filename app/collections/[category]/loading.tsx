import React from "react";
import { CollectionSkeleton } from "@/components/collections/CollectionSkeleton";

export default function CategoryLoading() {
  return (
    <div className="w-full bg-[#050505] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Skeleton */}
        <div className="h-64 bg-[#0A0A0A] border border-[#222] animate-pulse" />
        {/* Results Skeleton */}
        <CollectionSkeleton />
      </div>
    </div>
  );
}
