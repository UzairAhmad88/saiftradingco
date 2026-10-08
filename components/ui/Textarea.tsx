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
          "w-full p-4 text-sm font-sans bg-[#F7F7F1] text-[#050505] placeholder-[#777A70]",
          "border border-[#D4DEC5] rounded-[4px] transition-all duration-200 resize-y",
          "hover:border-[#050505]/40",
          "focus:outline-none focus:border-[#050505] focus:ring-1 focus:ring-[#050505]",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#EDEDE4]",
          error && "border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
