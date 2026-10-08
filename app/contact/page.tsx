import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata, siteConfig } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactInfo } from "@/components/contact/ContactInfo";
import {
  InquiryForm,
  type SelectedGemstoneContext,
} from "@/components/contact/InquiryForm";
import { getDbGemstoneBySlug } from "@/lib/data/gemstones-db";
import { ArrowRight, BookOpen, ShieldCheck, Gem } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Contact Saif Trading Co | Rough Gemstone Supplier Hong Kong",
  description:
    "Direct trade contact channels for Saif Trading Co in Hung Hom, Kowloon, Hong Kong. Inquire about natural rough Tourmaline, Kunzite, and Morganite crystal specimens.",
  canonical: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<{
    gemstone?: string;
    type?: string;
  }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { gemstone: gemstoneSlug, type: typeParam } = await searchParams;

  // Resolve gemstone context safely if provided via query parameter
  let initialGemstone: SelectedGemstoneContext | null = null;
  if (gemstoneSlug) {
    const specimen = await getDbGemstoneBySlug(gemstoneSlug);
    if (specimen) {
      initialGemstone = {
        slug: specimen.slug,
        name: specimen.name,
        sku: specimen.sku ?? undefined,
        category: specimen.category?.name,
        image: specimen.images?.[0]?.image_url,
      };
    }
  }

  const breadcrumbs = [{ label: "Contact" }];

  // Schema.org Structured Data
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Saif Trading Co",
    description:
      "Direct trade contact channels for rough gemstone procurement in Hong Kong.",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        addressCountry: siteConfig.address.addressCountry,
      },
      telephone: siteConfig.telephone,
      email: siteConfig.email,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${siteConfig.url}/contact`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#050505] text-[#F5F3EE] focus:outline-none"
      >
        {/* Breadcrumb Header */}
        <div className="border-b border-[#242424] bg-[#080808]">
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Hero Section — Dry Black Environment */}
        <section
          aria-labelledby="contact-heading"
          className="border-b border-[#242424] bg-[#050505] py-16 sm:py-20 lg:py-24"
        >
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#B6D94C]/30 bg-[#B6D94C]/10 text-[#B6D94C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B6D94C]" aria-hidden="true" />
                <span className="font-medium">Direct Trade Correspondence · Hong Kong</span>
              </div>
              <h1
                id="contact-heading"
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F3EE] font-semibold tracking-tight leading-[1.08]"
              >
                LET&apos;S DISCUSS YOUR<br />NEXT GEMSTONE.
              </h1>
              <p className="text-base sm:text-lg text-[#A5A5A0] font-light leading-relaxed max-w-2xl pt-2">
                Whether you are seeking a specific rough Tourmaline crystal, a Kunzite crystal specimen, or a Morganite lot, our Hong Kong office welcomes your trade correspondence.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content: Contact Information + Inquiry Form */}
        <section
          aria-labelledby="contact-details-heading"
          className="py-16 sm:py-24 w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16"
        >
          <h2 id="contact-details-heading" className="sr-only">
            Contact Details and Trade Inquiry Form
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Contact Information (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>

            {/* Right Column: Inquiry Form (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <InquiryForm
                initialGemstone={initialGemstone}
                initialType={typeParam}
              />
            </div>
          </div>
        </section>

        {/* Bottom Contextual Navigation Strip */}
        <section
          aria-labelledby="contact-explore-heading"
          className="border-t border-[#242424] bg-[#080808] py-14"
        >
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#242424] pb-8 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B6D94C] block font-medium">
                  Inventory &amp; Education
                </span>
                <h2
                  id="contact-explore-heading"
                  className="font-serif text-2xl text-[#F5F3EE] font-normal mt-1"
                >
                  Explore Further Resources
                </h2>
              </div>
              <p className="text-xs text-[#A5A5A0] max-w-md">
                Review available inventory specifications or research mineralogical criteria before initiating physical viewing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link
                href="/collections"
                className="group p-5 bg-[#0C0C0C] border border-[#242424] rounded-[2px] hover:border-[#B6D94C]/60 transition-colors block"
              >
                <div className="flex items-center justify-between text-xs text-[#B6D94C] uppercase tracking-wider mb-2 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Gem className="w-3.5 h-3.5 text-[#B6D94C]" aria-hidden="true" />
                    Catalogue
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium text-[#F5F3EE] group-hover:text-[#B6D94C] transition-colors">
                  Rough Collections
                </h3>
                <p className="text-xs text-[#A5A5A0] mt-1.5 leading-relaxed">
                  Browse available Tourmaline, Kunzite, and Morganite crystal specimens.
                </p>
              </Link>

              <Link
                href="/certification"
                className="group p-5 bg-[#0C0C0C] border border-[#242424] rounded-[2px] hover:border-[#B6D94C]/60 transition-colors block"
              >
                <div className="flex items-center justify-between text-xs text-[#B6D94C] uppercase tracking-wider mb-2 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B6D94C]" aria-hidden="true" />
                    Standards
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium text-[#F5F3EE] group-hover:text-[#B6D94C] transition-colors">
                  Certification
                </h3>
                <p className="text-xs text-[#A5A5A0] mt-1.5 leading-relaxed">
                  Learn how gemstone testing reports and laboratory documentation work.
                </p>
              </Link>

              <Link
                href="/education"
                className="group p-5 bg-[#0C0C0C] border border-[#242424] rounded-[2px] hover:border-[#B6D94C]/60 transition-colors block"
              >
                <div className="flex items-center justify-between text-xs text-[#B6D94C] uppercase tracking-wider mb-2 font-medium">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#B6D94C]" aria-hidden="true" />
                    Guides
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-medium text-[#F5F3EE] group-hover:text-[#B6D94C] transition-colors">
                  Educational Hub
                </h3>
                <p className="text-xs text-[#A5A5A0] mt-1.5 leading-relaxed">
                  Read mineral family guides on morphology, pleochroism, and crystal care.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
