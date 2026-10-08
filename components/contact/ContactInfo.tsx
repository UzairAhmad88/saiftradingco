import React from "react";
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Introduction Block */}
      <div className="space-y-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B69B5E] block font-medium">
          Direct Trade Desk
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal tracking-tight">
          Saif Trading Co
        </h2>
        <p className="text-sm text-[#A3A3A3] leading-relaxed font-light">
          Hong Kong supplier specializing in natural rough Tourmaline, Kunzite, and Morganite crystal specimens. We provide physical specimen inspection, detailed macro specifications, and direct trade correspondence.
        </p>
      </div>

      {/* Office Address Card */}
      <div className="p-6 bg-[#101010] border border-[#2A2A2A] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B69B5E]">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>Hong Kong Office</span>
          </div>
          <a
            href="https://maps.google.com/?q=Focal+Industrial+Centre,+21+Man+Lok+Street,+Hung+Hom,+Kowloon,+Hong+Kong"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#A3A3A3] hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
            aria-label="View Focal Industrial Centre on Google Maps in a new tab"
          >
            <span>Map</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>

        <address className="not-italic text-sm text-[#F5F5F5] space-y-1 leading-relaxed font-light">
          <p className="font-medium text-[#F5F5F5]">Saif Trading Co</p>
          <p className="text-[#D4D4D4]">417 Flat 4 Floor, Block B</p>
          <p className="text-[#D4D4D4]">Focal Industrial Centre</p>
          <p className="text-[#D4D4D4]">21 Man Lok Street</p>
          <p className="text-[#D4D4D4]">Hung Hom, Kowloon</p>
          <p className="text-[#A3A3A3]">Hong Kong</p>
        </address>

        <div className="pt-2 border-t border-[#1C1C1C]">
          <p className="text-xs text-[#737373] leading-relaxed">
            In-person lot viewings and physical rough inspections at our Hung Hom premises are arranged by appointment.
          </p>
        </div>
      </div>

      {/* Communication Channels */}
      <div className="p-6 bg-[#101010] border border-[#2A2A2A] space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B69B5E]">
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Telecommunication Channels</span>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <span className="text-[11px] text-[#737373] uppercase tracking-wider block">
              Office Telephone
            </span>
            <a
              href="tel:+85235251640"
              className="text-base text-[#F5F5F5] hover:text-[#B69B5E] transition-colors font-mono font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
            >
              +852 3525 1640
            </a>
          </div>

          <div>
            <span className="text-[11px] text-[#737373] uppercase tracking-wider block">
              Direct Mobile Lines
            </span>
            <div className="space-y-1.5 mt-1 font-mono">
              <a
                href="tel:+85290649593"
                className="block text-sm text-[#F5F5F5] hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
              >
                +852 9064 9593
              </a>
              <a
                href="tel:+85269037690"
                className="block text-sm text-[#F5F5F5] hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
              >
                +852 6903 7690
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1C1C1C]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B69B5E] mb-2">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Direct Electronic Mail</span>
            </div>
            <a
              href="mailto:Saiftradingco@yahoo.com"
              className="text-sm text-[#F5F5F5] hover:text-[#B69B5E] transition-colors font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
            >
              Saiftradingco@yahoo.com
            </a>
          </div>
        </div>
      </div>

      {/* Trust & Specialization Notice */}
      <div className="p-4 bg-[#0A0A0A] border border-[#222222] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#B69B5E] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-xs text-[#A3A3A3] leading-relaxed">
          <p className="font-medium text-[#F5F5F5]">Mineralogical Traceability</p>
          <p>
            All specimens are documented with exact weight (carats and grams), physical measurements, and verifiable diagnostic properties.
          </p>
        </div>
      </div>
    </div>
  );
}
