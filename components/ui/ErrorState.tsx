import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Unable to load information",
  message = "A technical interruption occurred while retrieving catalogue data. Please try again or reach out to our team directly.",
  onRetry,
  retryLabel = "Retry",
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "py-12 px-6 text-center border border-[#B91C1C]/30 bg-[#F7F7F1] max-w-xl mx-auto space-y-4 rounded-[4px]",
        className
      )}
    >
      <div className="w-12 h-12 mx-auto border border-[#B91C1C]/40 bg-[#EDEDE4] rounded-[4px] flex items-center justify-center text-[#B91C1C]">
        <AlertCircle className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-serif text-xl text-[#050505]">{title}</h3>
        <p className="text-sm text-[#777A70] max-w-sm mx-auto leading-relaxed">
          {message}
        </p>
      </div>
      {onRetry && (
        <div className="pt-2">
          <Button
            onClick={onRetry}
            variant="secondary"
            size="sm"
            className="inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{retryLabel}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
