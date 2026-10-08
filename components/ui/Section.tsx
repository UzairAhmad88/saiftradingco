import React from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "compact" | "default" | "spacious" | "none";
  surface?: "primary" | "secondary" | "surface";
  borderBottom?: boolean;
  borderTop?: boolean;
}

export function Section({
  children,
  className,
  spacing = "default",
  surface = "primary",
  borderBottom = false,
  borderTop = false,
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: "py-0",
    compact: "py-10 sm:py-14 md:py-16",
    default: "py-16 sm:py-24 md:py-28",
    spacious: "py-24 sm:py-32 md:py-36",
  };

  const surfaceClasses = {
    primary: "bg-[#050505]",
    secondary: "bg-[#101010]",
    surface: "bg-[#171717]",
  };

  return (
    <section
      className={cn(
        "w-full relative",
        spacingClasses[spacing],
        surfaceClasses[surface],
        borderBottom && "border-b border-[#2A2A2A]",
        borderTop && "border-t border-[#2A2A2A]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
