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
        "py-12 px-6 text-center border border-[#DC2626]/40 bg-[#101010] max-w-xl mx-auto space-y-4",
        className
      )}
    >
      <div className="w-12 h-12 mx-auto border border-[#DC2626]/40 bg-[#171717] flex items-center justify-center text-[#DC2626]">
        <AlertCircle className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-serif text-xl text-[#F5F5F5]">{title}</h3>
        <p className="text-sm text-[#A3A3A3] max-w-sm mx-auto leading-relaxed">
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
