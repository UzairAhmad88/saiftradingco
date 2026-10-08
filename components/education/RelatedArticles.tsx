import React from "react";
import type { EducationArticle } from "@/lib/data/education-data";
import { EducationCard } from "@/components/education/EducationCard";

export interface RelatedArticlesProps {
  articles: EducationArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="space-y-8"
    >
      <div className="space-y-1 pb-4 border-b border-[#1F1F1F]">
        <span className="type-eyebrow text-[#B69B5E] block">
          Further Reading
        </span>
        <h2
          id="related-articles-heading"
          className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal"
        >
          Related Mineral &amp; Identification Guides
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((art) => (
          <EducationCard key={art.slug} article={art} />
        ))}
      </div>
    </section>
  );
}
