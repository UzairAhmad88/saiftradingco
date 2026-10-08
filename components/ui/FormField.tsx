import React from "react";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils/cn";

export interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  required,
  helperText,
  errorMessage,
  children,
  className,
}: FormFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = errorMessage ? `${id}-error` : undefined;

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">{children}</div>
      {errorMessage ? (
        <p id={errorId} role="alert" className="text-xs text-[#DC2626] font-medium pt-0.5">
          {errorMessage}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-[#737373] pt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
