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
      "border-[#B6D94C]/40 bg-[#B6D94C]/10 text-[#B6D94C]",
    sold:
      "border-[#737373]/40 bg-[#171717] text-[#A3A3A3]",
    featured:
      "border-[#B69B5E]/50 bg-[#B69B5E]/10 text-[#B69B5E]",
    new:
      "border-[#F5F5F5]/30 bg-[#171717] text-[#F5F5F5]",
    certified:
      "border-[#B69B5E]/40 bg-[#101010] text-[#F5F5F5]",
    default:
      "border-[#2A2A2A] bg-[#101010] text-[#A3A3A3]",
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
        return <CircleOff className="w-2.5 h-2.5 text-[#737373] shrink-0" aria-hidden="true" />;
      case "featured":
        return <Sparkles className="w-2.5 h-2.5 text-[#B69B5E] shrink-0" aria-hidden="true" />;
      case "certified":
        return <ShieldCheck className="w-2.5 h-2.5 text-[#B69B5E] shrink-0" aria-hidden="true" />;
      case "new":
        return <Check className="w-2.5 h-2.5 text-[#F5F5F5] shrink-0" aria-hidden="true" />;
      default:
        return <Circle className="w-2 h-2 text-[#737373] shrink-0 fill-current" aria-hidden="true" />;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center uppercase tracking-[0.2em] font-sans font-medium border select-none transition-colors duration-200",
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
