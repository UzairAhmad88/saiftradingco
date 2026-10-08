"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RotateCcw, Home, Phone, Mail } from "lucide-react";

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ContactError]", error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="w-full min-h-[60vh] bg-[#E5F1D2] flex items-center justify-center py-20 px-4 focus:outline-none"
    >
      <div className="max-w-md w-full p-8 bg-[#F7F7F1] border border-[#D4DEC5] rounded-[4px] text-center space-y-6 shadow-sm">
        <div className="w-12 h-12 mx-auto bg-[#FDE8E8] border border-[#DC2626]/20 rounded-[4px] flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-[#DC2626]" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#294D2C] font-semibold block">
            Direct Trade Desk
          </span>
          <h1 className="font-serif text-2xl text-[#050505] font-normal">
            Unable to Load Contact Desk
          </h1>
          <p className="text-xs text-[#777A70] leading-relaxed">
            An unexpected error occurred while loading this page. You can retry or contact our trade desk directly.
          </p>
        </div>

        <div className="p-4 bg-[#E5F1D2] border border-[#D4DEC5] rounded-[4px] text-xs text-[#777A70] space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#294D2C]" aria-hidden="true" />
            <a href="tel:+85235251640" className="text-[#050505] hover:text-[#294D2C] font-medium">
              +852 3525 1640
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#294D2C]" aria-hidden="true" />
            <a href="mailto:Saiftradingco@yahoo.com" className="text-[#050505] hover:text-[#294D2C] font-medium">
              Saiftradingco@yahoo.com
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button variant="primary" size="sm" onClick={() => reset()} className="w-full sm:w-auto">
            <RotateCcw className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
            Try Again
          </Button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-[#050505] rounded-[4px] text-xs uppercase tracking-wider text-[#050505] hover:bg-[#050505] hover:text-[#B7D98B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
          >
            <Home className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
