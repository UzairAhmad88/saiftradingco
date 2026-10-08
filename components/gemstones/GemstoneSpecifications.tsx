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
        <span className="type-eyebrow text-[#294D2C] block font-bold">
          Documented Parameters
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#050505] font-semibold">
          Physical &amp; Mineralogical Specifications
        </h2>
      </div>

      <div className="bg-[#E5F1D2] border border-[#D4DEC5] rounded-[4px] divide-y divide-[#D4DEC5] shadow-xs">
        {specs.map((item) => (
          <div
            key={item.label}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <span className="text-xs uppercase tracking-wider text-[#294D2C] font-semibold">
              {item.label}
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#050505] font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
