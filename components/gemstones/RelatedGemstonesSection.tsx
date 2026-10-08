import React from "react";
import Link from "next/link";
import type { GemstoneWithDetails } from "@/types/gemstone";
import { GemstoneCard } from "@/components/gemstones/GemstoneCard";
import { ArrowRight } from "lucide-react";

export interface RelatedGemstonesSectionProps {
  relatedGemstones: GemstoneWithDetails[];
  categoryName?: string;
  categorySlug?: string;
}

export function RelatedGemstonesSection({
  relatedGemstones,
  categoryName = "Gemstone",
  categorySlug,
}: RelatedGemstonesSectionProps) {
  if (!relatedGemstones || relatedGemstones.length === 0) return null;

  return (
    <section
      aria-labelledby="related-gemstones-heading"
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#D4DEC5]">
        <div className="space-y-1">
          <span className="type-eyebrow text-[#294D2C] block font-bold">
            Comparative Specimens
          </span>
          <h2
            id="related-gemstones-heading"
            className="font-serif text-2xl sm:text-3xl text-[#050505] font-semibold"
          >
            Related Rough {categoryName} Specimens
          </h2>
        </div>

        {categorySlug && (
          <Link
            href={`/collections/${categorySlug}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#050505] font-bold hover:text-[#294D2C] transition-colors"
          >
            <span>Explore Entire {categoryName} Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {relatedGemstones.map((g) => (
          <GemstoneCard key={g.id} gemstone={g} />
        ))}
      </div>
    </section>
  );
}
