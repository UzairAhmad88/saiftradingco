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
      className="flex-1 flex items-center justify-center py-24 sm:py-32 bg-[#050505] text-[#F5F3EE] focus:outline-none"
    >
      <Container size="narrow" className="text-center space-y-6">
        <div className="w-12 h-12 mx-auto border border-[#DC2626]/30 bg-[#2D1515] rounded-[2px] flex items-center justify-center text-[#EF4444]">
          <AlertCircle className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
        </div>

        <div className="space-y-3">
          <span className="type-eyebrow text-[#EF4444] block">
            System Notice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F3EE]">
            Something went wrong
          </h1>
          <p className="type-body text-[#A5A5A0] max-w-md mx-auto font-light leading-relaxed">
            An unexpected interruption occurred while loading this page. Please try again or sign in to continue.
          </p>
          {error?.message && (
            <p className="text-[11px] font-mono text-[#EF4444] bg-[#140A0A] border border-[#DC2626]/30 p-2.5 rounded-[2px] max-w-md mx-auto break-all">
              {error.message}
            </p>
          )}
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B6D94C] text-[#050505] font-semibold rounded-[2px] hover:bg-[#A3C73A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Try Again</span>
          </button>
          <Link
            href="/admin/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#9CCB63] rounded-[2px] text-[#9CCB63] hover:bg-[#9CCB63]/10 transition-colors"
          >
            <span>Admin Sign In</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#242424] rounded-[2px] text-[#F5F3EE] hover:border-[#B6D94C] hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </main>
  );
}
