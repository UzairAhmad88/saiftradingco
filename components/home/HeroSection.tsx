import React from "react";
import { LinkButton } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/lib/data/homepage-data";
import { Tourmaline360Viewer } from "@/components/home/Tourmaline360Viewer";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center border-b border-[#D4DEC5] bg-[#E5F1D2] overflow-hidden"
    >
      {/* Background Subtle Depth & Texture */}
      <div
        className="absolute inset-0 bg-radial from-[#CFE7AA]/50 via-[#E5F1D2] to-[#E5F1D2] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#294D2C08_1px,transparent_1px),linear-gradient(to_bottom,#294D2C08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Editorial Content Column — 65% Light Green Environment with 23% Black Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 animate-fade-in">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 border border-[#294D2C]/30 bg-[#CFE7AA] text-[#294D2C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[4px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#294D2C]" aria-hidden="true" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            {/* Primary H1 Heading in Black Contrast */}
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="font-serif text-4xl sm:text-6xl md:text-7xl xl:text-[5rem] font-normal text-[#050505] tracking-tight leading-[1.05] text-balance font-semibold"
              >
                Selected Rough{" "}
                <span className="italic font-light text-[#294D2C]">
                  Tourmaline
                </span>
                , Kunzite &amp; Morganite
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-[#050505]/85 font-normal leading-relaxed max-w-2xl text-pretty">
              {HERO_CONTENT.subheadline}
            </p>

            {/* Mineral Specialization Indicators */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#777A70] pt-1">
              <span className="text-[#050505] font-semibold">Tourmaline</span>
              <span className="text-[#D4DEC5]" aria-hidden="true">/</span>
              <span className="text-[#050505] font-semibold">Kunzite</span>
              <span className="text-[#D4DEC5]" aria-hidden="true">/</span>
              <span className="text-[#050505] font-semibold">Morganite</span>
              <span className="text-[#D4DEC5]" aria-hidden="true">·</span>
              <span className="text-[#294D2C] font-medium">Hong Kong Trade Office</span>
            </div>

            {/* Call to Action Buttons: Black Primary + Black Outline Secondary */}
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
