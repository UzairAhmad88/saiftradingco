import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, error, checked, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-center gap-3 cursor-pointer select-none text-sm text-[#050505] group",
          props.disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            checked={checked}
            aria-invalid={error ? "true" : undefined}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 border border-[#D4DEC5] bg-[#F7F7F1] rounded-[3px] transition-all duration-200 flex items-center justify-center",
              "group-hover:border-[#050505]/40",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#050505] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#E5F1D2]",
              "peer-checked:bg-[#050505] peer-checked:border-[#050505]",
              error && "border-[#B91C1C]"
            )}
          >
            <Check className="w-3.5 h-3.5 text-[#B7D98B] opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        {label && <span className="group-hover:text-[#294D2C] transition-colors">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
