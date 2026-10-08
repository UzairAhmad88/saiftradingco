import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata, getBreadcrumbListSchema } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { GemstoneCard } from "@/components/gemstones/GemstoneCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDbCategories, getDbFeaturedGemstones } from "@/lib/data/gemstones-db";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Gemstone Collections | Saif Trading Co",
  description:
    "Explore rough gemstone collections from Saif Trading Co in Hong Kong, specializing in natural Tourmaline, Kunzite, and Morganite crystal specimens with documented physical specifications.",
  canonical: "/collections",
});

export default async function CollectionsPage() {
  const collections = await getDbCategories();
  const featuredGemstones = await getDbFeaturedGemstones(3);

  const breadcrumbs = [
    { label: "Collections" },
  ];

  const breadcrumbSchema = getBreadcrumbListSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#E5F1D2] focus:outline-none"
      >
      {/* Breadcrumb Navigation Header */}
      <div className="border-b border-[#D4DEC5] bg-[#CFE7AA]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Collections Catalogue Hero */}
      <section
        aria-labelledby="collections-page-heading"
        className="border-b border-[#D4DEC5] bg-[#E5F1D2] py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#294D2C]/20 bg-[#CFE7AA] text-[#294D2C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#294D2C]" aria-hidden="true" />
              <span className="font-medium">Mineral Catalogue · Hong Kong</span>
            </div>

            <h1
              id="collections-page-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#050505] tracking-tight leading-[1.08]"
            >
              Rough Gemstone Collections
            </h1>

            <p className="text-base sm:text-lg text-[#777A70] font-light leading-relaxed">
              Saif Trading Co supplies selected rough crystalline minerals from our registered Hong Kong trade office. We focus our catalogue on three primary mineral families—Tourmaline, Kunzite, and Morganite—documented with physical dimensions, weights, and crystalline habits.
            </p>
          </div>
        </div>
      </section>

      {/* Category Showcase Trio — Off-White Rhythm */}
      <section
        aria-labelledby="categories-showcase-heading"
        className="border-b border-[#D4DEC5] bg-[#F7F7F1] py-20 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div className="space-y-3">
              <span className="type-eyebrow text-[#294D2C] block">
                Primary Categories
              </span>
              <h2
                id="categories-showcase-heading"
                className="font-serif text-3xl sm:text-4xl text-[#050505] font-normal"
              >
                Explore by Mineral Family
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#777A70] font-light max-w-md">
              Select a crystal category to view individual specimens, filter by carat weight or availability, and inspect physical properties.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {collections.map((col) => (
              <CollectionCard
                key={col.slug}
                title={col.name}
                slug={col.slug}
                description={col.description || ""}
                imageUrl={col.image || undefined}
                specimenCount={col.specimenCount}
                featured={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Selected Featured Specimens Across Collections — Light Green Base */}
      <section
        aria-labelledby="featured-specimens-heading"
        className="border-b border-[#D4DEC5] bg-[#E5F1D2] py-20 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div className="space-y-3">
              <span className="type-eyebrow text-[#294D2C] block">
                Curated Selection
              </span>
              <h2
                id="featured-specimens-heading"
                className="font-serif text-3xl sm:text-4xl text-[#050505] font-normal"
              >
                Featured Rough Crystals
              </h2>
            </div>
            <span className="text-xs text-[#777A70]">
              High-clarity specimens currently available for inquiry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGemstones.map((gemstone) => (
              <GemstoneCard
                key={gemstone.id}
                gemstone={gemstone}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mineral Knowledge & Verification Guidance Strip — Black Contrast Section */}
      <section
        aria-labelledby="catalogue-standards-heading"
        className="bg-[#050505] py-16 sm:py-20 text-[#F7F7F1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Guide to Certification */}
            <div className="p-8 bg-[#101010] border border-[#262626] rounded-[4px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex p-2.5 bg-[#1A1A1A] border border-[#B7D98B]/30 text-[#B7D98B] rounded-[3px]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-[#F7F7F1]">
                  Verification &amp; Testing Standards
                </h3>
                <p className="text-xs sm:text-sm text-[#EDEDE4]/70 font-light leading-relaxed">
                  Understand how natural crystal species are confirmed and how laboratory reports are documented across our rough gemstone collections.
                </p>
              </div>
              <div className="pt-4 border-t border-[#262626]">
                <Link
                  href="/certification"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B7D98B] hover:text-[#CFE7AA] transition-colors"
                >
                  <span>Learn About Certification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Mineral Guides Archive */}
            <div className="p-8 bg-[#101010] border border-[#262626] rounded-[4px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex p-2.5 bg-[#1A1A1A] border border-[#B7D98B]/30 text-[#B7D98B] rounded-[3px]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-[#F7F7F1]">
                  Mineral Education Archive
                </h3>
                <p className="text-xs sm:text-sm text-[#EDEDE4]/70 font-light leading-relaxed">
                  Explore educational notes on crystal systems, cleavage planes, and optical behavior in rough Tourmaline, Kunzite, and Morganite.
                </p>
              </div>
              <div className="pt-4 border-t border-[#262626]">
                <Link
                  href="/education"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B7D98B] hover:text-[#CFE7AA] transition-colors"
                >
                  <span>Browse Technical Guides</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
