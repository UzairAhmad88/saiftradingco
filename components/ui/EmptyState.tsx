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
        "py-16 px-6 text-center border border-[#D4DEC5] bg-[#F7F7F1] rounded-[4px] max-w-xl mx-auto space-y-5",
        className
      )}
    >
      <div className="w-12 h-12 mx-auto border border-[#D4DEC5] bg-[#CFE7AA] rounded-[4px] flex items-center justify-center text-[#050505]">
        {icon || <PackageOpen className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />}
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-xl sm:text-2xl text-[#050505]">{title}</h3>
        <p className="text-sm text-[#777A70] max-w-sm mx-auto leading-relaxed">
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
