import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gem, Calendar, Tag } from "lucide-react";
import type { GemstoneWithDetails } from "@/types/gemstone";
import { GemstoneQuickActions } from "@/components/admin/GemstoneQuickActions";

export interface GemstoneMobileCardProps {
  gemstone: GemstoneWithDetails;
}

export function GemstoneMobileCard({ gemstone }: GemstoneMobileCardProps) {
  const primaryImg =
    gemstone.images?.find((img) => img.is_primary) || gemstone.images?.[0];

  const statusColor =
    gemstone.status === "available"
      ? "bg-[#9CCB63]/10 text-[#9CCB63] border-[#9CCB63]/30"
      : gemstone.status === "sold"
      ? "bg-[#262626] text-[#9A9A94] border-[#333333]"
      : gemstone.status === "draft"
      ? "bg-[#B7D98B]/10 text-[#B7D98B] border-[#B7D98B]/30"
      : "bg-[#171717] text-[#737373] border-[#262626]";

  return (
    <div className="bg-[#111111] border border-[#262626] rounded-[4px] p-4 space-y-3">
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 bg-[#050505] border border-[#262626] rounded-[4px] shrink-0 overflow-hidden">
          {primaryImg?.image_url ? (
            <Image
              src={primaryImg.image_url}
              alt={gemstone.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#404040]">
              <Gem className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Title, Category & SKU */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/admin/gemstones/${gemstone.id}/edit`}
              className="text-xs font-medium text-[#F5F5F0] hover:text-[#9CCB63] transition-colors line-clamp-1"
            >
              {gemstone.name}
            </Link>
          </div>

          <p className="text-[11px] text-[#9A9A94] mt-0.5">
            {gemstone.category?.name || "Uncategorized"}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#737373] font-mono mt-1">
            {gemstone.sku && (
              <span className="flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />
                {gemstone.sku}
              </span>
            )}
            {gemstone.carat_weight && (
              <span>• {gemstone.carat_weight} ct</span>
            )}
          </div>
        </div>
      </div>

      {/* Meta Bar & Status */}
      <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border rounded-[4px] font-mono ${statusColor}`}
          >
            {gemstone.status}
          </span>
          {gemstone.price !== null && gemstone.price !== undefined && (
            <span className="text-[11px] font-mono text-[#F5F5F0]">
              ${gemstone.price.toLocaleString()} {gemstone.currency || "USD"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[10px] text-[#737373] font-mono">
          <Calendar className="w-3 h-3" />
          <span>
            {new Date(gemstone.updated_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Quick Action controls */}
      <div className="pt-2 border-t border-[#1F1F1F]">
        <GemstoneQuickActions
          id={gemstone.id}
          slug={gemstone.slug}
          name={gemstone.name}
          status={gemstone.status}
          featured={gemstone.featured}
        />
      </div>
    </div>
  );
}
