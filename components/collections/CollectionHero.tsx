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
      className="relative border-b border-[#242424] bg-[#050505] py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Background Subtle Gradient & Grid Texture */}
      <div
        className="absolute inset-0 bg-radial from-[#121212]/80 via-[#050505] to-[#050505] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#B6D94C]/30 bg-[#B6D94C]/10 text-[#B6D94C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[4px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B6D94C]" aria-hidden="true" />
              <span>{category.mineralGroup}</span>
            </div>

            <div className="space-y-3">
              <h1
                id="collection-hero-heading"
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#F5F3EE] tracking-tight leading-[1.08]"
              >
                Rough {category.name}
              </h1>
              <p className="font-serif text-lg sm:text-xl text-[#B6D94C] font-normal italic">
                Natural Specimen Portfolio
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#A5A5A0] font-normal leading-relaxed max-w-2xl font-light">
              {category.longDescription}
            </p>

            {/* Mineralogical Data Strip */}
            <div className="pt-4 border-t border-[#1A1A1A] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777772] block font-medium">
                  Formula
                </span>
                <span className="font-mono text-[11px] text-[#F5F3EE] block truncate font-semibold" title={category.formula}>
                  {category.formula}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777772] block font-medium">
                  Crystal System
                </span>
                <span className="text-xs text-[#F5F3EE] block font-semibold">
                  {category.crystalSystem}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777772] block font-medium">
                  Mohs Hardness
                </span>
                <span className="text-xs text-[#F5F3EE] block font-semibold">
                  {category.mohsHardness}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#777772] block font-medium">
                  Specific Gravity
                </span>
                <span className="text-xs text-[#F5F3EE] block font-semibold">
                  {category.specificGravity}
                </span>
              </div>
            </div>
          </div>

          {/* Focal Mineral Photography Frame — Black Editorial Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full max-w-md lg:max-w-none bg-[#050505] border border-[#242424] rounded-[4px] overflow-hidden group shadow-xl">
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
              <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-[#B6D94C] font-semibold z-10 font-mono">
                <span>{category.name} Crystalline Reference</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
