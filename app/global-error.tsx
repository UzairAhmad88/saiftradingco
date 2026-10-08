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
      <body className="min-h-screen bg-[#050505] text-[#F5F3EE] font-sans flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center space-y-6 bg-[#0C0C0C] border border-[#242424] p-8 rounded-[2px]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#EF4444] block font-medium">
            System Notice
          </span>
          <h1 className="text-3xl font-serif text-[#F5F3EE]">
            Application Interrupted
          </h1>
          <p className="text-sm text-[#A5A5A0] leading-relaxed font-light">
            A critical error occurred while rendering the page shell. Please refresh or retry.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-3 bg-[#B6D94C] text-[#050505] text-xs uppercase tracking-[0.2em] font-semibold rounded-[2px] hover:bg-[#A3C73A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
