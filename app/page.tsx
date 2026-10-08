import React from "react";
import { constructMetadata, getOrganizationSchema, getWebSiteSchema } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { SpecializationsSection } from "@/components/home/SpecializationsSection";
import { FeaturedGemstonesSection } from "@/components/home/FeaturedGemstonesSection";
import { EditorialFeature } from "@/components/home/EditorialFeature";
import { TrustSection } from "@/components/home/TrustSection";
import { EducationSection } from "@/components/home/EducationSection";
import { InquiryCTA } from "@/components/home/InquiryCTA";

export const metadata = constructMetadata({
  title: "Saif Trading Co | Rough Tourmaline, Kunzite & Morganite",
  description:
    "Hong Kong supplier of natural rough Tourmaline, Kunzite, and Morganite gemstone crystals. Documented physical specifications, crystalline habits, and transparent commercial correspondence.",
  canonical: "/",
});

export default function HomePage() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      {/* Search Engine Optimization: Structured Data Schemas */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#050505] focus:outline-none"
      >
        {/* 01 — Hero Experience */}
        <HeroSection />

        {/* 02 — Business Introduction */}
        <IntroSection />

        {/* 03 — Mineral Specializations / Collections */}
        <SpecializationsSection />

        {/* 04 — Curated Featured Gemstones */}
        <FeaturedGemstonesSection />

        {/* 05 — Editorial Gemstone Story */}
        <EditorialFeature />

        {/* 06 — Trust & Verification Standards */}
        <TrustSection />

        {/* 07 — Mineral Knowledge & Education */}
        <EducationSection />

        {/* 08 — Trade Correspondence / Inquiry Call to Action */}
        <InquiryCTA />
      </main>
    </>
  );
}
