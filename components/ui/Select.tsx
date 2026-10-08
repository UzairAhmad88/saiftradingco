import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "w-full h-11 pl-4 pr-10 text-sm font-sans bg-[#101010] text-[#F5F5F5]",
            "border border-[#2A2A2A] rounded-none appearance-none transition-all duration-200 cursor-pointer",
            "hover:border-[#3A3A3A]",
            "focus:outline-none focus:border-[#B69B5E] focus:ring-1 focus:ring-[#B69B5E]",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#171717]",
            error && "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none"
          aria-hidden="true"
        />
      </div>
    );
  }
);
Select.displayName = "Select";
