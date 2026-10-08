import React from "react";
import Link from "next/link";
import { EDUCATION_ARTICLES_DATA } from "@/lib/data/homepage-data";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function EducationSection() {
  return (
    <section
      aria-labelledby="education-heading"
      className="border-b border-[#262626] bg-[#050505] py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#9CCB63] block">
              Mineral Knowledge
            </span>
            <h2
              id="education-heading"
              className="font-serif text-3xl sm:text-5xl text-[#F5F5F0] font-normal tracking-tight"
            >
              Understand the Stones Before You Select Them
            </h2>
          </div>
          <p className="text-sm text-[#9A9A94] max-w-md font-light leading-relaxed">
            Essential reference notes on crystal formation, cleavage planes, and optical behavior in rough Tourmaline, Kunzite, and Morganite.
          </p>
        </div>

        {/* Education Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION_ARTICLES_DATA.map((article) => (
            <article
              key={article.slug}
              className="group p-8 bg-[#0A0A0A] border border-[#262626] flex flex-col justify-between space-y-6 hover:border-[#9CCB63]/60 hover:bg-[#111111] transition-all duration-300 rounded-[4px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-[#9CCB63] px-2.5 py-0.5 border border-[#9CCB63]/30 bg-[#111111] rounded-[2px]">
                    {article.category}
                  </span>
                  <span className="text-[#9A9A94]">{article.readingTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0] font-normal group-hover:text-[#B7D98B] transition-colors leading-snug">
                  <Link href={`/education/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#9A9A94] font-light leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[#1A1A1A]">
                <Link
                  href={`/education/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#F5F5F0] group-hover:text-[#9CCB63] transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Guides Link */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            href="/education"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9CCB63] hover:text-[#B7D98B] transition-colors group"
          >
            <BookOpen className="w-4 h-4 text-[#9CCB63]" />
            <span>Browse Full Mineral Education Archive</span>
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
