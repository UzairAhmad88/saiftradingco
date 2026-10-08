import React from "react";
import { cn } from "@/lib/utils/cn";

export interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "compact" | "default" | "spacious";
}

export function PageWrapper({
  children,
  className,
  spacing = "default",
  ...props
}: PageWrapperProps) {
  const spacingClasses = {
    none: "",
    compact: "py-8 sm:py-12",
    default: "py-12 sm:py-16 md:py-20",
    spacious: "py-16 sm:py-24 md:py-32",
  };

  return (
    <div
      className={cn("w-full flex-1 flex flex-col", spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </div>
  );
}
