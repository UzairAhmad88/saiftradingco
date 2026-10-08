import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#242424] bg-[#050505] text-[#F5F3EE] text-sm mt-auto">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Brand & Specialization Statement (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
              aria-label="Saif Trading Co Home"
            >
              <span className="font-serif text-2xl tracking-[0.18em] uppercase text-[#F5F3EE] group-hover:text-[#B6D94C] transition-colors block font-semibold">
                Saif Trading Co
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B6D94C] font-semibold block mt-1">
                Rough Gemstone Supplier
              </span>
            </Link>

            <p className="text-sm text-[#A5A5A0] max-w-sm leading-relaxed font-light">
              Supplying selected natural rough Tourmaline, Kunzite, and Morganite crystal specimens to collectors, lapidaries, and gemstone professionals worldwide.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider border border-[#242424] bg-[#0C0C0C] text-[#B6D94C] rounded-[3px] font-medium">
                Hong Kong Registered Entity
              </span>
            </div>
          </div>

          {/* Column 2: Explore Navigation (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="type-eyebrow text-[#B6D94C] font-semibold">
              Explore
            </h3>
            <ul className="space-y-1.5 text-xs uppercase tracking-[0.15em]">
              <li>
                <Link href="/collections" className="inline-block py-1 text-[#F5F3EE] hover:text-[#B6D94C] transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/tourmaline" className="inline-block py-1 hover:text-[#B6D94C] transition-colors text-[#A5A5A0]">
                  Tourmaline Specimens
                </Link>
              </li>
              <li>
                <Link href="/collections/kunzite" className="inline-block py-1 hover:text-[#B6D94C] transition-colors text-[#A5A5A0]">
                  Kunzite Specimens
                </Link>
              </li>
              <li>
                <Link href="/collections/morganite" className="inline-block py-1 hover:text-[#B6D94C] transition-colors text-[#A5A5A0]">
                  Morganite Specimens
                </Link>
              </li>
              <li>
                <Link href="/education" className="inline-block py-1 text-[#F5F3EE] hover:text-[#B6D94C] transition-colors">
                  Gemstone Education
                </Link>
              </li>
              <li>
                <Link href="/certification" className="inline-block py-1 text-[#F5F3EE] hover:text-[#B6D94C] transition-colors">
                  Certification Standards
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block py-1 text-[#F5F3EE] hover:text-[#B6D94C] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="type-eyebrow text-[#B6D94C] font-semibold">
              Hong Kong Trade Office
            </h3>
            <address className="not-italic text-sm space-y-3 leading-relaxed text-[#A5A5A0] font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B6D94C] shrink-0 mt-1" aria-hidden="true" />
                <span className="text-[#F5F3EE]">
                  417 Flat 4 Floor, Block B, Focal Industrial Centre,<br />
                  21 Man Lok Street, Hung Hom, Kowloon, Hong Kong
                </span>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <Phone className="w-4 h-4 text-[#B6D94C] shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="text-[#777772] uppercase tracking-wider block text-[10px]">Office Telephone</span>
                    <a href="tel:+85235251640" className="text-[#F5F3EE] hover:text-[#B6D94C] transition-colors">
                      +852 3525 1640
                    </a>
                  </div>
                  <div>
                    <span className="text-[#777772] uppercase tracking-wider block text-[10px]">Mobile Contacts</span>
                    <a href="tel:+85290649593" className="text-[#F5F3EE] hover:text-[#B6D94C] transition-colors block">
                      +852 9064 9593
                    </a>
                    <a href="tel:+85269037690" className="text-[#F5F3EE] hover:text-[#B6D94C] transition-colors block">
                      +852 6903 7690
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Mail className="w-4 h-4 text-[#B6D94C] shrink-0" aria-hidden="true" />
                <div className="text-xs">
                  <span className="text-[#777772] uppercase tracking-wider block text-[10px]">Direct Email</span>
                  <a href="mailto:Saiftradingco@yahoo.com" className="text-[#F5F3EE] hover:text-[#B6D94C] transition-colors">
                    Saiftradingco@yahoo.com
                  </a>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777772]">
          <p>© {currentYear} Saif Trading Co. All rights reserved.</p>
          <nav aria-label="Legal navigation" className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <Link href="/privacy" className="py-2 hover:text-[#B6D94C] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="py-2 hover:text-[#B6D94C] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="py-2 hover:text-[#B6D94C] transition-colors">
              Inquire
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
