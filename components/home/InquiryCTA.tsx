import React from "react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { INQUIRY_CTA_CONTENT } from "@/lib/data/homepage-data";
import { Phone, Mail, MapPin } from "lucide-react";

export function InquiryCTA() {
  return (
    <section
      aria-labelledby="inquiry-cta-heading"
      className="relative bg-[#0A0A0A] border-b border-[#262626] py-20 sm:py-28 overflow-hidden"
    >
      {/* Background Accent Shading */}
      <div
        className="absolute inset-0 bg-radial from-[#141414]/60 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 sm:space-y-10">
        <span className="type-eyebrow text-[#9CCB63] block">
          {INQUIRY_CTA_CONTENT.eyebrow}
        </span>

        <h2
          id="inquiry-cta-heading"
          className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F5F0] font-normal tracking-tight leading-[1.1] max-w-3xl mx-auto"
        >
          {INQUIRY_CTA_CONTENT.title}
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-[#9A9A94] font-light leading-relaxed max-w-2xl mx-auto">
          {INQUIRY_CTA_CONTENT.description}
        </p>

        {/* Primary Action Button */}
        <div className="pt-2 flex justify-center">
          <LinkButton
            href={INQUIRY_CTA_CONTENT.ctaHref}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[240px]"
          >
            {INQUIRY_CTA_CONTENT.ctaLabel}
          </LinkButton>
        </div>

        {/* Direct Contact Channels Strip */}
        <div className="pt-8 sm:pt-10 border-t border-[#1A1A1A] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#9A9A94]">
          <Link
            href={`tel:${INQUIRY_CTA_CONTENT.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 hover:text-[#9CCB63] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#9CCB63]" />
            <span>{INQUIRY_CONTENT_PHONE}</span>
          </Link>

          <Link
            href={`mailto:${INQUIRY_CTA_CONTENT.email}`}
            className="inline-flex items-center gap-2 hover:text-[#9CCB63] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#9CCB63]" />
            <span>{INQUIRY_CTA_CONTENT.email}</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-[#9A9A94]">
            <MapPin className="w-3.5 h-3.5 text-[#9CCB63]" />
            <span>Hung Hom, Kowloon, Hong Kong</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const INQUIRY_CONTENT_PHONE = INQUIRY_CTA_CONTENT.phone;
