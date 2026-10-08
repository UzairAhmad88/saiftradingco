import React from "react";
import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { HERO_CONTENT } from "@/lib/data/homepage-data";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center border-b border-[#2A2A2A] bg-[#050505] overflow-hidden"
    >
      {/* Background Subtle Gradient & Grid Texture */}
      <div
        className="absolute inset-0 bg-radial from-[#151515]/60 via-[#050505] to-[#050505] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1F1F1F08_1px,transparent_1px),linear-gradient(to_bottom,#1F1F1F08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Editorial Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 animate-fade-in">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 border border-[#9CCB63]/30 bg-[#0E0E0E] text-[#9CCB63] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9CCB63]" aria-hidden="true" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            {/* Primary H1 Heading */}
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="font-serif text-4xl sm:text-6xl md:text-7xl xl:text-[5rem] font-normal text-[#F5F5F0] tracking-tight leading-[1.06] text-balance"
              >
                Selected Rough{" "}
                <span className="italic font-light text-[#9CCB63]">
                  Tourmaline
                </span>
                , Kunzite &amp; Morganite
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-lg text-[#9A9A94] font-light leading-relaxed max-w-2xl text-pretty">
              {HERO_CONTENT.subheadline}
            </p>

            {/* Mineral Specialization Indicators */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#9A9A94] pt-1">
              <span className="text-[#F5F5F0] font-medium">Tourmaline</span>
              <span className="text-[#3A3A3A]" aria-hidden="true">/</span>
              <span className="text-[#F5F5F0] font-medium">Kunzite</span>
              <span className="text-[#3A3A3A]" aria-hidden="true">/</span>
              <span className="text-[#F5F5F0] font-medium">Morganite</span>
              <span className="text-[#3A3A3A]" aria-hidden="true">·</span>
              <span>Hong Kong Trade Office</span>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <LinkButton
                href={HERO_CONTENT.primaryCta.href}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
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

          {/* Focal Gemstone Imagery Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-[#0A0A0A] border border-[#262626] rounded-[4px] overflow-hidden group shadow-2xl">
              {/* Corner Fine Borders */}
              <div
                className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#9CCB63]/40 z-20 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#9CCB63]/40 z-20 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#9CCB63]/40 z-20 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#9CCB63]/40 z-20 pointer-events-none"
                aria-hidden="true"
              />

              {/* High-Resolution Hero Gemstone Image */}
              <Image
                src={HERO_CONTENT.image.src}
                alt={HERO_CONTENT.image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Gradient Overlay for Depth */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none"
                aria-hidden="true"
              />

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 space-y-1">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#9CCB63]">
                  <span>Featured Specimen</span>
                  <span>Hong Kong Catalog</span>
                </div>
                <p className="font-serif text-lg sm:text-xl text-[#F5F5F0] font-normal">
                  Natural Green Elbaite Tourmaline
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-[#9A9A94] font-light">
                  <span>Fine Striations &amp; Terminations</span>
                  <span className="text-[#9CCB63] inline-flex items-center gap-0.5">
                    View <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
