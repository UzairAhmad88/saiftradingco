import React from "react";
import Link from "next/link";
import { INTRO_CONTENT } from "@/lib/data/homepage-data";
import { MapPin, ArrowRight } from "lucide-react";

export function IntroSection() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="border-b border-[#2A2A2A] bg-[#080808] py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Large Editorial Headline */}
          <div className="lg:col-span-6 space-y-6">
            <span className="type-eyebrow text-[#B69B5E] block">
              {INTRO_CONTENT.eyebrow}
            </span>

            <h2
              id="intro-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F5] font-normal leading-[1.12] tracking-tight"
            >
              {INTRO_CONTENT.headline}
            </h2>

            {/* Verified Location Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#2A2A2A] bg-[#0E0E0E] text-[#A3A3A3] text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#B69B5E] shrink-0" />
                <span>{INTRO_CONTENT.locationBadge}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Body & Company Link */}
          <div className="lg:col-span-6 space-y-6 lg:pt-8 text-sm sm:text-base text-[#A3A3A3] font-light leading-relaxed">
            <p className="text-[#E5E5E5] text-base sm:text-lg font-normal leading-relaxed">
              {INTRO_CONTENT.leadParagraph}
            </p>

            <p>{INTRO_CONTENT.bodyParagraph}</p>

            <div className="pt-4 border-t border-[#1F1F1F]">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B69B5E] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>Read About Our Company & Verification Standards</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
