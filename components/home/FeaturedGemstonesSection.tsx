import React from "react";
import Link from "next/link";
import { FEATURED_GEMSTONES_DATA } from "@/lib/data/homepage-data";
import { GemstoneCard } from "@/components/gemstones/GemstoneCard";
import { ArrowRight, Info } from "lucide-react";

export function FeaturedGemstonesSection() {
  return (
    <section
      aria-labelledby="featured-gemstones-heading"
      className="border-b border-[#262626] bg-[#070707] py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Demo Note */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#9CCB63] block">
              Curated Specimens
            </span>
            <h2
              id="featured-gemstones-heading"
              className="font-serif text-3xl sm:text-5xl text-[#F5F5F0] font-normal tracking-tight"
            >
              Selected Rough Gemstones
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-sm text-[#9A9A94] max-w-md font-light leading-relaxed md:text-right">
              Individual rough crystals documented with physical carat weight, dimensions, and natural crystal terminations.
            </p>
            {/* Transparent Showcase Indicator */}
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#9A9A94] tracking-wide">
              <Info className="w-3 h-3 text-[#9CCB63]" />
              <span>Catalog Showcase · Inquire for Current Lot Availability</span>
            </div>
          </div>
        </div>

        {/* Gemstone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_GEMSTONES_DATA.map((gemstone) => (
            <GemstoneCard
              key={gemstone.id}
              gemstone={gemstone}
            />
          ))}
        </div>

        {/* View All Collections Link */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#262626] bg-[#111111] text-xs uppercase tracking-[0.2em] text-[#F5F5F0] hover:border-[#9CCB63] hover:text-[#9CCB63] transition-all duration-200 rounded-[4px]"
          >
            <span>View All Gemstone Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
