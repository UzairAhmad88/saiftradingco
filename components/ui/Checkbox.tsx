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
          "inline-flex items-center gap-3 cursor-pointer select-none text-sm text-[#A3A3A3] group",
          props.disabled && "opacity-40 cursor-not-allowed",
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
              "w-5 h-5 border border-[#2A2A2A] bg-[#101010] transition-all duration-200 flex items-center justify-center",
              "group-hover:border-[#3A3A3A]",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#B69B5E] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#050505]",
              "peer-checked:bg-[#B69B5E] peer-checked:border-[#B69B5E]",
              error && "border-[#DC2626]"
            )}
          >
            <Check className="w-3.5 h-3.5 text-[#050505] opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        {label && <span className="group-hover:text-[#F5F5F5] transition-colors">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
