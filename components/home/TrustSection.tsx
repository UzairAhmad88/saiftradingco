import React from "react";
import Link from "next/link";
import { TRUST_POINTS_DATA } from "@/lib/data/homepage-data";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-b border-[#2A2A2A] bg-[#080808] py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#B69B5E] block">
              Trade Integrity
            </span>
            <h2
              id="trust-heading"
              className="font-serif text-3xl sm:text-5xl text-[#F5F5F5] font-normal tracking-tight"
            >
              Clarity in Every Detail
            </h2>
          </div>
          <p className="text-sm text-[#A3A3A3] max-w-md font-light leading-relaxed">
            Our trade practices are founded on transparent physical specifications, verifiable documentation, and direct commercial accountability.
          </p>
        </div>

        {/* Editorial Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_POINTS_DATA.map((item, index) => (
            <div
              key={item.title}
              className="p-6 sm:p-8 bg-[#0D0D0D] border border-[#222] flex flex-col justify-between space-y-6 hover:border-[#B69B5E]/50 transition-colors"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#B69B5E] tracking-widest">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F5] font-normal leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1C1C]">
                <p className="text-[11px] text-[#737373] tracking-wide italic">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note & Link */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-[#0C0C0C] border border-[#2A2A2A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 border border-[#B69B5E]/30 bg-[#141414] text-[#B69B5E] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.16em] text-[#F5F5F5]">
                Independent Laboratory Disclosure
              </h4>
              <p className="text-xs text-[#A3A3A3] font-light">
                Where independent gemological test reports are available, report numbers and testing criteria are fully disclosed.
              </p>
            </div>
          </div>

          <Link
            href="/certification"
            className="shrink-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#B69B5E] hover:text-[#F5F5F5] transition-colors"
          >
            <span>Learn About Verification</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
