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
      className="p-8 sm:p-12 bg-[#CFE7AA] border border-[#D4DEC5] rounded-[4px] text-center space-y-6 sm:space-y-8 shadow-xs"
    >
      <div className="space-y-3 max-w-2xl mx-auto">
        <span className="type-eyebrow text-[#294D2C] block font-bold">
          Commercial Correspondence
        </span>
        <h2
          id="specimen-inquiry-heading"
          className="font-serif text-3xl sm:text-4xl text-[#050505] font-semibold leading-tight"
        >
          {isSold
            ? "Looking for Similar Rough Material?"
            : `Interested in This ${gemstone.name}?`}
        </h2>
        <p className="text-xs sm:text-sm text-[#050505]/85 font-normal leading-relaxed">
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
          className="w-full sm:w-auto min-w-[240px] shadow-sm"
        >
          {isSold ? "Inquire for Similar Material" : "Inquire About This Specimen"}
        </LinkButton>
      </div>

      <div className="pt-6 border-t border-[#294D2C]/25 flex flex-wrap items-center justify-center gap-6 text-xs text-[#050505]">
        <a
          href="tel:+85235251640"
          className="inline-flex items-center gap-1.5 text-[#050505] font-semibold hover:text-[#294D2C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
        >
          <Phone className="w-3.5 h-3.5 text-[#294D2C]" aria-hidden="true" />
          <span>+852 3525 1640</span>
        </a>
        <a
          href="mailto:Saiftradingco@yahoo.com"
          className="inline-flex items-center gap-1.5 text-[#050505] font-semibold hover:text-[#294D2C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
        >
          <Mail className="w-3.5 h-3.5 text-[#294D2C]" aria-hidden="true" />
          <span>Saiftradingco@yahoo.com</span>
        </a>
        <div className="inline-flex items-center gap-1.5 text-[#050505]/80 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#294D2C]" />
          <span>Hung Hom, Kowloon, Hong Kong</span>
        </div>
      </div>
    </section>
  );
}
