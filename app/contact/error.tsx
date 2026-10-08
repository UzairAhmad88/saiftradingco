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
      className="w-full min-h-[60vh] bg-[#050505] flex items-center justify-center py-20 px-4 focus:outline-none"
    >
      <div className="max-w-md w-full p-8 bg-[#101010] border border-[#2A2A2A] text-center space-y-6">
        <div className="w-12 h-12 mx-auto bg-[#1A1111] border border-[#DC2626]/30 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-[#DC2626]" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69B5E] block">
            Direct Trade Desk
          </span>
          <h1 className="font-serif text-2xl text-[#F5F5F5] font-normal">
            Unable to Load Contact Desk
          </h1>
          <p className="text-xs text-[#A3A3A3] leading-relaxed">
            An unexpected error occurred while loading this page. You can retry or contact our trade desk directly.
          </p>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#1C1C1C] text-xs text-[#A3A3A3] space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#B69B5E]" aria-hidden="true" />
            <a href="tel:+85235251640" className="text-[#F5F5F5] hover:text-[#B69B5E]">
              +852 3525 1640
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#B69B5E]" aria-hidden="true" />
            <a href="mailto:Saiftradingco@yahoo.com" className="text-[#F5F5F5] hover:text-[#B69B5E]">
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
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-[#2A2A2A] text-xs uppercase tracking-wider text-[#D4D4D4] hover:text-[#F5F5F5] hover:border-[#3A3A3A] transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
