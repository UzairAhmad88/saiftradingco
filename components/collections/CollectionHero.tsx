import React from "react";
import Image from "next/image";
import type { CategoryDetail } from "@/lib/data/collections-data";

export interface CollectionHeroProps {
  category: CategoryDetail;
}

export function CollectionHero({ category }: CollectionHeroProps) {
  return (
    <section
      aria-labelledby="collection-hero-heading"
      className="relative border-b border-[#D4DEC5] bg-[#E5F1D2] py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Subtle Gradient & Grid Texture */}
      <div
        className="absolute inset-0 bg-radial from-[#CFE7AA]/50 via-[#E5F1D2] to-[#E5F1D2] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#294D2C]/30 bg-[#CFE7AA] text-[#294D2C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[4px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#294D2C]" aria-hidden="true" />
              <span>{category.mineralGroup}</span>
            </div>

            <div className="space-y-3">
              <h1
                id="collection-hero-heading"
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#050505] tracking-tight leading-[1.08] font-semibold"
              >
                Rough {category.name}
              </h1>
              <p className="font-serif text-lg sm:text-xl text-[#294D2C] font-normal italic">
                Natural Specimen Portfolio
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#050505]/85 font-normal leading-relaxed max-w-2xl">
              {category.longDescription}
            </p>

            {/* Mineralogical Data Strip */}
            <div className="pt-4 border-t border-[#D4DEC5] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777A70] block font-medium">
                  Formula
                </span>
                <span className="font-mono text-[11px] text-[#050505] block truncate font-semibold" title={category.formula}>
                  {category.formula}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777A70] block font-medium">
                  Crystal System
                </span>
                <span className="text-xs text-[#050505] block font-semibold">
                  {category.crystalSystem}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777A70] block font-medium">
                  Mohs Hardness
                </span>
                <span className="text-xs text-[#050505] block font-semibold">
                  {category.mohsHardness}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777A70] block font-medium">
                  Specific Gravity
                </span>
                <span className="text-xs text-[#050505] block font-semibold">
                  {category.specificGravity}
                </span>
              </div>
            </div>
          </div>

          {/* Focal Mineral Photography Frame — Black Editorial Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full max-w-md lg:max-w-none bg-[#050505] border border-[#050505] rounded-[4px] overflow-hidden group shadow-xl">
              <Image
                src={category.heroImage}
                alt={`Natural rough ${category.name} crystal specimen`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-[#B7D98B] font-semibold z-10">
                <span>{category.name} Crystalline Reference</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
