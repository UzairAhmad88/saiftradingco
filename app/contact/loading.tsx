import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="w-full bg-[#050505] min-h-screen focus:outline-none"
    >
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-[#2A2A2A] bg-[#080808] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32 bg-[#171717]" />
        </div>
      </div>

      {/* Hero Skeleton */}
      <section className="border-b border-[#2A2A2A] bg-[#070707] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <Skeleton className="h-3 w-28 bg-[#171717]" />
          <Skeleton className="h-10 w-3/4 sm:w-2/3 bg-[#171717]" />
          <Skeleton className="h-5 w-full bg-[#171717]" />
        </div>
      </section>

      {/* Two Column Content Skeleton */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="h-36 w-full bg-[#101010]" />
            <Skeleton className="h-48 w-full bg-[#101010]" />
            <Skeleton className="h-48 w-full bg-[#101010]" />
          </div>
          <div className="lg:col-span-7">
            <Skeleton className="h-[520px] w-full bg-[#101010]" />
          </div>
        </div>
      </section>
    </main>
  );
}
