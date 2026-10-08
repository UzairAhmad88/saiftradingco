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
    "inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] transition-all duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B69B5E] disabled:cursor-not-allowed disabled:opacity-40";

  const sizeClasses = {
    sm: "min-h-[36px] px-4 py-2 text-[11px]",
    md: "min-h-[44px] px-6 py-3 text-xs",
    lg: "min-h-[52px] px-8 py-4 text-xs font-medium tracking-[0.2em]",
    icon: "min-h-[44px] min-w-[44px] p-2 text-xs",
  };

  const variantClasses = {
    primary:
      "bg-[#F5F5F5] text-[#050505] font-medium hover:bg-[#B69B5E] hover:text-[#050505] active:bg-[#C7AC6F]",
    secondary:
      "bg-transparent text-[#F5F5F5] border border-[#2A2A2A] hover:border-[#B69B5E] hover:text-[#B69B5E] active:bg-[#171717]",
    luxury:
      "bg-[#171717] text-[#B69B5E] border border-[#B69B5E]/60 hover:bg-[#B69B5E] hover:text-[#050505] active:bg-[#C7AC6F]",
    ghost:
      "bg-transparent text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#171717] active:bg-[#1E1E1E]",
    text:
      "bg-transparent text-[#B69B5E] hover:text-[#F5F5F5] underline underline-offset-4 decoration-[#B69B5E]/40 hover:decoration-[#F5F5F5] px-0 min-h-0",
    icon:
      "bg-transparent text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#171717] border border-transparent hover:border-[#2A2A2A] rounded-none",
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
