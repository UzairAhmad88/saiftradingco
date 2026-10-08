import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and client data protection practices for Saif Trading Co.",
  canonical: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="max-w-4xl mx-auto px-6 py-16 sm:py-24 focus:outline-none">
      <h1 className="text-3xl sm:text-4xl font-serif text-[#F5F5F5] tracking-tight mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm text-[#A3A3A3] mb-8">
        Last updated: October 2026
      </p>

      <div className="space-y-8 text-[#A3A3A3] leading-relaxed">
        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">1. Overview</h2>
          <p>
            Saif Trading Co (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal information and privacy. This Privacy Policy details how we handle information collected when you explore our gemstone catalogue, submit inquiries, or communicate directly with our team.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">2. Information We Collect</h2>
          <p>
            When you contact us regarding gemstone specimens, certification verification, or order inquiries via our contact forms, email, or telephone, we collect:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your contact name and company name (if applicable)</li>
            <li>Your email address and phone number</li>
            <li>Your message, gemstone requirements, and communication history</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">3. Purpose of Processing</h2>
          <p>
            Information collected is strictly utilized to respond to your specific gemstone inquiries, provide accurate specimen specifications, schedule inspections or viewings, and fulfill business correspondence. We do not sell, rent, or trade your contact information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">4. Data Storage and Security</h2>
          <p>
            We maintain stringent administrative and technical safeguards to ensure client correspondence and data remain secure. Our server infrastructure utilizes encrypted connections (TLS/SSL).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">5. Hong Kong Personal Data (Privacy) Ordinance</h2>
          <p>
            We adhere to the Personal Data (Privacy) Ordinance (Cap. 486) of the Laws of Hong Kong. You have the right to request access to and correction of your personal data held by us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#F5F5F5] mb-2">6. Contact Us</h2>
          <p>
            For any inquiries regarding this policy or your personal information, contact our privacy officer at:
          </p>
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
