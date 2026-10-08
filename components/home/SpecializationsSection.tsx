import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SPECIALIZATIONS_DATA } from "@/lib/data/homepage-data";
import { ArrowUpRight } from "lucide-react";

export function SpecializationsSection() {
  return (
    <section
      aria-labelledby="specializations-heading"
      className="border-b border-[#262626] bg-[#050505] py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#9CCB63] block">
              Mineral Specializations
            </span>
            <h2
              id="specializations-heading"
              className="font-serif text-3xl sm:text-5xl text-[#F5F5F0] font-normal tracking-tight"
            >
              Three Primary Crystal Families
            </h2>
          </div>
          <p className="text-sm text-[#9A9A94] max-w-md font-light leading-relaxed">
            Focused procurement and dedicated trade in rough crystalline specimens. Each variety selected for distinct morphological habit and optical quality.
          </p>
        </div>

        {/* Editorial Collection Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SPECIALIZATIONS_DATA.map((item) => (
            <article
              key={item.slug}
              className="group relative flex flex-col bg-[#0A0A0A] border border-[#262626] rounded-[4px] transition-all duration-300 hover:border-[#9CCB63]/60 hover:bg-[#111111] overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden bg-[#070707] border-b border-[#262626]">
                <Image
                  src={item.imageUrl}
                  alt={`Natural rough ${item.name} crystal specimen`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Overlay: Editorial Number & Mineral Group */}
                <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-between z-10 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent">
                  <span className="font-serif text-2xl font-light text-[#9CCB63]">
                    {item.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 border border-[#262626] bg-[#050505]/80 text-[#9A9A94] rounded-[2px] backdrop-blur-sm">
                    {item.mineralGroup}
                  </span>
                </div>

                {/* Subtle Bottom Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Panel Details & Typography */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] font-normal group-hover:text-[#9CCB63] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9A9A94] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Characteristics Badges */}
                <div className="space-y-4 pt-4 border-t border-[#1A1A1A]">
                  <div className="flex flex-wrap gap-1.5">
                    {item.characteristics.map((char) => (
                      <span
                        key={char}
                        className="text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 bg-[#111111] text-[#9A9A94] border border-[#262626] rounded-[2px]"
                      >
                        {char}
                      </span>
                    ))}
                  </div>

                  {/* Contextual Link */}
                  <div>
                    <Link
                      href={`/collections/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#9CCB63] hover:text-[#B7D98B] transition-colors"
                    >
                      <span>Explore {item.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
