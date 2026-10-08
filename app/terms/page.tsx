import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for catalogue browsing and inquiries with Saif Trading Co.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="w-full bg-[#050505] text-[#F5F3EE] py-16 sm:py-24 focus:outline-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-[2px] p-6 sm:p-8 md:p-12 space-y-8 text-[#050505]">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#050505] tracking-tight mb-3">
              Terms of Service
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#777772] font-medium">
              Last updated: October 2026 · Saif Trading Co
            </p>
          </div>

          <div className="space-y-8 text-[#050505]/80 leading-relaxed text-sm sm:text-base font-light">
            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">1. Scope and Acceptance</h2>
              <p>
                By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use. These terms govern the presentation of our rough gemstone catalogue and direct business communication with Saif Trading Co.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">2. Catalogue &amp; Specimen Representations</h2>
              <p>
                Our catalogue displays natural rough gemstone specimens including Tourmaline, Kunzite, and Morganite. While every effort is made to accurately present specimen color, dimensions, carat weight, and natural crystalline characteristics through high-resolution photography, natural variations may appear across different viewing displays and lighting conditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">3. Inquiry &amp; Availability Status</h2>
              <p>
                Listings in this catalogue serve as an informational portfolio for trade inquiries and do not constitute an automated consumer sale offer. Specimen availability (&quot;Available&quot;, &quot;Sold&quot;, &quot;Reserved&quot;) is subject to real-time verification upon direct communication. Inquiries must be confirmed via our official telephone, mobile, or email channels.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">4. Certification and Inspection</h2>
              <p>
                Where specified, gemstone specimens may be accompanied by lab certificates or reports. Formal trade transactions may include provisions for independent gemological verification or on-site inspection at our registered Hung Hom, Kowloon facility by mutual appointment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">5. Intellectual Property</h2>
              <p>
                All content on this website, including specimen photography, branding, trademarks, text, and structural design, is the property of Saif Trading Co and protected under international copyright laws. Unauthorized reproduction or commercial distribution without written consent is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">6. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">7. Contact Information</h2>
              <div className="mt-3 p-5 bg-[#050505] border border-[#242424] rounded-[2px] text-xs sm:text-sm text-[#F5F3EE] space-y-1">
                <p><strong className="text-[#B6D94C] font-mono uppercase tracking-wider text-xs">Saif Trading Co</strong></p>
                <p className="text-[#A5A5A0]">417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street, Hung Hom, Kowloon, Hong Kong</p>
                <p className="text-[#A5A5A0]">Telephone: +852 3525 1640</p>
                <p className="text-[#A5A5A0]">Email: Saiftradingco@yahoo.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
