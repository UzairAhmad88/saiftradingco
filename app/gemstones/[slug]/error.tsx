"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

export default function GemstoneDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Gemstone detail page error:", error);
  }, [error]);

  return (
    <div className="w-full bg-[#E5F1D2] min-h-[65vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 bg-[#F7F7F1] border border-[#D4DEC5] rounded-[4px] text-center space-y-6 shadow-sm">
        <div className="w-12 h-12 mx-auto bg-[#CFE7AA] border border-[#294D2C]/20 rounded-[4px] flex items-center justify-center text-[#294D2C]">
          <AlertTriangle className="w-6 h-6 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-[#050505]">
            Specimen Record Unavailable
          </h2>
          <p className="text-xs sm:text-sm text-[#777A70] font-light leading-relaxed">
            We were unable to load the complete physical record for this gemstone. Please try refreshing or return to collections.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="md"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </Button>

          <Link
            href="/collections"
            className="w-full sm:w-auto px-6 py-3 border border-[#050505] rounded-[4px] hover:bg-[#050505] hover:text-[#B7D98B] text-xs uppercase tracking-wider text-[#050505] font-semibold transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
