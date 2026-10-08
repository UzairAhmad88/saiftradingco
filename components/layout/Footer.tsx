import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#262626] bg-[#0A0A0A] text-[#9A9A94] text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Brand & Specialization Statement (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
              aria-label="Saif Trading Co Home"
            >
              <span className="font-serif text-2xl tracking-[0.18em] uppercase text-[#F5F5F0] group-hover:text-[#9CCB63] transition-colors block">
                Saif Trading Co
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#9CCB63] font-medium block mt-1">
                Rough Gemstone Supplier
              </span>
            </Link>

            <p className="text-sm text-[#9A9A94] max-w-sm leading-relaxed font-light">
              Supplying selected natural rough Tourmaline, Kunzite, and Morganite crystal specimens to collectors, lapidaries, and gemstone professionals worldwide.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider border border-[#262626] bg-[#111111] text-[#9A9A94] rounded-[3px]">
                Hong Kong Registered Entity
              </span>
            </div>
          </div>

          {/* Column 2: Explore Navigation (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="type-eyebrow text-[#F5F5F0]">
              Explore
            </h3>
            <ul className="space-y-1.5 text-xs uppercase tracking-[0.15em]">
              <li>
                <Link href="/collections" className="inline-block py-1 hover:text-[#9CCB63] transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/tourmaline" className="inline-block py-1 hover:text-[#9CCB63] transition-colors text-[#737373]">
                  Tourmaline Specimens
                </Link>
              </li>
              <li>
                <Link href="/collections/kunzite" className="inline-block py-1 hover:text-[#9CCB63] transition-colors text-[#737373]">
                  Kunzite Specimens
                </Link>
              </li>
              <li>
                <Link href="/collections/morganite" className="inline-block py-1 hover:text-[#9CCB63] transition-colors text-[#737373]">
                  Morganite Specimens
                </Link>
              </li>
              <li>
                <Link href="/education" className="inline-block py-1 hover:text-[#9CCB63] transition-colors">
                  Gemstone Education
                </Link>
              </li>
              <li>
                <Link href="/certification" className="inline-block py-1 hover:text-[#9CCB63] transition-colors">
                  Certification Standards
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block py-1 hover:text-[#9CCB63] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="type-eyebrow text-[#F5F5F0]">
              Hong Kong Trade Office
            </h3>
            <address className="not-italic text-sm space-y-3 leading-relaxed text-[#9A9A94] font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9CCB63] shrink-0 mt-1" aria-hidden="true" />
                <span>
                  417 Flat 4 Floor, Block B, Focal Industrial Centre,<br />
                  21 Man Lok Street, Hung Hom, Kowloon, Hong Kong
                </span>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Phone className="w-4 h-4 text-[#9CCB63] shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-[#737373] uppercase tracking-wider block text-[10px]">Office Telephone</span>
                    <a href="tel:+85235251640" className="text-[#F5F5F0] hover:text-[#9CCB63] transition-colors">
                      +852 3525 1640
                    </a>
                  </div>
                  <div>
                    <span className="text-[#737373] uppercase tracking-wider block text-[10px]">Mobile Contacts</span>
                    <a href="tel:+85290649593" className="text-[#F5F5F0] hover:text-[#9CCB63] transition-colors block">
                      +852 9064 9593
                    </a>
                    <a href="tel:+85269037690" className="text-[#F5F5F0] hover:text-[#9CCB63] transition-colors block">
                      +852 6903 7690
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Mail className="w-4 h-4 text-[#9CCB63] shrink-0" aria-hidden="true" />
                <div className="text-xs">
                  <span className="text-[#737373] uppercase tracking-wider block text-[10px]">Direct Email</span>
                  <a href="mailto:Saiftradingco@yahoo.com" className="text-[#F5F5F0] hover:text-[#9CCB63] transition-colors">
                    Saiftradingco@yahoo.com
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9A9A94]">
          <p>© {currentYear} Saif Trading Co. All rights reserved.</p>
          <nav aria-label="Legal navigation" className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <Link href="/privacy" className="py-2 hover:text-[#F5F5F0] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="py-2 hover:text-[#F5F5F0] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="py-2 hover:text-[#F5F5F0] transition-colors">
              Inquire
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
