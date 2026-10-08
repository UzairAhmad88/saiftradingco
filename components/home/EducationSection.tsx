import React from "react";
import Link from "next/link";
import { EDUCATION_ARTICLES_DATA } from "@/lib/data/homepage-data";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function EducationSection() {
  return (
    <section
      aria-labelledby="education-heading"
      className="border-b border-[#E2DFD7] bg-[#F5F3EE] py-20 sm:py-28"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#8AA838] block font-bold">
              Mineral Knowledge
            </span>
            <h2
              id="education-heading"
              className="font-serif text-3xl sm:text-5xl text-[#050505] font-semibold tracking-tight"
            >
              Understand the Stones Before You Select Them
            </h2>
          </div>
          <p className="text-sm text-[#777772] max-w-md font-normal leading-relaxed font-light">
            Essential reference notes on crystal formation, cleavage planes, and optical behavior in rough Tourmaline, Kunzite, and Morganite.
          </p>
        </div>

        {/* Education Preview Grid — Off-White Breathing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EDUCATION_ARTICLES_DATA.map((article) => (
            <article
              key={article.slug}
              className="group p-8 bg-[#FAF9F5] border border-[#E2DFD7] flex flex-col justify-between space-y-6 hover:border-[#050505]/40 transition-all duration-300 rounded-[4px] shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-mono">
                  <span className="text-[#050505] px-2.5 py-0.5 border border-[#E2DFD7] bg-[#F1EFE8] rounded-[2px] font-semibold">
                    {article.category}
                  </span>
                  <span className="text-[#777772]">{article.readingTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#050505] font-semibold group-hover:text-[#8AA838] transition-colors leading-snug">
                  <Link href={`/education/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#777772] font-normal leading-relaxed font-light">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[#E2DFD7]">
                <Link
                  href={`/education/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#050505] font-bold group-hover:text-[#8AA838] transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#050505] group-hover:text-[#8AA838] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Guides Link */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/education"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#050505] font-bold hover:text-[#8AA838] transition-colors group"
          >
            <BookOpen className="w-4 h-4 text-[#8AA838]" />
            <span>Browse Full Mineral Education Archive</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
