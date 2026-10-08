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
    "inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] transition-all duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B6D94C] disabled:cursor-not-allowed disabled:opacity-40 rounded-[4px]";

  const sizeClasses = {
    sm: "min-h-[36px] px-4 py-2 text-[11px]",
    md: "min-h-[44px] px-6 py-3 text-xs",
    lg: "min-h-[52px] px-8 py-4 text-xs font-medium tracking-[0.2em]",
    icon: "min-h-[44px] min-w-[44px] p-2 text-xs",
  };

  const variantClasses = {
    primary:
      "bg-[#B6D94C] text-[#050505] font-semibold border border-[#B6D94C] hover:bg-[#A3C73A] hover:border-[#A3C73A] active:bg-[#91B32A] hover:-translate-y-0.5 shadow-sm",
    secondary:
      "bg-transparent text-[#F5F3EE] border border-[#242424] hover:border-[#B6D94C] hover:text-[#B6D94C] active:bg-[#121212] hover:-translate-y-0.5",
    luxury:
      "bg-[#B6D94C] text-[#050505] font-semibold border border-[#B6D94C] hover:bg-[#A3C73A] hover:border-[#A3C73A] active:bg-[#91B32A] hover:-translate-y-0.5 shadow-sm",
    ghost:
      "bg-transparent text-[#F5F3EE] hover:text-[#B6D94C] hover:bg-[#B6D94C]/10 active:bg-[#B6D94C]/20",
    text:
      "bg-transparent text-[#F5F3EE] hover:text-[#B6D94C] underline underline-offset-4 decoration-[#777772]/50 hover:decoration-[#B6D94C] px-0 min-h-0",
    icon:
      "bg-transparent text-[#F5F3EE] hover:text-[#B6D94C] hover:bg-[#121212] border border-[#242424] hover:border-[#B6D94C]/40",
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
