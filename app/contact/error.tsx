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
      className="w-full min-h-[60vh] bg-[#050505] text-[#F5F3EE] flex items-center justify-center py-20 px-4 focus:outline-none"
    >
      <div className="max-w-md w-full p-8 bg-[#0C0C0C] border border-[#242424] rounded-[2px] text-center space-y-6">
        <div className="w-12 h-12 mx-auto bg-[#2D1515] border border-[#DC2626]/30 rounded-[2px] flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-[#EF4444]" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B6D94C] font-semibold block">
            Direct Trade Desk
          </span>
          <h1 className="font-serif text-2xl text-[#F5F3EE] font-normal">
            Unable to Load Contact Desk
          </h1>
          <p className="text-xs text-[#A5A5A0] leading-relaxed">
            An unexpected error occurred while loading this page. You can retry or contact our trade desk directly.
          </p>
        </div>

        <div className="p-4 bg-[#080808] border border-[#242424] rounded-[2px] text-xs text-[#A5A5A0] space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#B6D94C]" aria-hidden="true" />
            <a href="tel:+85235251640" className="text-[#F5F3EE] hover:text-[#B6D94C] font-mono font-medium">
              +852 3525 1640
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#B6D94C]" aria-hidden="true" />
            <a href="mailto:Saiftradingco@yahoo.com" className="text-[#F5F3EE] hover:text-[#B6D94C] font-mono font-medium">
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
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-[#242424] rounded-[2px] text-xs uppercase tracking-wider text-[#F5F3EE] hover:border-[#B6D94C] hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          >
            <Home className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
