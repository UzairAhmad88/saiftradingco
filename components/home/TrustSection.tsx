import React from "react";
import Link from "next/link";
import { TRUST_POINTS_DATA } from "@/lib/data/homepage-data";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-b border-[#242424] bg-[#0C0C0C] py-20 sm:py-28"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="space-y-3 max-w-2xl">
            <span className="type-eyebrow text-[#B6D94C] block font-bold">
              Trade Integrity
            </span>
            <h2
              id="trust-heading"
              className="font-serif text-3xl sm:text-5xl text-[#F5F3EE] font-semibold tracking-tight"
            >
              Clarity in Every Detail
            </h2>
          </div>
          <p className="text-sm text-[#A5A5A0] max-w-md font-normal leading-relaxed font-light">
            Our trade practices are founded on transparent physical specifications, verifiable documentation, and direct commercial accountability.
          </p>
        </div>

        {/* Editorial Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_POINTS_DATA.map((item, index) => (
            <div
              key={item.title}
              className="p-6 sm:p-8 bg-[#121212] border border-[#242424] flex flex-col justify-between space-y-6 hover:border-[#B6D94C]/40 transition-colors rounded-[4px] shadow-xs"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#B6D94C] font-semibold tracking-widest">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F3EE] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A0] font-normal leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A]">
                <p className="text-[11px] text-[#B6D94C] tracking-wide italic font-medium font-mono">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note & Link */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-[#080808] border border-[#242424] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[4px] shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-2 border border-[#242424] bg-[#121212] text-[#B6D94C] shrink-0 rounded-[4px]">
              <ShieldCheck className="w-5 h-5 text-[#B6D94C]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs uppercase tracking-[0.16em] text-[#F5F3EE] font-semibold">
                Independent Laboratory Disclosure
              </h4>
              <p className="text-xs text-[#A5A5A0] font-light">
                Where independent gemological test reports are available, report numbers and testing criteria are fully disclosed.
              </p>
            </div>
          </div>

          <Link
            href="/certification"
            className="shrink-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#B6D94C] font-bold hover:text-[#A3C73A] transition-colors"
          >
            <span>Learn About Verification</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B6D94C]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
