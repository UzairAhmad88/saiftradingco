import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "split";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: HeadingTag = "h2",
  className,
}: SectionHeadingProps) {
  if (align === "split") {
    return (
      <div
        className={cn(
          "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16",
          className
        )}
      >
        <div className="space-y-3 max-w-2xl">
          {eyebrow && (
            <span className="type-eyebrow text-[#294D2C] font-semibold tracking-[0.25em] block">
              {eyebrow}
            </span>
          )}
          <HeadingTag className="type-heading-l text-[#050505] tracking-tight">
            {title}
          </HeadingTag>
        </div>
        {description && (
          <p className="type-small text-[#777A70] max-w-md font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }

  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "space-y-4 mb-12 sm:mb-16",
        isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <span className="type-eyebrow text-[#294D2C] font-semibold tracking-[0.25em] block">
          {eyebrow}
        </span>
      )}
      <HeadingTag className="type-heading-l text-[#050505] tracking-tight">
        {title}
      </HeadingTag>
      {description && (
        <p className="type-body text-[#777A70] font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
