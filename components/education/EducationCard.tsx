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
          "group relative flex flex-col lg:flex-row bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#B69B5E]/50 transition-all duration-300 overflow-hidden",
          className
        )}
      >
        {/* Featured Image Frame */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[300px] lg:w-1/2 overflow-hidden bg-[#070707] border-b lg:border-b-0 lg:border-r border-[#2A2A2A]">
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
              <span className="text-[#B69B5E] px-2.5 py-1 border border-[#B69B5E]/30 bg-[#121212]">
                Featured Guide
              </span>
              <span className="text-[#737373]">{article.readingTime}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors leading-tight">
              <Link href={`/education/${article.slug}`}>
                {article.title}
              </Link>
            </h3>

            <p className="text-sm text-[#A3A3A3] font-light leading-relaxed">
              {article.shortDescription}
            </p>
          </div>

          <div className="pt-6 border-t border-[#1C1C1C]">
            <Link
              href={`/education/${article.slug}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B69B5E] group-hover:text-[#F5F5F5] transition-colors"
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
        "group p-6 sm:p-8 bg-[#090909] border border-[#222] hover:border-[#B69B5E]/50 hover:bg-[#0D0D0D] transition-all duration-300 flex flex-col justify-between space-y-6",
        className
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
          <span className="text-[#B69B5E] px-2 py-0.5 border border-[#B69B5E]/20 bg-[#121212]">
            {article.category}
          </span>
          <span className="text-[#737373]">{article.readingTime}</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors leading-snug">
          <Link href={`/education/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
          {article.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-[#1C1C1C]">
        <Link
          href={`/education/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors"
        >
          <span>Read Guide</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
