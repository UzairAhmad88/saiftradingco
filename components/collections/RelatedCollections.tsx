import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getRelatedCollections } from "@/lib/data/collections-data";
import { ArrowUpRight } from "lucide-react";

export interface RelatedCollectionsProps {
  currentCategorySlug: string;
}

export function RelatedCollections({ currentCategorySlug }: RelatedCollectionsProps) {
  const related = getRelatedCollections(currentCategorySlug);
  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-collections-heading"
      className="border-t border-[#262626] bg-[#0A0A0A] py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="type-eyebrow text-[#9CCB63] block mb-2">
              Mineral Portfolio
            </span>
            <h2
              id="related-collections-heading"
              className="font-serif text-2xl sm:text-4xl text-[#F5F5F0] font-normal"
            >
              Explore Additional Mineral Varieties
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9A9A94] font-light max-w-md">
            Discover other rough crystalline gemstones supplied directly from our Hong Kong trade office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {related.map((col) => (
            <article
              key={col.slug}
              className="group p-6 sm:p-8 bg-[#111111] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/60 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#9CCB63]">
                  <span>Specialization</span>
                  <span className="text-[#9A9A94]">{col.mineralGroup}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] group-hover:text-[#B7D98B] transition-colors">
                  {col.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#9A9A94] font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#262626] rounded-[4px] bg-[#050505]">
                  <Image
                    src={col.heroImage}
                    alt={`Rough ${col.name} specimen`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A]">
                <Link
                  href={`/collections/${col.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F5F5F0] group-hover:text-[#9CCB63] transition-colors"
                >
                  <span>Explore {col.name} Collection</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
