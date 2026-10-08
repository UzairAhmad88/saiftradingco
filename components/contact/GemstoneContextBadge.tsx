"use client";

import React from "react";
import Image from "next/image";
import { Gem, X } from "lucide-react";

export interface GemstoneContextProps {
  gemstone: {
    slug: string;
    name: string;
    sku?: string;
    category?: string;
    image?: string;
  };
  onClear: () => void;
}

export function GemstoneContextBadge({ gemstone, onClear }: GemstoneContextProps) {
  return (
    <div
      role="region"
      aria-label="Selected gemstone inquiry context"
      className="p-4 bg-[#111111] border border-[#B6D94C]/30 rounded-[4px] transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          {gemstone.image ? (
            <div className="relative w-12 h-12 bg-[#171717] border border-[#242424] rounded-[4px] shrink-0 overflow-hidden">
              <Image
                src={gemstone.image}
                alt={gemstone.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-[#171717] border border-[#242424] rounded-[4px] shrink-0 flex items-center justify-center">
              <Gem className="w-5 h-5 text-[#B6D94C]" aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B6D94C] block font-medium">
              Inquiry Regarding Specimen
            </span>
            <h3 className="text-sm font-medium text-[#F5F3EE] truncate mt-0.5">
              {gemstone.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#A5A5A0]">
              {gemstone.sku && (
                <span className="font-mono text-[11px] text-[#B6D94C]">
                  {gemstone.sku}
                </span>
              )}
              {gemstone.sku && gemstone.category && <span>•</span>}
              {gemstone.category && <span>{gemstone.category}</span>}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          aria-label={`Remove ${gemstone.name} context from inquiry`}
          className="text-[#9A9A94] hover:text-[#F5F5F0] p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63] rounded-[4px]"
          title="Switch to general inquiry"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
