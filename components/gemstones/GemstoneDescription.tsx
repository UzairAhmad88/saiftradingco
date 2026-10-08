import React from "react";
import type { GemstoneWithDetails } from "@/types/gemstone";

export interface GemstoneDescriptionProps {
  gemstone: GemstoneWithDetails;
}

export function GemstoneDescription({ gemstone }: GemstoneDescriptionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="type-eyebrow text-[#B69B5E] block">
          Mineralogical Observation
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal">
          Specimen Character &amp; Notes
        </h2>
      </div>

      <div className="space-y-4 text-sm sm:text-base text-[#A3A3A3] font-light leading-relaxed max-w-3xl">
        <p className="text-[#E5E5E5] text-base sm:text-lg leading-relaxed">
          {gemstone.description || gemstone.short_description}
        </p>

        <p>
          This specimen retains its original, unworked crystalline geometry as formed under natural geological conditions. Vertical striations, natural termination planes, and internal crystalline inclusions remain undisturbed, offering authentic character for fine mineral specimen collections or specialty lapidary evaluation.
        </p>

        <p className="text-xs text-[#737373] pt-2 border-t border-[#1C1C1C]">
          All dimensions and physical parameters are measured directly from the physical specimen. Prospective buyers and trade clients may request high-resolution video documentation under balanced daylight illumination or arrange an in-person inspection at our Hong Kong office.
        </p>
      </div>
    </div>
  );
}
