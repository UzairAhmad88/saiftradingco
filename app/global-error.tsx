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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#050505] text-[#F5F5F0] font-sans flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#DC2626] block">
            System Notice
          </span>
          <h1 className="text-3xl font-serif text-[#F5F5F0]">
            Application Interrupted
          </h1>
          <p className="text-sm text-[#9A9A94] leading-relaxed">
            A critical error occurred while rendering the page shell. Please refresh or retry.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-3 bg-[#9CCB63] text-[#050505] text-xs uppercase tracking-[0.2em] font-medium rounded-[4px] hover:bg-[#B7D98B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
            >
              Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
