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
          "w-full p-4 text-sm font-sans bg-[#111111] text-[#F5F5F0] placeholder-[#737373]",
          "border border-[#262626] rounded-[4px] transition-all duration-200 resize-y",
          "hover:border-[#363636]",
          "focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#171717]",
          error && "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
