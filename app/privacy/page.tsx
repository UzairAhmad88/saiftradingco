import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and client data protection practices for Saif Trading Co.",
  canonical: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="w-full bg-[#050505] text-[#F5F3EE] py-16 sm:py-24 focus:outline-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF9F5] border border-[#E2DFD7] rounded-[2px] p-6 sm:p-8 md:p-12 space-y-8 text-[#050505]">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif text-[#050505] tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#777772] font-medium">
              Last updated: October 2026 · Saif Trading Co
            </p>
          </div>

          <div className="space-y-8 text-[#050505]/80 leading-relaxed text-sm sm:text-base font-light">
            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">1. Overview</h2>
              <p>
                Saif Trading Co (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal information and privacy. This Privacy Policy details how we handle information collected when you explore our gemstone catalogue, submit inquiries, or communicate directly with our team.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">2. Information We Collect</h2>
              <p>
                When you contact us regarding gemstone specimens, certification verification, or order inquiries via our contact forms, email, or telephone, we collect:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[#777772]">
                <li>Your contact name and company name (if applicable)</li>
                <li>Your email address and phone number</li>
                <li>Your message, gemstone requirements, and communication history</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">3. Purpose of Processing</h2>
              <p>
                Information collected is strictly utilized to respond to your specific gemstone inquiries, provide accurate specimen specifications, schedule inspections or viewings, and fulfill business correspondence. We do not sell, rent, or trade your contact information to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">4. Data Storage and Security</h2>
              <p>
                We maintain stringent administrative and technical safeguards to ensure client correspondence and data remain secure. Our server infrastructure utilizes encrypted connections (TLS/SSL).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">5. Hong Kong Personal Data (Privacy) Ordinance</h2>
              <p>
                We adhere to the Personal Data (Privacy) Ordinance (Cap. 486) of the Laws of Hong Kong. You have the right to request access to and correction of your personal data held by us.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-serif text-[#050505]">6. Contact Us</h2>
              <p>
                For any inquiries regarding this policy or your personal information, contact our privacy officer at:
              </p>
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
