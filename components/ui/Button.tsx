import React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "luxury" | "ghost" | "text" | "icon";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseButtonProps {}

export interface LinkButtonProps extends LinkProps, BaseButtonProps {
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function getButtonClasses({
  variant = "primary",
  size = "md",
  disabled = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] transition-all duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#050505] disabled:cursor-not-allowed disabled:opacity-40 rounded-[4px]";

  const sizeClasses = {
    sm: "min-h-[36px] px-4 py-2 text-[11px]",
    md: "min-h-[44px] px-6 py-3 text-xs",
    lg: "min-h-[52px] px-8 py-4 text-xs font-medium tracking-[0.2em]",
    icon: "min-h-[44px] min-w-[44px] p-2 text-xs",
  };

  const variantClasses = {
    primary:
      "bg-[#050505] text-[#B7D98B] font-medium border border-[#050505] hover:bg-[#294D2C] hover:text-[#F7F7F1] hover:border-[#294D2C] active:bg-[#101010] hover:-translate-y-0.5 shadow-sm",
    secondary:
      "bg-transparent text-[#050505] border border-[#050505] hover:bg-[#050505] hover:text-[#B7D98B] active:bg-[#101010] hover:-translate-y-0.5",
    luxury:
      "bg-[#050505] text-[#B7D98B] border border-[#294D2C] hover:bg-[#294D2C] hover:text-[#F7F7F1] hover:border-[#294D2C] active:bg-[#101010] hover:-translate-y-0.5 shadow-sm",
    ghost:
      "bg-transparent text-[#294D2C] hover:text-[#050505] hover:bg-[#B7D98B]/20 active:bg-[#B7D98B]/30",
    text:
      "bg-transparent text-[#050505] hover:text-[#294D2C] underline underline-offset-4 decoration-[#050505]/40 hover:decoration-[#294D2C] px-0 min-h-0",
    icon:
      "bg-transparent text-[#050505] hover:text-[#294D2C] hover:bg-[#B7D98B]/20 border border-transparent hover:border-[#D4DEC5]",
  };

  return cn(
    baseClasses,
    size !== "icon" && sizeClasses[size],
    size === "icon" && sizeClasses.icon,
    variantClasses[variant],
    disabled && "pointer-events-none",
    className
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        className={getButtonClasses({ variant, size, disabled, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export function LinkButton({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  ariaLabel,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={getButtonClasses({ variant, size, disabled, className })}
      {...props}
    >
      {children}
    </Link>
  );
}
