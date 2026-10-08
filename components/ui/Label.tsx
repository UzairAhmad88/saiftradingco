import React from "react";
import { cn } from "@/lib/utils/cn";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "block text-xs uppercase tracking-[0.18em] font-medium text-[#050505] select-none mb-2",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[#294D2C] ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
