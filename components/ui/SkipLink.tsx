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
        "px-5 py-2.5 bg-[#111111] text-[#F5F5F0] text-xs uppercase tracking-[0.18em] font-medium rounded-[4px]",
        "border border-[#9CCB63] shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#9CCB63]",
        className
      )}
    >
      {children}
    </a>
  );
}
