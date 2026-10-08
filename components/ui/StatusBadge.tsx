import React from "react";
import { Check, Sparkles, ShieldCheck, CircleOff, Circle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type BadgeVariant = "available" | "sold" | "featured" | "new" | "certified" | "default";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export function StatusBadge({
  children,
  className,
  variant = "default",
  size = "sm",
  ...props
}: StatusBadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    available:
      "border-[#B6D94C]/40 bg-[#B6D94C]/15 text-[#B6D94C] font-semibold",
    sold:
      "border-[#242424] bg-[#121212] text-[#777772]",
    featured:
      "border-[#B6D94C]/50 bg-[#050505] text-[#B6D94C] font-semibold shadow-xs",
    new:
      "border-[#B6D94C] bg-[#B6D94C] text-[#050505] font-semibold",
    certified:
      "border-[#242424] bg-[#0C0C0C] text-[#F5F3EE] font-medium",
    default:
      "border-[#242424] bg-[#121212] text-[#A5A5A0]",
  };

  const sizeStyles = {
    sm: "text-[10px] py-1 px-2.5 gap-1.5",
    md: "text-xs py-1.5 px-3.5 gap-2",
  };

  const renderIcon = () => {
    switch (variant) {
      case "available":
        return <Check className="w-2.5 h-2.5 text-[#B6D94C] shrink-0" aria-hidden="true" />;
      case "sold":
        return <CircleOff className="w-2.5 h-2.5 text-[#777772] shrink-0" aria-hidden="true" />;
      case "featured":
        return <Sparkles className="w-2.5 h-2.5 text-[#B6D94C] shrink-0" aria-hidden="true" />;
      case "certified":
        return <ShieldCheck className="w-2.5 h-2.5 text-[#B6D94C] shrink-0" aria-hidden="true" />;
      case "new":
        return <Check className="w-2.5 h-2.5 text-[#050505] shrink-0" aria-hidden="true" />;
      default:
        return <Circle className="w-2 h-2 text-[#777772] shrink-0 fill-current" aria-hidden="true" />;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center uppercase tracking-[0.2em] font-sans font-medium border select-none transition-colors duration-200 rounded-[3px]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {renderIcon()}
      <span>{children}</span>
    </span>
  );
}
