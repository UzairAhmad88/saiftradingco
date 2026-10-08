import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for catalogue browsing and inquiries with Saif Trading Co.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="max-w-4xl mx-auto px-6 py-16 sm:py-24 focus:outline-none">
      <h1 className="text-3xl sm:text-4xl font-serif text-[#F5F5F5] tracking-tight mb-4">
        Terms of Service
      </h1>
      <p className="text-sm text-[#A3A3A3] mb-8">
        Last updated: October 2026
      </p>

      <div className="space-y-8 text-[#A3A3A3] leading-relaxed">
        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">1. Scope and Acceptance</h2>
          <p>
            By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use. These terms govern the presentation of our rough gemstone catalogue and direct business communication with Saif Trading Co.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">2. Catalogue & Specimen Representations</h2>
          <p>
            Our catalogue displays natural rough gemstone specimens including Tourmaline, Kunzite, and Morganite. While every effort is made to accurately present specimen color, dimensions, carat weight, and natural crystalline characteristics through high-resolution photography, natural variations may appear across different viewing displays and lighting conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">3. Inquiry & Availability Status</h2>
          <p>
            Listings in this catalogue serve as an informational portfolio for trade inquiries and do not constitute an automated consumer sale offer. Specimen availability (&quot;Available&quot;, &quot;Sold&quot;, &quot;Reserved&quot;) is subject to real-time verification upon direct communication. Inquiries must be confirmed via our official telephone, mobile, or email channels.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">4. Certification and Inspection</h2>
          <p>
            Where specified, gemstone specimens may be accompanied by lab certificates or reports. Formal trade transactions may include provisions for independent gemological verification or on-site inspection at our registered Hung Hom, Kowloon facility by mutual appointment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">5. Intellectual Property</h2>
          <p>
            All content on this website, including specimen photography, branding, trademarks, text, and structural design, is the property of Saif Trading Co and protected under international copyright laws. Unauthorized reproduction or commercial distribution without written consent is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">6. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the Hong Kong Special Administrative Region.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">7. Contact Information</h2>
          <div className="mt-3 p-4 bg-[#101010] border border-[#2A2A2A] rounded text-sm text-[#F5F5F5]">
            <p><strong>Saif Trading Co</strong></p>
            <p>417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street, Hung Hom, Kowloon, Hong Kong</p>
            <p>Telephone: +852 3525 1640</p>
            <p>Email: Saiftradingco@yahoo.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}
