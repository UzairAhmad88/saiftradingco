import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CollectionCardProps {
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  specimenCount?: number;
  featured?: boolean;
  className?: string;
}

export function CollectionCard({
  title,
  slug,
  description,
  imageUrl,
  specimenCount,
  featured = false,
  className,
}: CollectionCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between p-6 sm:p-8 bg-[#101010] border border-[#2A2A2A] transition-all duration-300",
        "hover:border-[#B69B5E]/50 hover:bg-[#141414]",
        className
      )}
    >
      <div>
        {/* Eyebrow Label */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#B69B5E] mb-3">
          <span>{featured ? "Core Specialization" : "Mineral Collection"}</span>
          {typeof specimenCount === "number" && (
            <span className="text-[#737373] tracking-normal">
              {specimenCount} {specimenCount === 1 ? "specimen" : "specimens"}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors mb-3">
          {title}
        </h3>

        {/* Editorial Description */}
        <p className="text-sm text-[#A3A3A3] font-light leading-relaxed mb-6">
          {description}
        </p>

        {/* Specimen Preview Image Frame */}
        {imageUrl ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#2A2A2A] bg-[#050505] mb-6">
            <Image
              src={imageUrl}
              alt={`${title} rough gemstone specimen collection`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full overflow-hidden border border-[#2A2A2A] bg-[#070707] mb-6 flex items-center justify-center text-[#737373]">
            <Sparkles className="w-6 h-6 text-[#B69B5E]/40" />
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#1D1D1D] flex items-center justify-between">
        <Link
          href={`/collections/${slug}`}
          className="text-xs uppercase tracking-[0.2em] text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
          aria-label={`Explore ${title} collection`}
        >
          <span>Explore Collection</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
