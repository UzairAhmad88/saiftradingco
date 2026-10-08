"use client";

import React, { useEffect } from "react";

export default function RootGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#E5F1D2] text-[#050505] font-sans flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center space-y-6 bg-[#F7F7F1] border border-[#D4DEC5] p-8 rounded-[4px] shadow-sm">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#DC2626] block font-medium">
            System Notice
          </span>
          <h1 className="text-3xl font-serif text-[#050505]">
            Application Interrupted
          </h1>
          <p className="text-sm text-[#777A70] leading-relaxed font-light">
            A critical error occurred while rendering the page shell. Please refresh or retry.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-3 bg-[#050505] text-[#B7D98B] text-xs uppercase tracking-[0.2em] font-medium rounded-[4px] hover:bg-[#294D2C] hover:text-[#F7F7F1] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
