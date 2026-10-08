import React from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "w-full p-4 text-sm font-sans bg-[#FAF9F5] text-[#050505] placeholder-[#777772]",
          "border border-[#D8D6CF] rounded-[2px] transition-all duration-200 resize-y",
          "hover:border-[#050505]/50",
          "focus:outline-none focus:border-[#050505] focus:ring-1 focus:ring-[#B6D94C]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F1EFE8]",
          error && "border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
