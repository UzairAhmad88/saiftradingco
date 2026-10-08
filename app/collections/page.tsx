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
        className="w-full bg-[#050505] focus:outline-none"
      >
      {/* Breadcrumb Navigation Header */}
      <div className="border-b border-[#242424] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Collections Catalogue Hero — Dry Black Foundation */}
      <section
        aria-labelledby="collections-page-heading"
        className="border-b border-[#242424] bg-[#050505] py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#242424] bg-[#121212] text-[#B6D94C] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[3px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B6D94C]" aria-hidden="true" />
              <span className="font-medium">Mineral Catalogue · Hong Kong</span>
            </div>

            <h1
              id="collections-page-heading"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F5F3EE] tracking-tight leading-[1.08]"
            >
              Rough Gemstone Collections
            </h1>

            <p className="text-base sm:text-lg text-[#A5A5A0] font-light leading-relaxed">
              Saif Trading Co supplies selected rough crystalline minerals from our registered Hong Kong trade office. We focus our catalogue on three primary mineral families—Tourmaline, Kunzite, and Morganite—documented with physical dimensions, weights, and crystalline habits.
            </p>
          </div>
        </div>
      </section>

      {/* Category Showcase Trio — Off-White Editorial Breathing Space */}
      <section
        aria-labelledby="categories-showcase-heading"
        className="border-b border-[#E2DFD7] bg-[#F5F3EE] py-20 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div className="space-y-3">
              <span className="type-eyebrow text-[#4D6618] block">
                Primary Categories
              </span>
              <h2
                id="categories-showcase-heading"
                className="font-serif text-3xl sm:text-4xl text-[#050505] font-normal"
              >
                Explore by Mineral Family
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#555550] font-light max-w-md">
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

      {/* Selected Featured Specimens Across Collections — Dry Black Catalogue */}
      <section
        aria-labelledby="featured-specimens-heading"
        className="border-b border-[#242424] bg-[#080808] py-20 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div className="space-y-3">
              <span className="type-eyebrow text-[#B6D94C] block">
                Curated Selection
              </span>
              <h2
                id="featured-specimens-heading"
                className="font-serif text-3xl sm:text-4xl text-[#F5F3EE] font-normal"
              >
                Featured Rough Crystals
              </h2>
            </div>
            <span className="text-xs text-[#A5A5A0]">
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

      {/* Mineral Knowledge & Verification Guidance Strip — Dry Black Closing Section */}
      <section
        aria-labelledby="catalogue-standards-heading"
        className="bg-[#050505] py-16 sm:py-20 text-[#F5F3EE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Guide to Certification */}
            <div className="p-8 bg-[#0C0C0C] border border-[#242424] rounded-[4px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex p-2.5 bg-[#141414] border border-[#242424] text-[#B6D94C] rounded-[3px]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-[#F5F3EE]">
                  Verification &amp; Testing Standards
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A0] font-light leading-relaxed">
                  Understand how natural crystal species are confirmed and how laboratory reports are documented across our rough gemstone collections.
                </p>
              </div>
              <div className="pt-4 border-t border-[#242424]">
                <Link
                  href="/certification"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B6D94C] hover:text-[#A3C73A] transition-colors"
                >
                  <span>Learn About Certification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Mineral Guides Archive */}
            <div className="p-8 bg-[#0C0C0C] border border-[#242424] rounded-[4px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex p-2.5 bg-[#141414] border border-[#242424] text-[#B6D94C] rounded-[3px]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-[#F5F3EE]">
                  Mineral Education Archive
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A5A0] font-light leading-relaxed">
                  Explore educational notes on crystal systems, cleavage planes, and optical behavior in rough Tourmaline, Kunzite, and Morganite.
                </p>
              </div>
              <div className="pt-4 border-t border-[#242424]">
                <Link
                  href="/education"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B6D94C] hover:text-[#A3C73A] transition-colors"
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
