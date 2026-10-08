import React from "react";
import Link from "next/link";
import { FileCheck, ShieldCheck, ArrowRight } from "lucide-react";
import type { GemstoneWithDetails } from "@/types/gemstone";

export interface CertificationSectionProps {
  gemstone: GemstoneWithDetails;
}

export function CertificationSection({ gemstone }: CertificationSectionProps) {
  const hasCertificate = Boolean(gemstone.certificate_lab);

  return (
    <div className="p-6 sm:p-8 bg-[#FAF9F5] border border-[#E2DFD7] rounded-[4px] space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-[#E2DFD7] border border-[#D4D1C7] text-[#050505] shrink-0 rounded-[4px]">
            {hasCertificate ? (
              <FileCheck className="w-5 h-5" />
            ) : (
              <ShieldCheck className="w-5 h-5" />
            )}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#4D6618] block font-bold">
              Documentation Disclosure
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#050505] font-semibold">
              {hasCertificate
                ? "Independent Gemological Laboratory Report"
                : "Laboratory Verification Protocol"}
            </h3>
          </div>
        </div>

        {hasCertificate && (
          <span className="self-start sm:self-auto inline-flex items-center px-3 py-1 bg-[#E2DFD7] border border-[#D4D1C7] rounded-[2px] text-[11px] uppercase tracking-wider text-[#050505] font-mono font-semibold">
            {gemstone.certificate_lab}
          </span>
        )}
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-[#555550] font-normal leading-relaxed max-w-3xl">
        {hasCertificate ? (
          <>
            <p>
              This specimen has been examined by an independent gemological laboratory confirming species identification and natural mineral characteristics.
            </p>
            {gemstone.certificate_number && (
              <div className="p-3 bg-[#F5F3EE] border border-[#E2DFD7] rounded-[2px] text-xs font-mono text-[#050505] inline-block font-semibold">
                Report Reference: {gemstone.certificate_number}
              </div>
            )}
          </>
        ) : (
          <p>
            While this rough crystal is sold based on direct physical and optical observation, independent laboratory testing through recognized gemological laboratories in Hong Kong can be arranged upon commercial agreement prior to dispatch.
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-[#E2DFD7]">
        <Link
          href="/certification"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#050505] font-bold hover:text-[#4D6618] transition-colors"
        >
          <span>Read Our Testing &amp; Verification Standards</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
