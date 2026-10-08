import React from "react";
import type { GemstoneWithDetails } from "@/types/gemstone";
import { GemstoneCard } from "@/components/gemstones/GemstoneCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterX } from "lucide-react";

export interface CollectionGridProps {
  gemstones: GemstoneWithDetails[];
  resetHref?: string;
  className?: string;
}

export function CollectionGrid({
  gemstones,
  resetHref,
  className,
}: CollectionGridProps) {
  if (gemstones.length === 0) {
    return (
      <div className="py-12 sm:py-16">
        <EmptyState
          title="No Gemstones Found"
          description="No specimens match your current filter or search criteria. Try broadening your parameters or clearing active filters."
          actionLabel="Reset All Filters"
          actionHref={resetHref || "/collections"}
          icon={<FilterX className="w-6 h-6 text-[#294D2C]" />}
        />
      </div>
    );
  }

  return (
    <div
      className={
        className ||
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      }
    >
      {gemstones.map((gemstone, index) => (
        <GemstoneCard
          key={gemstone.id}
          gemstone={gemstone}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
