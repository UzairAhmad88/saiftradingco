import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SkipLinkProps {
  targetId?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SkipLink({
  targetId = "main-content",
  className,
  children = "Skip to main content",
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "px-5 py-2.5 bg-[#050505] text-[#B6D94C] text-xs uppercase tracking-[0.18em] font-medium rounded-[2px]",
        "border border-[#B6D94C] shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#B6D94C]",
        className
      )}
    >
      {children}
    </a>
  );
}
