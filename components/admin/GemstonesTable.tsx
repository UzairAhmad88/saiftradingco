import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gem, Star } from "lucide-react";
import type { GemstoneWithDetails } from "@/types/gemstone";
import { GemstoneQuickActions } from "@/components/admin/GemstoneQuickActions";
import { GemstoneMobileCard } from "@/components/admin/GemstoneMobileCard";

export interface GemstonesTableProps {
  gemstones: GemstoneWithDetails[];
}

export function GemstonesTable({ gemstones }: GemstonesTableProps) {
  if (gemstones.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Mobile list view (hidden on desktop lg) */}
      <div className="lg:hidden space-y-3">
        {gemstones.map((gem) => (
          <GemstoneMobileCard key={gem.id} gemstone={gem} />
        ))}
      </div>

      {/* Desktop Table View (hidden on mobile, visible on lg) */}
      <div className="hidden lg:block overflow-x-auto bg-[#111111] border border-[#262626] rounded-[4px]">
        <table className="w-full text-left border-collapse" aria-label="Gemstones catalogue table">
          <thead>
            <tr className="border-b border-[#262626] bg-[#0A0A0A] text-[10px] font-mono uppercase tracking-[0.16em] text-[#9A9A94]">
              <th scope="col" className="py-3 px-4 w-14">Image</th>
              <th scope="col" className="py-3 px-4">Specimen / SKU</th>
              <th scope="col" className="py-3 px-4">Category</th>
              <th scope="col" className="py-3 px-4">Carat / Dimensions</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-4 text-center">Featured</th>
              <th scope="col" className="py-3 px-4">Updated</th>
              <th scope="col" className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1F1F] text-xs">
            {gemstones.map((gem) => {
              const primaryImg =
                gem.images?.find((img) => img.is_primary) || gem.images?.[0];

              const statusColor =
                gem.status === "available"
                  ? "bg-[#9CCB63]/10 text-[#9CCB63] border-[#9CCB63]/30"
                  : gem.status === "sold"
                  ? "bg-[#262626] text-[#9A9A94] border-[#333333]"
                  : gem.status === "draft"
                  ? "bg-[#B7D98B]/10 text-[#B7D98B] border-[#B7D98B]/30"
                  : "bg-[#171717] text-[#737373] border-[#262626]";

              return (
                <tr
                  key={gem.id}
                  className="hover:bg-[#141414] transition-colors group"
                >
                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="relative w-10 h-10 bg-[#050505] border border-[#262626] rounded-[4px] overflow-hidden">
                      {primaryImg?.image_url ? (
                        <Image
                          src={primaryImg.image_url}
                          alt={gem.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#404040]">
                          <Gem className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Name, SKU, Slug */}
                  <td className="py-3 px-4">
                    <div className="max-w-xs">
                      <Link
                        href={`/admin/gemstones/${gem.id}/edit`}
                        className="text-xs font-medium text-[#F5F5F0] hover:text-[#9CCB63] transition-colors line-clamp-1"
                      >
                        {gem.name}
                      </Link>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#737373] font-mono mt-0.5">
                        {gem.sku ? <span>{gem.sku}</span> : <span className="italic">No SKU</span>}
                        <span>•</span>
                        <span className="truncate max-w-[120px]" title={gem.slug}>
                          /{gem.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-[#9A9A94] text-xs">
                    {gem.category?.name || "Uncategorized"}
                  </td>

                  {/* Carat / Dimensions */}
                  <td className="py-3 px-4 font-mono text-[11px] text-[#9A9A94]">
                    {gem.carat_weight ? (
                      <span>{gem.carat_weight} ct</span>
                    ) : (
                      <span className="text-[#525252]">—</span>
                    )}
                    {gem.dimensions && (
                      <span className="block text-[10px] text-[#737373] truncate max-w-[110px]" title={gem.dimensions}>
                        {gem.dimensions}
                      </span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block text-[9px] uppercase tracking-wider px-2 py-0.5 border rounded-[4px] font-mono ${statusColor}`}
                    >
                      {gem.status}
                    </span>
                  </td>

                  {/* Featured */}
                  <td className="py-3 px-4 text-center">
                    {gem.featured ? (
                      <Star
                        className="w-3.5 h-3.5 text-[#9CCB63] fill-[#9CCB63] mx-auto"
                        aria-label="Featured on homepage"
                      />
                    ) : (
                      <span className="text-[#404040] text-xs">—</span>
                    )}
                  </td>

                  {/* Updated timestamp */}
                  <td className="py-3 px-4 font-mono text-[11px] text-[#737373] whitespace-nowrap">
                    {new Date(gem.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <GemstoneQuickActions
                      id={gem.id}
                      slug={gem.slug}
                      name={gem.name}
                      status={gem.status}
                      featured={gem.featured}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
