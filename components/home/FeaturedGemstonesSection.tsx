import React from "react";
import Link from "next/link";
import { FEATURED_GEMSTONES_DATA } from "@/lib/data/homepage-data";
import { GemstoneCard } from "@/components/gemstones/GemstoneCard";
import { ArrowRight, Info } from "lucide-react";

export function FeaturedGemstonesSection() {
  return (
    <section
      aria-labelledby="featured-gemstones-heading"
      className="border-b border-[#2A2A2A] bg-[#070707] py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Demo Note */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#B69B5E] block">
              Curated Specimens
            </span>
            <h2
              id="featured-gemstones-heading"
              className="font-serif text-3xl sm:text-5xl text-[#F5F5F5] font-normal tracking-tight"
            >
              Selected Rough Gemstones
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-sm text-[#A3A3A3] max-w-md font-light leading-relaxed md:text-right">
              Individual rough crystals documented with physical carat weight, dimensions, and natural crystal terminations.
            </p>
            {/* Transparent Demo Indicator (Phase 04 specification) */}
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#737373] tracking-wide">
              <Info className="w-3 h-3 text-[#B69B5E]" />
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
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#2A2A2A] bg-[#0D0D0D] text-xs uppercase tracking-[0.2em] text-[#F5F5F5] hover:border-[#B69B5E] hover:text-[#B69B5E] transition-all duration-200"
          >
            <span>View All Gemstone Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
