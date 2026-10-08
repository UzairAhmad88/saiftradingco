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
          "inline-flex items-center gap-3 cursor-pointer select-none text-sm text-[#F5F3EE] group",
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
              "w-5 h-5 border border-[#242424] bg-[#0C0C0C] rounded-[3px] transition-all duration-200 flex items-center justify-center",
              "group-hover:border-[#B6D94C]/60",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#B6D94C] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#050505]",
              "peer-checked:bg-[#B6D94C] peer-checked:border-[#B6D94C]",
              error && "border-[#B91C1C]"
            )}
          >
            <Check className="w-3.5 h-3.5 text-[#050505] opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        {label && <span className="group-hover:text-[#B6D94C] transition-colors">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";
