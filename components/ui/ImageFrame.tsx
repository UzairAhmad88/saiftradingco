import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export type ImageAspectRatio = "1/1" | "4/3" | "16/9" | "3/4" | "auto";
export type ImageFit = "cover" | "contain";

export interface ImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  fit?: ImageFit;
  priority?: boolean;
  sizes?: string;
  className?: string;
  zoomOnHover?: boolean;
  caption?: string;
}

export function ImageFrame({
  src,
  alt,
  aspectRatio = "4/3",
  fit = "cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
  zoomOnHover = true,
  caption,
}: ImageFrameProps) {
  const aspectClasses: Record<ImageAspectRatio, string> = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "3/4": "aspect-[3/4]",
    auto: "aspect-auto",
  };

  return (
    <figure className={cn("group overflow-hidden bg-[#101010] relative", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden border border-[#2A2A2A] bg-[#101010]",
          aspectClasses[aspectRatio]
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            fit === "contain" ? "object-contain p-4" : "object-cover",
            "transition-transform duration-500 ease-out",
            zoomOnHover && "group-hover:scale-[1.02]"
          )}
        />
        {/* Subtle dark vignette on top/bottom to blend seamlessly with dark canvas */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#2A2A2A]/40" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-[#737373] font-light italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
