import React from "react";
import type { GemstoneWithDetails } from "@/types/gemstone";

export interface GemstoneDescriptionProps {
  gemstone: GemstoneWithDetails;
}

export function GemstoneDescription({ gemstone }: GemstoneDescriptionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="type-eyebrow text-[#4D6618] block font-bold">
          Mineralogical Observation
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#050505] font-semibold">
          Specimen Character &amp; Notes
        </h2>
      </div>

      <div className="space-y-4 text-sm sm:text-base text-[#555550] font-normal leading-relaxed max-w-3xl">
        <p className="text-[#050505] text-base sm:text-lg leading-relaxed font-medium">
          {gemstone.description || gemstone.short_description}
        </p>

        <p>
          This specimen retains its original, unworked crystalline geometry as formed under natural geological conditions. Vertical striations, natural termination planes, and internal crystalline inclusions remain undisturbed, offering authentic character for fine mineral specimen collections or specialty lapidary evaluation.
        </p>

        <p className="text-xs text-[#555550] pt-2 border-t border-[#E2DFD7]">
          All dimensions and physical parameters are measured directly from the physical specimen. Prospective buyers and trade clients may request high-resolution video documentation under balanced daylight illumination or arrange an in-person inspection at our Hong Kong office.
        </p>
      </div>
    </div>
  );
}
