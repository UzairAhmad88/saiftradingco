import React from "react";
import { PackageOpen } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "py-16 px-6 text-center border border-[#2A2A2A] bg-[#101010] max-w-xl mx-auto space-y-5",
        className
      )}
    >
      <div className="w-12 h-12 mx-auto border border-[#2A2A2A] bg-[#171717] flex items-center justify-center text-[#B69B5E]">
        {icon || <PackageOpen className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />}
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F5]">{title}</h3>
        <p className="text-sm text-[#A3A3A3] max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      {actionLabel && (
        <div className="pt-2">
          {actionHref ? (
            <LinkButton href={actionHref} variant="secondary" size="sm">
              {actionLabel}
            </LinkButton>
          ) : onAction ? (
            <Button onClick={onAction} variant="secondary" size="sm">
              {actionLabel}
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
