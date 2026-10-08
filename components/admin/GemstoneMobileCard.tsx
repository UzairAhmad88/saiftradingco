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
      ? "bg-[#B6D94C]/10 text-[#B6D94C] border-[#B6D94C]/30"
      : gemstone.status === "sold"
      ? "bg-[#262626] text-[#A3A3A3] border-[#333333]"
      : gemstone.status === "draft"
      ? "bg-[#B69B5E]/10 text-[#B69B5E] border-[#B69B5E]/30"
      : "bg-[#171717] text-[#737373] border-[#262626]";

  return (
    <div className="bg-[#101010] border border-[#2A2A2A] p-4 space-y-3">
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 bg-[#050505] border border-[#2A2A2A] shrink-0 overflow-hidden">
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
              className="text-xs font-medium text-[#F5F5F5] hover:text-[#B69B5E] transition-colors line-clamp-1"
            >
              {gemstone.name}
            </Link>
          </div>

          <p className="text-[11px] text-[#A3A3A3] mt-0.5">
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
      <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border font-mono ${statusColor}`}
          >
            {gemstone.status}
          </span>
          {gemstone.price !== null && gemstone.price !== undefined && (
            <span className="text-[11px] font-mono text-[#F5F5F5]">
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
      <div className="pt-2 border-t border-[#1C1C1C]">
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
