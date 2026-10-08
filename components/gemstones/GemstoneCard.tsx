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
        "group flex flex-col bg-[#F7F7F1] border border-[#D4DEC5] rounded-[4px] transition-all duration-300 shadow-xs",
        "hover:border-[#050505]/70 hover:shadow-sm",
        className
      )}
    >
      <Link
        href={`/gemstones/${gemstone.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#050505] rounded-[4px]"
        aria-label={`${gemstone.name} - ${categoryName}, ${gemstone.carat_weight ? `${gemstone.carat_weight} carats, ` : ""}${isSold ? "Status: Sold. View archive record" : "Status: Available. View specimen details"}`}
      >
        {/* Dominant Image Container — Black Luxury Contrast Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050505] border-b border-[#050505]">
          {imageUrl.endsWith(".svg") ? (
            <div className="w-full h-full flex items-center justify-center bg-[#050505] text-[#777A70]">
              <div className="text-center p-6 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-[#B7D98B]" />
                <span className="text-[11px] uppercase tracking-widest text-[#F7F7F1] block">
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
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#050505]/90 border border-[#262626] text-[#F7F7F1] rounded-[2px] backdrop-blur-sm"
                title={`Certified by ${gemstone.certificate_lab}`}
              >
                <FileCheck className="w-3 h-3 text-[#B7D98B]" />
                <span>{gemstone.certificate_lab}</span>
              </span>
            </div>
          )}
        </div>

        {/* Quiet Catalogue Metadata */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#294D2C] font-semibold">
              <span>{categoryName}</span>
              {gemstone.sku && <span className="font-mono text-[10px] text-[#777A70]">{gemstone.sku}</span>}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#050505] font-semibold group-hover:text-[#294D2C] transition-colors leading-snug">
              {gemstone.name}
            </h3>

            {gemstone.short_description && (
              <p className="text-xs text-[#777A70] line-clamp-2 leading-relaxed pt-1 font-normal">
                {gemstone.short_description}
              </p>
            )}
          </div>

          {/* Specifications Row */}
          <div className="pt-4 border-t border-[#D4DEC5] flex items-center justify-between text-xs text-[#777A70]">
            <div className="flex items-center gap-2.5">
              {gemstone.carat_weight && (
                <span className="font-bold text-[#050505]">
                  {gemstone.carat_weight} <span className="font-normal text-[#777A70]">ct</span>
                </span>
              )}
              {gemstone.origin && (
                <>
                  <span className="text-[#D4DEC5]" aria-hidden="true">·</span>
                  <span className="text-[#294D2C] font-medium">{gemstone.origin}</span>
                </>
              )}
            </div>

            <span className="text-[11px] uppercase tracking-[0.18em] text-[#050505] group-hover:text-[#294D2C] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 font-bold">
              {isSold ? "Archive Details →" : "View Specimen →"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
