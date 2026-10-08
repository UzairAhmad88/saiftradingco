import React from "react";
import { LinkButton } from "@/components/ui/Button";
import type { GemstoneWithDetails } from "@/types/gemstone";
import { Phone, Mail, MapPin } from "lucide-react";

export interface GemstoneInquiryCTAProps {
  gemstone: GemstoneWithDetails;
}

export function GemstoneInquiryCTA({ gemstone }: GemstoneInquiryCTAProps) {
  const isSold = gemstone.status === "sold";
  const skuText = gemstone.sku ? `(Ref: ${gemstone.sku})` : "";

  return (
    <section
      aria-labelledby="specimen-inquiry-heading"
      className="p-8 sm:p-12 bg-[#090909] border border-[#2A2A2A] text-center space-y-6 sm:space-y-8"
    >
      <div className="space-y-3 max-w-2xl mx-auto">
        <span className="type-eyebrow text-[#B69B5E] block">
          Commercial Correspondence
        </span>
        <h2
          id="specimen-inquiry-heading"
          className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal leading-tight"
        >
          {isSold
            ? "Looking for Similar Rough Material?"
            : `Interested in This ${gemstone.name}?`}
        </h2>
        <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed">
          {isSold
            ? `While this specific specimen ${skuText} has been acquired, our Hong Kong office can advise on upcoming crystal arrivals or source comparable rough material in ${gemstone.category?.name || "this mineral family"}.`
            : `Contact our trade desk regarding physical viewing at our Hung Hom office, additional macro video documentation, or international courier arrangements for ${gemstone.name} ${skuText}.`}
        </p>
      </div>

      <div className="flex justify-center">
        <LinkButton
          href={`/contact?gemstone=${gemstone.slug}${isSold ? "&type=similar" : ""}`}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto min-w-[240px]"
        >
          {isSold ? "Inquire for Similar Material" : "Inquire About This Specimen"}
        </LinkButton>
      </div>

      <div className="pt-6 border-t border-[#1C1C1C] flex flex-wrap items-center justify-center gap-6 text-xs text-[#737373]">
        <a
          href="tel:+85235251640"
          className="inline-flex items-center gap-1.5 hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
        >
          <Phone className="w-3.5 h-3.5 text-[#B69B5E]" aria-hidden="true" />
          <span>+852 3525 1640</span>
        </a>
        <a
          href="mailto:Saiftradingco@yahoo.com"
          className="inline-flex items-center gap-1.5 hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
        >
          <Mail className="w-3.5 h-3.5 text-[#B69B5E]" aria-hidden="true" />
          <span>Saiftradingco@yahoo.com</span>
        </a>
        <div className="inline-flex items-center gap-1.5 text-[#737373]">
          <MapPin className="w-3.5 h-3.5 text-[#B69B5E]" />
          <span>Hung Hom, Kowloon, Hong Kong</span>
        </div>
      </div>
    </section>
  );
}
