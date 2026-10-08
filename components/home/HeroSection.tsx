import React from "react";
import { LinkButton } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/lib/data/homepage-data";
import { Tourmaline360Viewer } from "@/components/home/Tourmaline360Viewer";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center border-b border-[#242424] bg-[#050505] overflow-hidden"
    >
      {/* Background Subtle Depth & Texture */}
      <div
        className="absolute inset-0 bg-radial from-[#121212]/80 via-[#050505] to-[#050505] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#B6D94C05_1px,transparent_1px),linear-gradient(to_bottom,#B6D94C05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          {/* Editorial Content Column — 50% Dry Black Foundation with Off-White & Green Accent */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 md:space-y-8 animate-fade-in">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 border border-[#B6D94C]/30 bg-[#B6D94C]/10 text-[#B6D94C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[4px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B6D94C]" aria-hidden="true" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            {/* Primary H1 Heading in Off-White Editorial Display */}
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] 2xl:text-[5.25rem] font-semibold text-[#F5F3EE] tracking-tight leading-[1.05] text-balance"
              >
                Selected Rough{" "}
                <span className="italic font-light text-[#B6D94C]">
                  Tourmaline
                </span>
                , Kunzite &amp; Morganite
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-[#A5A5A0] font-normal leading-relaxed max-w-2xl text-pretty font-light">
              {HERO_CONTENT.subheadline}
            </p>

            {/* Mineral Specialization Indicators */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#777772] pt-1">
              <span className="text-[#F5F3EE] font-medium">Tourmaline</span>
              <span className="text-[#242424]" aria-hidden="true">/</span>
              <span className="text-[#F5F3EE] font-medium">Kunzite</span>
              <span className="text-[#242424]" aria-hidden="true">/</span>
              <span className="text-[#F5F3EE] font-medium">Morganite</span>
              <span className="text-[#242424]" aria-hidden="true">·</span>
              <span className="text-[#B6D94C] font-mono">Hong Kong Trade Office</span>
            </div>

            {/* Call to Action Buttons: Botanical Green Primary + Refined Border Secondary */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <LinkButton
                href={HERO_CONTENT.primaryCta.href}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-sm"
              >
                {HERO_CONTENT.primaryCta.label}
              </LinkButton>
              <LinkButton
                href={HERO_CONTENT.secondaryCta.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {HERO_CONTENT.secondaryCta.label}
              </LinkButton>
            </div>
          </div>

          {/* Focal Gemstone Imagery Column — Clean Black Visual Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Tourmaline360Viewer />
          </div>
        </div>
      </div>
    </section>
  );
}
