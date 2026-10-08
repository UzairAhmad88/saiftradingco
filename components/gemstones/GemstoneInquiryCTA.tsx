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
      className="p-8 sm:p-12 bg-[#0C0C0C] border border-[#242424] rounded-[4px] text-center space-y-6 sm:space-y-8 shadow-xl"
    >
      <div className="space-y-3 max-w-2xl mx-auto">
        <span className="type-eyebrow text-[#B6D94C] block font-bold">
          Commercial Correspondence
        </span>
        <h2
          id="specimen-inquiry-heading"
          className="font-serif text-3xl sm:text-4xl text-[#F5F3EE] font-semibold leading-tight"
        >
          {isSold
            ? "Looking for Similar Rough Material?"
            : `Interested in This ${gemstone.name}?`}
        </h2>
        <p className="text-xs sm:text-sm text-[#A5A5A0] font-normal leading-relaxed">
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

      <div className="pt-6 border-t border-[#242424] flex flex-wrap items-center justify-center gap-6 text-xs text-[#F5F3EE]">
        <a
          href="tel:+85235251640"
          className="inline-flex items-center gap-1.5 text-[#F5F3EE] font-semibold hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
        >
          <Phone className="w-3.5 h-3.5 text-[#B6D94C]" aria-hidden="true" />
          <span>+852 3525 1640</span>
        </a>
        <a
          href="mailto:Saiftradingco@yahoo.com"
          className="inline-flex items-center gap-1.5 text-[#F5F3EE] font-semibold hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
        >
          <Mail className="w-3.5 h-3.5 text-[#B6D94C]" aria-hidden="true" />
          <span>Saiftradingco@yahoo.com</span>
        </a>
        <div className="inline-flex items-center gap-1.5 text-[#A5A5A0] font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#B6D94C]" />
          <span>Hung Hom, Kowloon, Hong Kong</span>
        </div>
      </div>
    </section>
  );
}
