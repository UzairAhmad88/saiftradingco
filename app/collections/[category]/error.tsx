"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected collection errors quietly in dev
    console.error("Collection page error:", error);
  }, [error]);

  return (
    <div className="w-full bg-[#050505] min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 bg-[#0D0D0D] border border-[#2A2A2A] text-center space-y-6">
        <div className="w-12 h-12 mx-auto bg-[#171717] border border-[#2A2A2A] flex items-center justify-center text-[#B69B5E]">
          <AlertTriangle className="w-6 h-6 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-[#F5F5F5]">
            Collection Temporarily Unavailable
          </h2>
          <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
            We encountered a problem while retrieving this mineral catalogue. Please try refreshing the collection view.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            onClick={() => reset()}
            variant="secondary"
            size="md"
            className="inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
