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
      className="p-4 bg-[#101010] border border-[#B69B5E]/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          {gemstone.image ? (
            <div className="relative w-12 h-12 bg-[#171717] border border-[#2A2A2A] shrink-0 overflow-hidden">
              <Image
                src={gemstone.image}
                alt={gemstone.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-[#171717] border border-[#2A2A2A] shrink-0 flex items-center justify-center">
              <Gem className="w-5 h-5 text-[#B69B5E]" aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69B5E] block font-medium">
              Inquiry Regarding Specimen
            </span>
            <h3 className="text-sm font-medium text-[#F5F5F5] truncate mt-0.5">
              {gemstone.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-[#A3A3A3]">
              {gemstone.sku && (
                <span className="font-mono text-[11px] text-[#B69B5E]/90">
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
          className="text-[#737373] hover:text-[#F5F5F5] p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
          title="Switch to general inquiry"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
