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
        "animate-pulse bg-[#CFE7AA]/50 border border-[#D4DEC5]",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export function GemstoneCardSkeleton() {
  return (
    <div className="bg-[#F7F7F1] border border-[#D4DEC5] p-4 space-y-4 rounded-[4px]">
      <Skeleton className="w-full aspect-[4/3] bg-[#CFE7AA]" />
      <div className="space-y-2 pt-2">
        <Skeleton variant="text" className="w-1/3 h-3" />
        <Skeleton variant="text" className="w-3/4 h-5" />
        <Skeleton variant="text" className="w-1/2 h-3.5" />
      </div>
      <div className="pt-4 border-t border-[#D4DEC5] flex justify-between items-center">
        <Skeleton variant="text" className="w-20 h-4" />
        <Skeleton variant="text" className="w-16 h-4" />
      </div>
    </div>
  );
}
