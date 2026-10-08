import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata, getBreadcrumbListSchema } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import { FileCheck, ShieldAlert, Search, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Gemstone Certification & Testing Standards | Saif Trading Co",
  description:
    "Learn how gemstone laboratory identification reports work, what data they verify, and how Saif Trading Co handles independent certification for rough mineral specimens.",
  canonical: "/certification",
});

export default function CertificationPage() {
  const breadcrumbs = [{ label: "Certification" }];
  const breadcrumbSchema = getBreadcrumbListSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#050505] focus:outline-none"
      >
      {/* Breadcrumbs Header */}
      <div className="border-b border-[#262626] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Hero Section */}
      <section
        aria-labelledby="certification-hero-heading"
        className="border-b border-[#262626] bg-[#0A0A0A] py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#9CCB63]/30 bg-[#111111] text-[#9CCB63] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9CCB63]" aria-hidden="true" />
              <span>Standards &amp; Documentation</span>
            </div>

            <h1
              id="certification-hero-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F5F5F0] tracking-tight leading-[1.08]"
            >
              Gemstone Certification &amp; Verification
            </h1>

            <p className="text-base sm:text-lg text-[#9A9A94] font-light leading-relaxed">
              In the international mineral and gemstone trade, independent gemological laboratory reports provide scientific confirmation of a specimen&apos;s mineral identity, natural origin, and treatment status. Here we explain how laboratory documentation operates and how testing details are recorded in our catalogue.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Explanation: What a Report Proves */}
      <section
        aria-labelledby="what-reports-prove"
        className="border-b border-[#262626] bg-[#050505] py-20 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="type-eyebrow text-[#9CCB63] block">
                Scientific Diagnostics
              </span>
              <h2
                id="what-reports-prove"
                className="font-serif text-3xl sm:text-4xl text-[#F5F5F0] font-normal"
              >
                What a Gemstone Laboratory Report Confirms
              </h2>
              <p className="text-sm text-[#9A9A94] font-light leading-relaxed">
                An accredited gemological report is a scientific determination performed by professional gemologists using diagnostic instrumentation. It provides factual findings rather than subjective opinions.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-[#0A0A0A] border border-[#262626] rounded-[4px] space-y-3">
                <div className="p-2 bg-[#111111] border border-[#9CCB63]/30 text-[#9CCB63] w-fit rounded-[2px]">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-[#F5F5F0]">
                  Mineral Species Identification
                </h3>
                <p className="text-xs text-[#9A9A94] font-light leading-relaxed">
                  Confirms the exact mineral group and variety (e.g., Natural Elbaite Tourmaline, Spodumene, or Beryl) based on refractive index, specific gravity, and molecular spectroscopy.
                </p>
              </div>

              <div className="p-6 bg-[#0A0A0A] border border-[#262626] rounded-[4px] space-y-3">
                <div className="p-2 bg-[#111111] border border-[#9CCB63]/30 text-[#9CCB63] w-fit rounded-[2px]">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-[#F5F5F0]">
                  Natural vs. Synthetic Separation
                </h3>
                <p className="text-xs text-[#9A9A94] font-light leading-relaxed">
                  Verifies whether the specimen crystallized naturally within the earth or was synthesized artificially in a laboratory growth facility.
                </p>
              </div>

              <div className="p-6 bg-[#0A0A0A] border border-[#262626] rounded-[4px] space-y-3">
                <div className="p-2 bg-[#111111] border border-[#9CCB63]/30 text-[#9CCB63] w-fit rounded-[2px]">
                  <Search className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-[#F5F5F0]">
                  Treatment Detection
                </h3>
                <p className="text-xs text-[#9A9A94] font-light leading-relaxed">
                  Documents whether the crystal shows diagnostic evidence of artificial thermal treatment, irradiation, resin infusion, or surface diffusion.
                </p>
              </div>

              <div className="p-6 bg-[#0A0A0A] border border-[#262626] rounded-[4px] space-y-3">
                <div className="p-2 bg-[#111111] border border-[#9CCB63]/30 text-[#9CCB63] w-fit rounded-[2px]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-[#F5F5F0]">
                  Physical Parameters
                </h3>
                <p className="text-xs text-[#9A9A94] font-light leading-relaxed">
                  Provides exact hydrostatic carat weight, three-dimensional physical measurements, and color description under standard D65 daylight illumination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Trade Distinction: Reports vs. Commercial Appraisals */}
      <section
        aria-labelledby="distinction-heading"
        className="border-b border-[#262626] bg-[#0A0A0A] py-20 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 bg-[#111111] border border-[#262626] rounded-[4px] space-y-8">
            <div className="space-y-3 max-w-3xl">
              <span className="type-eyebrow text-[#9CCB63] block">
                Trade Clarity
              </span>
              <h2
                id="distinction-heading"
                className="font-serif text-2xl sm:text-4xl text-[#F5F5F0] font-normal"
              >
                Distinguishing Scientific Reports from Commercial Appraisals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#9A9A94] font-light leading-relaxed">
              <div className="space-y-3 p-6 bg-[#050505] border border-[#1A1A1A] rounded-[4px]">
                <h3 className="font-serif text-lg text-[#F5F5F0]">
                  Gemological Identification Report
                </h3>
                <p>
                  A scientific document issued by an independent laboratory stating objective physical, optical, and spectroscopic measurements. It establishes mineral truth and treatment status. It does not provide monetary valuation or price guarantees.
                </p>
              </div>

              <div className="space-y-3 p-6 bg-[#050505] border border-[#1A1A1A] rounded-[4px]">
                <h3 className="font-serif text-lg text-[#F5F5F0]">
                  Commercial Valuation or Appraisal
                </h3>
                <p>
                  A subjective monetary estimate based on retail or wholesale market conditions at a specific date. Commercial appraisals can vary widely between appraisers and do not constitute scientific mineral verification.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#9A9A94] pt-4 border-t border-[#1A1A1A]">
              Saif Trading Co utilizes and provides independent gemological laboratory reports exclusively for scientific mineral verification and treatment disclosure, not for subjective commercial valuation claims.
            </p>
          </div>
        </div>
      </section>

      {/* Saif Trading Co Practice & Protocol */}
      <section
        aria-labelledby="saif-protocol"
        className="border-b border-[#262626] bg-[#050505] py-20 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="type-eyebrow text-[#9CCB63] block">
                Our Verification Policy
              </span>
              <h2
                id="saif-protocol"
                className="font-serif text-3xl sm:text-4xl text-[#F5F5F0] font-normal"
              >
                How We Handle Certification at Saif Trading Co
              </h2>
              <div className="space-y-4 text-sm text-[#9A9A94] font-light leading-relaxed">
                <p>
                  Where an individual rough specimen in our portfolio has undergone independent testing, the certifying laboratory name and certificate reference number are documented openly within the specimen record.
                </p>
                <p>
                  For specimens where third-party laboratory reports have not yet been commissioned, prospective trade buyers may request independent testing prior to dispatch. We can arrange examination through accredited gemological laboratories in Hong Kong upon commercial agreement.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <LinkButton href="/contact" variant="primary" size="md">
                  Inquire Regarding Testing
                </LinkButton>
                <Link
                  href="/education/certification-guide"
                  className="px-6 py-3 border border-[#262626] hover:border-[#9CCB63] text-xs uppercase tracking-[0.18em] text-[#9A9A94] hover:text-[#9CCB63] text-center transition-colors inline-flex items-center justify-center gap-2 rounded-[4px]"
                >
                  <span>Read Technical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 bg-[#0A0A0A] border border-[#262626] rounded-[4px] space-y-4">
              <h3 className="font-serif text-xl text-[#F5F5F0]">
                Verification Checklist for Buyers
              </h3>
              <ul className="space-y-3 text-xs text-[#9A9A94] font-light">
                <li className="flex items-start gap-2">
                  <span className="text-[#9CCB63] font-bold">1.</span>
                  <span>Confirm species identification on the laboratory official digital database.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9CCB63] font-bold">2.</span>
                  <span>Verify that reported carat weight and dimensions match physical measurements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9CCB63] font-bold">3.</span>
                  <span>Review treatment conclusion line for &ldquo;No indications of heating/treatment&rdquo; statements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#9CCB63] font-bold">4.</span>
                  <span>Inspect crystal terminations and surface striations under balanced illumination.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
