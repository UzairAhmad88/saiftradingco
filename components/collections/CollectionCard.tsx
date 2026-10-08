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
        "group relative flex flex-col justify-between p-6 sm:p-8 bg-[#0C0C0C] border border-[#242424] rounded-[4px] transition-all duration-300 shadow-xs",
        "hover:border-[#B6D94C]/60 hover:shadow-sm",
        className
      )}
    >
      <div>
        {/* Eyebrow Label */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#B6D94C] font-semibold mb-3">
          <span>{featured ? "Core Specialization" : "Mineral Collection"}</span>
          {typeof specimenCount === "number" && (
            <span className="text-[#A5A5A0] tracking-normal font-normal">
              {specimenCount} {specimenCount === 1 ? "specimen" : "specimens"}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F3EE] font-semibold group-hover:text-[#B6D94C] transition-colors mb-3">
          {title}
        </h3>

        {/* Editorial Description */}
        <p className="text-sm text-[#A5A5A0] font-normal leading-relaxed mb-6">
          {description}
        </p>

        {/* Specimen Preview Image Frame — Black Luxury Visual Frame */}
        {imageUrl ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#242424] rounded-[4px] bg-[#050505] mb-6">
            <Image
              src={imageUrl}
              alt={`${title} rough gemstone specimen collection`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full overflow-hidden border border-[#242424] rounded-[4px] bg-[#050505] mb-6 flex items-center justify-center text-[#777772]">
            <Sparkles className="w-6 h-6 text-[#B6D94C]" />
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
        <Link
          href={`/collections/${slug}`}
          className="text-xs uppercase tracking-[0.2em] text-[#F5F3EE] font-semibold group-hover:text-[#B6D94C] transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          aria-label={`Explore ${title} collection`}
        >
          <span>Explore Collection</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 text-[#B6D94C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
