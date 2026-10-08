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
            "w-full h-11 pl-4 pr-10 text-sm font-sans bg-[#F7F7F1] text-[#050505]",
            "border border-[#D4DEC5] rounded-[4px] appearance-none transition-all duration-200 cursor-pointer",
            "hover:border-[#050505]/40",
            "focus:outline-none focus:border-[#050505] focus:ring-1 focus:ring-[#050505]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#EDEDE4]",
            error && "border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#294D2C] pointer-events-none"
          aria-hidden="true"
        />
      </div>
    );
  }
);
Select.displayName = "Select";
