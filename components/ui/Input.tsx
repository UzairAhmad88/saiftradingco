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
          "w-full h-11 px-4 text-sm font-sans bg-[#111111] text-[#F5F5F0] placeholder-[#737373]",
          "border border-[#262626] rounded-[4px] transition-all duration-200",
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
Input.displayName = "Input";
