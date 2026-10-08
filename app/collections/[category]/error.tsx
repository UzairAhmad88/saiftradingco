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
    <div className="w-full bg-[#E5F1D2] min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 bg-[#F7F7F1] border border-[#D4DEC5] rounded-[4px] text-center space-y-6 shadow-sm">
        <div className="w-12 h-12 mx-auto bg-[#CFE7AA] border border-[#294D2C]/20 rounded-[4px] flex items-center justify-center text-[#294D2C]">
          <AlertTriangle className="w-6 h-6 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-[#050505]">
            Collection Temporarily Unavailable
          </h2>
          <p className="text-xs sm:text-sm text-[#777A70] font-light leading-relaxed">
            We encountered a problem while retrieving this mineral catalogue. Please try refreshing the collection view.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            onClick={() => reset()}
            variant="primary"
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
