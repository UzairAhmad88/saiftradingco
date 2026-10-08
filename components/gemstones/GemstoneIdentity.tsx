import React from "react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { GemstoneWithDetails } from "@/types/gemstone";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

export interface GemstoneIdentityProps {
  gemstone: GemstoneWithDetails;
}

export function GemstoneIdentity({ gemstone }: GemstoneIdentityProps) {
  const isSold = gemstone.status === "sold";
  const categoryName = gemstone.category?.name || "Natural Rough Specimen";
  const categorySlug = gemstone.category?.slug || "collections";

  return (
    <div className="flex flex-col justify-between space-y-8">
      <div className="space-y-6">
        {/* Category Eyebrow & Status Row */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/collections/${categorySlug}`}
            className="text-[11px] uppercase tracking-[0.25em] text-[#B69B5E] hover:underline inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
          >
            <span>Rough {categoryName}</span>
          </Link>

          {isSold ? (
            <StatusBadge variant="sold">Sold</StatusBadge>
          ) : gemstone.featured ? (
            <StatusBadge variant="featured">Featured Specimen</StatusBadge>
          ) : (
            <StatusBadge variant="available">Available</StatusBadge>
          )}
        </div>

        {/* Primary H1 Heading & SKU */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F5F5F5] tracking-tight leading-[1.08]">
            {gemstone.name}
          </h1>

          {gemstone.sku && (
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#737373]">
              SKU: {gemstone.sku}
            </div>
          )}
        </div>

        {/* Short Editorial Description */}
        {gemstone.short_description && (
          <p className="text-sm sm:text-base text-[#A3A3A3] font-light leading-relaxed">
            {gemstone.short_description}
          </p>
        )}

        {/* Primary Metric Highlights Box */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] border border-[#222] grid grid-cols-2 gap-4">
          {gemstone.carat_weight && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#737373] block">
                Carat Weight
              </span>
              <div className="text-xl sm:text-2xl font-serif text-[#F5F5F5]">
                {gemstone.carat_weight} <span className="text-xs font-sans text-[#737373]">ct</span>
              </div>
            </div>
          )}

          {gemstone.dimensions && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#737373] block">
                Dimensions
              </span>
              <div className="text-xs sm:text-sm font-mono text-[#E5E5E5] pt-1">
                {gemstone.dimensions}
              </div>
            </div>
          )}
        </div>

        {/* Sold Notice or Physical Availability Assurance */}
        {isSold ? (
          <div className="p-4 bg-[#141414] border border-[#2A2A2A] text-xs text-[#A3A3A3] space-y-1">
            <span className="font-medium text-[#F5F5F5] block">Catalogue Archive Record</span>
            <p>
              This specimen has been acquired. You may contact our Hong Kong trade office to inquire about newly arriving or similar rough crystalline material.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
            <MapPin className="w-3.5 h-3.5 text-[#B69B5E] shrink-0" />
            <span>Available for inspection at Focal Industrial Centre, Hung Hom, Hong Kong</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-6 border-t border-[#1F1F1F]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <LinkButton
            href={`/contact?gemstone=${gemstone.slug}${isSold ? "&type=similar" : ""}`}
            variant={isSold ? "secondary" : "primary"}
            size="lg"
            className="flex-1 text-center"
          >
            {isSold ? "Inquire for Similar Specimens" : "Make an Inquiry"}
          </LinkButton>

          <Link
            href={`/collections/${categorySlug}`}
            className="px-6 py-3.5 border border-[#2A2A2A] hover:border-[#B69B5E] text-xs uppercase tracking-[0.2em] text-[#A3A3A3] hover:text-[#F5F5F5] text-center transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>All {categoryName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-[#737373] tracking-wide">
          <Sparkles className="w-3 h-3 text-[#B69B5E]" />
          <span>Direct trade correspondence · No online checkout or fake automated pricing</span>
        </div>
      </div>
    </div>
  );
}
