import React from "react";
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Introduction Block */}
      <div className="space-y-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#B6D94C] block font-medium">
          Direct Trade Desk
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F3EE] font-normal tracking-tight">
          Saif Trading Co
        </h2>
        <p className="text-sm text-[#A5A5A0] leading-relaxed font-light">
          Hong Kong supplier specializing in natural rough Tourmaline, Kunzite, and Morganite crystal specimens. We provide physical specimen inspection, detailed macro specifications, and direct trade correspondence.
        </p>
      </div>

      {/* Office Address Card — Dry Black Surface */}
      <div className="p-6 bg-[#0C0C0C] border border-[#242424] rounded-[2px] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B6D94C] font-medium">
            <MapPin className="w-4 h-4 text-[#B6D94C]" aria-hidden="true" />
            <span>Hong Kong Office</span>
          </div>
          <a
            href="https://maps.google.com/?q=Focal+Industrial+Centre,+21+Man+Lok+Street,+Hung+Hom,+Kowloon,+Hong+Kong"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#B6D94C] hover:text-[#F5F3EE] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
            aria-label="View Focal Industrial Centre on Google Maps in a new tab"
          >
            <span>Map</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>

        <address className="not-italic text-sm text-[#F5F3EE] space-y-1 leading-relaxed font-light">
          <p className="font-medium text-[#F5F3EE]">Saif Trading Co</p>
          <p className="text-[#A5A5A0]">417 Flat 4 Floor, Block B</p>
          <p className="text-[#A5A5A0]">Focal Industrial Centre</p>
          <p className="text-[#A5A5A0]">21 Man Lok Street</p>
          <p className="text-[#A5A5A0]">Hung Hom, Kowloon</p>
          <p className="text-[#777772]">Hong Kong</p>
        </address>

        <div className="pt-3 border-t border-[#242424]">
          <p className="text-xs text-[#777772] leading-relaxed">
            In-person lot viewings and physical rough inspections at our Hung Hom premises are arranged by appointment.
          </p>
        </div>
      </div>

      {/* Communication Channels — Dry Black Surface */}
      <div className="p-6 bg-[#0C0C0C] border border-[#242424] rounded-[2px] space-y-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B6D94C] font-medium">
          <Phone className="w-4 h-4 text-[#B6D94C]" aria-hidden="true" />
          <span>Telecommunication Channels</span>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <span className="text-[11px] text-[#777772] uppercase tracking-wider block font-medium">
              Office Telephone
            </span>
            <a
              href="tel:+85235251640"
              className="text-base text-[#F5F3EE] hover:text-[#B6D94C] transition-colors font-mono font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
            >
              +852 3525 1640
            </a>
          </div>

          <div>
            <span className="text-[11px] text-[#777772] uppercase tracking-wider block font-medium">
              Direct Mobile Lines
            </span>
            <div className="space-y-1.5 mt-1 font-mono">
              <a
                href="tel:+85290649593"
                className="block text-sm text-[#F5F3EE] hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
              >
                +852 9064 9593
              </a>
              <a
                href="tel:+85269037690"
                className="block text-sm text-[#F5F3EE] hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
              >
                +852 6903 7690
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-[#242424]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B6D94C] mb-2 font-medium">
              <Mail className="w-4 h-4 text-[#B6D94C]" aria-hidden="true" />
              <span>Direct Electronic Mail</span>
            </div>
            <a
              href="mailto:Saiftradingco@yahoo.com"
              className="text-sm text-[#F5F3EE] hover:text-[#B6D94C] transition-colors font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
            >
              Saiftradingco@yahoo.com
            </a>
          </div>
        </div>
      </div>

      {/* Trust & Specialization Notice */}
      <div className="p-4 bg-[#0C0C0C] border border-[#242424] rounded-[2px] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#B6D94C] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-xs text-[#A5A5A0] leading-relaxed">
          <p className="font-medium text-[#F5F3EE]">Mineralogical Traceability</p>
          <p>
            All specimens are documented with exact weight (carats and grams), physical measurements, and verifiable diagnostic properties.
          </p>
        </div>
      </div>
    </div>
  );
}
