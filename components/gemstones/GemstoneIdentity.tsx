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
            className="text-[11px] uppercase tracking-[0.25em] text-[#9CCB63] hover:text-[#B7D98B] hover:underline inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
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
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F5F5F0] tracking-tight leading-[1.08]">
            {gemstone.name}
          </h1>

          {gemstone.sku && (
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#9A9A94]">
              SKU: {gemstone.sku}
            </div>
          )}
        </div>

        {/* Short Editorial Description */}
        {gemstone.short_description && (
          <p className="text-sm sm:text-base text-[#9A9A94] font-light leading-relaxed">
            {gemstone.short_description}
          </p>
        )}

        {/* Primary Metric Highlights Box */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] border border-[#262626] rounded-[4px] grid grid-cols-2 gap-4">
          {gemstone.carat_weight && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#9A9A94] block">
                Carat Weight
              </span>
              <div className="text-xl sm:text-2xl font-serif text-[#F5F5F0]">
                {gemstone.carat_weight} <span className="text-xs font-sans text-[#9A9A94]">ct</span>
              </div>
            </div>
          )}

          {gemstone.dimensions && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#9A9A94] block">
                Dimensions
              </span>
              <div className="text-xs sm:text-sm font-mono text-[#D8D8D2] pt-1">
                {gemstone.dimensions}
              </div>
            </div>
          )}
        </div>

        {/* Sold Notice or Physical Availability Assurance */}
        {isSold ? (
          <div className="p-4 bg-[#111111] border border-[#262626] rounded-[4px] text-xs text-[#9A9A94] space-y-1">
            <span className="font-medium text-[#F5F5F0] block">Catalogue Archive Record</span>
            <p>
              This specimen has been acquired. You may contact our Hong Kong trade office to inquire about newly arriving or similar rough crystalline material.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#9A9A94]">
            <MapPin className="w-3.5 h-3.5 text-[#9CCB63] shrink-0" />
            <span>Available for inspection at Focal Industrial Centre, Hung Hom, Hong Kong</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 pt-6 border-t border-[#1A1A1A]">
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
            className="px-6 py-3.5 border border-[#262626] hover:border-[#9CCB63] text-xs uppercase tracking-[0.2em] text-[#9A9A94] hover:text-[#9CCB63] text-center transition-colors inline-flex items-center justify-center gap-2 rounded-[4px]"
          >
            <span>All {categoryName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-[#9A9A94] tracking-wide">
          <Sparkles className="w-3 h-3 text-[#9CCB63]" />
          <span>Direct trade correspondence · No online checkout or fake automated pricing</span>
        </div>
      </div>
    </div>
  );
}
