import React from "react";
import Link from "next/link";
import { TRUST_POINTS_DATA } from "@/lib/data/homepage-data";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-b border-[#D4DEC5] bg-[#F7F7F1] py-20 sm:py-28"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#294D2C] block font-bold">
              Trade Integrity
            </span>
            <h2
              id="trust-heading"
              className="font-serif text-3xl sm:text-5xl text-[#050505] font-semibold tracking-tight"
            >
              Clarity in Every Detail
            </h2>
          </div>
          <p className="text-sm text-[#777A70] max-w-md font-normal leading-relaxed">
            Our trade practices are founded on transparent physical specifications, verifiable documentation, and direct commercial accountability.
          </p>
        </div>

        {/* Editorial Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_POINTS_DATA.map((item, index) => (
            <div
              key={item.title}
              className="p-6 sm:p-8 bg-[#E5F1D2] border border-[#D4DEC5] flex flex-col justify-between space-y-6 hover:border-[#050505]/40 transition-colors rounded-[4px] shadow-xs"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#294D2C] font-semibold tracking-widest">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#050505] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#777A70] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4DEC5]">
                <p className="text-[11px] text-[#294D2C] tracking-wide italic font-medium">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note & Link */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-[#E5F1D2] border border-[#D4DEC5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[4px] shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-2 border border-[#D4DEC5] bg-[#CFE7AA] text-[#294D2C] shrink-0 rounded-[4px]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.16em] text-[#050505] font-semibold">
                Independent Laboratory Disclosure
              </h4>
              <p className="text-xs text-[#777A70] font-normal">
                Where independent gemological test reports are available, report numbers and testing criteria are fully disclosed.
              </p>
            </div>
          </div>

          <Link
            href="/certification"
            className="shrink-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#050505] font-bold hover:text-[#294D2C] transition-colors"
          >
            <span>Learn About Verification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
