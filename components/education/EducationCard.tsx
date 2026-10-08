import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { EducationArticle } from "@/lib/data/education-data";
import { cn } from "@/lib/utils/cn";

export interface EducationCardProps {
  article: EducationArticle;
  featured?: boolean;
  className?: string;
}

export function EducationCard({
  article,
  featured = false,
  className,
}: EducationCardProps) {
  if (featured) {
    return (
      <article
        className={cn(
          "group relative flex flex-col lg:flex-row bg-[#0A0A0A] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/60 transition-all duration-300 overflow-hidden",
          className
        )}
      >
        {/* Featured Image Frame */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[300px] lg:w-1/2 overflow-hidden bg-[#080808] border-b lg:border-b-0 lg:border-r border-[#262626]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Featured Content Body */}
        <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
              <span className="text-[#9CCB63] px-2.5 py-1 border border-[#9CCB63]/30 bg-[#111111] rounded-[2px]">
                Featured Guide
              </span>
              <span className="text-[#9A9A94]">{article.readingTime}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F0] group-hover:text-[#B7D98B] transition-colors leading-tight">
              <Link href={`/education/${article.slug}`}>
                {article.title}
              </Link>
            </h3>

            <p className="text-sm text-[#9A9A94] font-light leading-relaxed">
              {article.shortDescription}
            </p>
          </div>

          <div className="pt-6 border-t border-[#1A1A1A]">
            <Link
              href={`/education/${article.slug}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9CCB63] hover:text-[#B7D98B] transition-colors"
            >
              <span>Read Full Guide</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group p-6 sm:p-8 bg-[#0A0A0A] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/60 hover:bg-[#111111] transition-all duration-300 flex flex-col justify-between space-y-6",
        className
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
          <span className="text-[#9CCB63] px-2.5 py-0.5 border border-[#9CCB63]/30 bg-[#111111] rounded-[2px]">
            {article.category}
          </span>
          <span className="text-[#9A9A94]">{article.readingTime}</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0] group-hover:text-[#B7D98B] transition-colors leading-snug">
          <Link href={`/education/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-[#9A9A94] font-light leading-relaxed">
          {article.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-[#1A1A1A]">
        <Link
          href={`/education/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#F5F5F0] group-hover:text-[#9CCB63] transition-colors"
        >
          <span>Read Guide</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
