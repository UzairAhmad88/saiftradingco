import React from "react";
import Link from "next/link";
import { INTRO_CONTENT } from "@/lib/data/homepage-data";
import { MapPin, ArrowRight } from "lucide-react";

export function IntroSection() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="border-b border-[#E2DFD7] bg-[#F1EFE8] py-20 sm:py-28"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Large Editorial Headline */}
          <div className="lg:col-span-6 space-y-6">
            <span className="type-eyebrow text-[#8AA838] block font-bold">
              {INTRO_CONTENT.eyebrow}
            </span>

            <h2
              id="intro-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#050505] font-semibold leading-[1.12] tracking-tight"
            >
              {INTRO_CONTENT.headline}
            </h2>

            {/* Verified Location Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#E2DFD7] bg-[#FAF9F5] text-[#050505] text-xs rounded-[4px] font-medium font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#8AA838] shrink-0" />
                <span>{INTRO_CONTENT.locationBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Body & Company Link */}
          <div className="lg:col-span-6 space-y-6 lg:pt-8 text-sm sm:text-base text-[#777772] font-normal leading-relaxed">
            <p className="text-[#050505] text-base sm:text-lg font-medium leading-relaxed font-serif">
              {INTRO_CONTENT.leadParagraph}
            </p>

            <p className="font-light">{INTRO_CONTENT.bodyParagraph}</p>

            <div className="pt-4 border-t border-[#E2DFD7]">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#050505] font-bold hover:text-[#8AA838] transition-colors group"
              >
                <span>Read About Our Company &amp; Verification Standards</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#050505] group-hover:text-[#8AA838] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
