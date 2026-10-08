import React from "react";
import type { GemstoneWithDetails } from "@/types/gemstone";

export interface GemstoneSpecificationsProps {
  gemstone: GemstoneWithDetails;
}

export function GemstoneSpecifications({ gemstone }: GemstoneSpecificationsProps) {
  // Construct list of verified non-empty specifications
  const specs: { label: string; value: string | number }[] = [];

  if (gemstone.category?.name) {
    specs.push({ label: "Mineral Variety", value: `Natural Rough ${gemstone.category.name}` });
  }

  if (gemstone.carat_weight) {
    specs.push({ label: "Carat Weight", value: `${gemstone.carat_weight} ct` });
  }

  if (gemstone.dimensions) {
    specs.push({ label: "Physical Dimensions", value: gemstone.dimensions });
  }

  if (gemstone.color) {
    specs.push({ label: "Color / Hue", value: gemstone.color });
  }

  if (gemstone.clarity) {
    specs.push({ label: "Optical Clarity", value: gemstone.clarity });
  }

  specs.push({ label: "Specimen State", value: "Natural Rough Specimen (Uncut)" });

  if (gemstone.origin) {
    specs.push({ label: "Catalog Classification", value: gemstone.origin });
  }

  if (gemstone.treatment) {
    specs.push({ label: "Treatment Disclosure", value: gemstone.treatment });
  }

  if (gemstone.sku) {
    specs.push({ label: "Catalog Reference (SKU)", value: gemstone.sku });
  }

  specs.push({
    label: "Inventory Status",
    value: gemstone.status === "available" ? "Available for Inquiry" : "Archived / Sold",
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="type-eyebrow text-[#B69B5E] block">
          Documented Parameters
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal">
          Physical &amp; Mineralogical Specifications
        </h2>
      </div>

      <div className="bg-[#090909] border border-[#222] divide-y divide-[#1A1A1A]">
        {specs.map((item) => (
          <div
            key={item.label}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <span className="text-xs uppercase tracking-wider text-[#737373] font-medium">
              {item.label}
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#F5F5F5]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
