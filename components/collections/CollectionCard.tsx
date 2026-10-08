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
        "group relative flex flex-col justify-between p-6 sm:p-8 bg-[#0A0A0A] border border-[#262626] rounded-[4px] transition-all duration-300",
        "hover:border-[#9CCB63]/60 hover:bg-[#111111]",
        className
      )}
    >
      <div>
        {/* Eyebrow Label */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#9CCB63] mb-3">
          <span>{featured ? "Core Specialization" : "Mineral Collection"}</span>
          {typeof specimenCount === "number" && (
            <span className="text-[#9A9A94] tracking-normal">
              {specimenCount} {specimenCount === 1 ? "specimen" : "specimens"}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] group-hover:text-[#B7D98B] transition-colors mb-3">
          {title}
        </h3>

        {/* Editorial Description */}
        <p className="text-sm text-[#9A9A94] font-light leading-relaxed mb-6">
          {description}
        </p>

        {/* Specimen Preview Image Frame */}
        {imageUrl ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#262626] rounded-[4px] bg-[#050505] mb-6">
            <Image
              src={imageUrl}
              alt={`${title} rough gemstone specimen collection`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full overflow-hidden border border-[#262626] rounded-[4px] bg-[#070707] mb-6 flex items-center justify-center text-[#9A9A94]">
            <Sparkles className="w-6 h-6 text-[#9CCB63]/40" />
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#1A1A1A] flex items-center justify-between">
        <Link
          href={`/collections/${slug}`}
          className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] group-hover:text-[#9CCB63] transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
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
