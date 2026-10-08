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
      "border-[#9CCB63]/40 bg-[#9CCB63]/10 text-[#9CCB63]",
    sold:
      "border-[#262626] bg-[#111111] text-[#9A9A94]",
    featured:
      "border-[#B7D98B]/50 bg-[#B7D98B]/10 text-[#B7D98B]",
    new:
      "border-[#F5F5F0]/30 bg-[#111111] text-[#F5F5F0]",
    certified:
      "border-[#9CCB63]/40 bg-[#111111] text-[#F5F5F0]",
    default:
      "border-[#262626] bg-[#111111] text-[#9A9A94]",
  };

  const sizeStyles = {
    sm: "text-[10px] py-1 px-2.5 gap-1.5",
    md: "text-xs py-1.5 px-3.5 gap-2",
  };

  const renderIcon = () => {
    switch (variant) {
      case "available":
        return <Check className="w-2.5 h-2.5 text-[#9CCB63] shrink-0" aria-hidden="true" />;
      case "sold":
        return <CircleOff className="w-2.5 h-2.5 text-[#9A9A94] shrink-0" aria-hidden="true" />;
      case "featured":
        return <Sparkles className="w-2.5 h-2.5 text-[#B7D98B] shrink-0" aria-hidden="true" />;
      case "certified":
        return <ShieldCheck className="w-2.5 h-2.5 text-[#9CCB63] shrink-0" aria-hidden="true" />;
      case "new":
        return <Check className="w-2.5 h-2.5 text-[#F5F5F0] shrink-0" aria-hidden="true" />;
      default:
        return <Circle className="w-2 h-2 text-[#9A9A94] shrink-0 fill-current" aria-hidden="true" />;
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
