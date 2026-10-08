import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangle" | "text" | "circle";
}

export function Skeleton({
  className,
  variant = "rectangle",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rectangle: "rounded-none",
    text: "h-4 w-full rounded-none",
    circle: "rounded-full aspect-square",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-[#1A1A1A] border border-[#242424]",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export function GemstoneCardSkeleton() {
  return (
    <div className="bg-[#0C0C0C] border border-[#242424] p-4 space-y-4 rounded-[4px]">
      <Skeleton className="w-full aspect-[4/3] bg-[#141414]" />
      <div className="space-y-2 pt-2">
        <Skeleton variant="text" className="w-1/3 h-3 bg-[#1A1A1A]" />
        <Skeleton variant="text" className="w-3/4 h-5 bg-[#1A1A1A]" />
        <Skeleton variant="text" className="w-1/2 h-3.5 bg-[#1A1A1A]" />
      </div>
      <div className="pt-4 border-t border-[#242424] flex justify-between items-center">
        <Skeleton variant="text" className="w-20 h-4 bg-[#1A1A1A]" />
        <Skeleton variant="text" className="w-16 h-4 bg-[#1A1A1A]" />
      </div>
    </div>
  );
}
