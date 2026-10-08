import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EDITORIAL_STORY_CONTENT } from "@/lib/data/homepage-data";
import { ArrowRight } from "lucide-react";

export function EditorialFeature() {
  return (
    <section
      aria-labelledby="editorial-heading"
      className="border-b border-[#2A2A2A] bg-[#050505] py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Image Column (Dramatic high-contrast presentation) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full bg-[#080808] border border-[#2A2A2A] overflow-hidden group shadow-2xl">
              <Image
                src={EDITORIAL_STORY_CONTENT.image.src}
                alt={EDITORIAL_STORY_CONTENT.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Minimal Editorial Corner Marks */}
              <div
                className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#B69B5E]/50 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#B69B5E]/50 pointer-events-none"
                aria-hidden="true"
              />

              {/* Subtle Gradient Shadow */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Editorial Story Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="type-eyebrow text-[#B69B5E] block">
                {EDITORIAL_STORY_CONTENT.eyebrow}
              </span>

              <h2
                id="editorial-heading"
                className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F5] font-normal tracking-tight leading-[1.08]"
              >
                {EDITORIAL_STORY_CONTENT.title}
              </h2>
            </div>

            {/* Editorial Pull Quote */}
            <blockquote className="border-l-2 border-[#B69B5E] pl-6 py-1 italic font-serif text-lg sm:text-xl text-[#F5F5F5] leading-relaxed font-light">
              &ldquo;{EDITORIAL_STORY_CONTENT.quote}&rdquo;
            </blockquote>

            {/* Editorial Paragraphs */}
            <div className="space-y-5 text-sm sm:text-base text-[#A3A3A3] font-light leading-relaxed">
              <p>{EDITORIAL_STORY_CONTENT.paragraph1}</p>
              <p>{EDITORIAL_STORY_CONTENT.paragraph2}</p>
            </div>

            {/* Contextual Link */}
            <div className="pt-2">
              <Link
                href={EDITORIAL_STORY_CONTENT.ctaHref}
                className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-[#B69B5E] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>{EDITORIAL_STORY_CONTENT.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
