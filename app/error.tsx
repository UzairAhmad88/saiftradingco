"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors securely without exposing credentials
    console.error("Application error:", error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      role="alert"
      className="flex-1 flex items-center justify-center py-24 sm:py-32 focus:outline-none"
    >
      <Container size="narrow" className="text-center space-y-6">
        <div className="w-12 h-12 mx-auto border border-[#DC2626]/40 bg-[#171717] flex items-center justify-center text-[#DC2626]">
          <AlertCircle className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
        </div>

        <div className="space-y-3">
          <span className="type-eyebrow text-[#DC2626] block">
            System Notice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F5F5]">
            Something went wrong
          </h1>
          <p className="type-body text-[#A3A3A3] max-w-md mx-auto font-light leading-relaxed">
            An unexpected interruption occurred while loading this page. Please try again or return to our homepage.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#F5F5F5] text-[#050505] font-medium hover:bg-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69B5E]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#B69B5E] hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69B5E]"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </main>
  );
}
