import React from "react";
import Link from "next/link";
import { getRelatedEducation } from "@/lib/data/collections-data";
import { ArrowUpRight, BookOpen } from "lucide-react";

export interface RelatedEducationProps {
  categorySlug: string;
}

export function RelatedEducation({ categorySlug }: RelatedEducationProps) {
  const guides = getRelatedEducation(categorySlug);
  if (guides.length === 0) return null;

  return (
    <section
      aria-labelledby="related-education-heading"
      className="border-t border-[#2A2A2A] bg-[#050505] py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="type-eyebrow text-[#B69B5E] block mb-2">
              Mineral Knowledge
            </span>
            <h2
              id="related-education-heading"
              className="font-serif text-2xl sm:text-4xl text-[#F5F5F5] font-normal"
            >
              Related Technical &amp; Identification Guides
            </h2>
          </div>
          <Link
            href="/education"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#B69B5E] hover:text-[#F5F5F5] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#B69B5E]" />
            <span>Browse Full Education Archive →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="p-6 sm:p-8 bg-[#090909] border border-[#222] hover:border-[#B69B5E]/50 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#737373] block">
                  {guide.readingTime}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F5] font-normal hover:text-[#B69B5E] transition-colors leading-snug">
                  <Link href={`/education/${guide.slug}`}>{guide.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1C1C]">
                <Link
                  href={`/education/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#F5F5F5] hover:text-[#B69B5E] transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
