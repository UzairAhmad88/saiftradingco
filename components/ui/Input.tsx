import React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "w-full h-11 px-4 text-sm font-sans bg-[#FAF9F5] text-[#050505] placeholder-[#777772]",
          "border border-[#D8D6CF] rounded-[2px] transition-all duration-200",
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
Input.displayName = "Input";
