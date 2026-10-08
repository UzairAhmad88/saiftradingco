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
          "w-full h-11 px-4 text-sm font-sans bg-[#101010] text-[#F5F5F5] placeholder-[#737373]",
          "border border-[#2A2A2A] rounded-none transition-all duration-200",
          "hover:border-[#3A3A3A]",
          "focus:outline-none focus:border-[#B69B5E] focus:ring-1 focus:ring-[#B69B5E]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#171717]",
          error && "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
