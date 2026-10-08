import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "full";
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  size = "default",
  as: Component = "div",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1440px]",
    full: "w-full",
  };

  return (
    <Component
      className={cn(
        "w-full mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
