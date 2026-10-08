import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FileCheck, Sparkles } from "lucide-react";
import type { Gemstone, GemstoneWithDetails } from "@/types/gemstone";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils/cn";

export interface GemstoneCardProps {
  gemstone: Gemstone | GemstoneWithDetails;
  priority?: boolean;
  className?: string;
}

export function GemstoneCard({
  gemstone,
  priority = false,
  className,
}: GemstoneCardProps) {
  // Extract primary image or fallback placeholder
  const details = gemstone as GemstoneWithDetails;
  const imageUrl =
    details.images?.[0]?.image_url ||
    (gemstone as { image_url?: string }).image_url ||
    "/images/placeholder-gemstone.svg";

  const isSold = gemstone.status === "sold";
  const categoryName = details.category?.name || "Natural Rough Specimen";

  return (
    <article
      className={cn(
        "group flex flex-col bg-[#101010] border border-[#2A2A2A] transition-all duration-300",
        "hover:border-[#B69B5E]/60 hover:bg-[#141414]",
        className
      )}
    >
      <Link
        href={`/gemstones/${gemstone.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B69B5E]"
        aria-label={`${gemstone.name} - ${categoryName}, ${gemstone.carat_weight ? `${gemstone.carat_weight} carats, ` : ""}${isSold ? "Status: Sold. View archive record" : "Status: Available. View specimen details"}`}
      >
        {/* Dominant Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a] border-b border-[#2A2A2A]">
          {imageUrl.endsWith(".svg") ? (
            <div className="w-full h-full flex items-center justify-center bg-[#0d0d0d] text-[#737373]">
              <div className="text-center p-6 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-[#B69B5E]/50" />
                <span className="text-[11px] uppercase tracking-widest text-[#737373] block">
                  Natural Rough Specimen
                </span>
              </div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={details.images?.[0]?.alt_text || `Natural rough ${gemstone.name} crystal specimen`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-500 ease-out",
                "group-hover:scale-[1.03]",
                isSold && "opacity-75 grayscale-[25%]"
              )}
            />
          )}

          {/* Top Status Overlays */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            {isSold ? (
              <StatusBadge variant="sold">Sold</StatusBadge>
            ) : gemstone.featured ? (
              <StatusBadge variant="featured">Featured</StatusBadge>
            ) : (
              <StatusBadge variant="available">Available</StatusBadge>
            )}
          </div>

          {/* Optional Certificate Lab Badge */}
          {gemstone.certificate_lab && (
            <div className="absolute top-3 right-3 z-10">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#050505]/85 border border-[#2A2A2A] text-[#F5F5F5] backdrop-blur-sm"
                title={`Certified by ${gemstone.certificate_lab}`}
              >
                <FileCheck className="w-3 h-3 text-[#B69B5E]" />
                <span>{gemstone.certificate_lab}</span>
              </span>
            </div>
          )}
        </div>

        {/* Quiet Catalogue Metadata */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#737373]">
              <span>{categoryName}</span>
              {gemstone.sku && <span className="font-mono text-[10px]">{gemstone.sku}</span>}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F5] font-normal group-hover:text-[#B69B5E] transition-colors leading-snug">
              {gemstone.name}
            </h3>

            {gemstone.short_description && (
              <p className="text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed pt-1 font-light">
                {gemstone.short_description}
              </p>
            )}
          </div>

          {/* Specifications Row */}
          <div className="pt-4 border-t border-[#1D1D1D] flex items-center justify-between text-xs text-[#A3A3A3]">
            <div className="flex items-center gap-3">
              {gemstone.carat_weight && (
                <span className="font-medium text-[#F5F5F5]">
                  {gemstone.carat_weight} <span className="font-light text-[#737373]">ct</span>
                </span>
              )}
              {gemstone.origin && (
                <>
                  <span className="text-[#3A3A3A]" aria-hidden="true">·</span>
                  <span className="text-[#737373]">{gemstone.origin}</span>
                </>
              )}
            </div>

            <span className="text-[11px] uppercase tracking-[0.18em] text-[#B69B5E] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              {isSold ? "Archive Details →" : "View Specimen →"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
