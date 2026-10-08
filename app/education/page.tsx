import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata, getBreadcrumbListSchema } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EducationCard } from "@/components/education/EducationCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getEducationArticles } from "@/lib/data/education-data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Mineral Knowledge & Gemstone Guides | Saif Trading Co",
  description:
    "Authoritative technical guides on rough Tourmaline, Kunzite, Morganite, crystal morphology, treatment disclosure, and independent laboratory testing standards.",
  canonical: "/education",
});

export default function EducationPage() {
  const articles = getEducationArticles();
  const featuredArticle = articles[0]; // Tourmaline Guide

  const mineralGuides = articles.filter((a) => a.category === "Mineral Guides");
  const buyingGuides = articles.filter((a) => a.category === "Buying & Evaluation");
  const verificationGuides = articles.filter((a) => a.category === "Verification & Standards");
  const careGuides = articles.filter((a) => a.category === "Specimen Handling");

  const breadcrumbs = [{ label: "Education" }];
  const breadcrumbSchema = getBreadcrumbListSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#050505] focus:outline-none"
      >
        {/* Breadcrumb Header */}
        <div className="border-b border-[#2A2A2A] bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Hero Section */}
        <section
          aria-labelledby="education-hero-heading"
          className="border-b border-[#2A2A2A] bg-[#070707] py-16 sm:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#B69B5E]/30 bg-[#0E0E0E] text-[#B69B5E] text-[10px] sm:text-[11px] uppercase tracking-[0.22em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B69B5E]" aria-hidden="true" />
                <span>Topical Knowledge Hub</span>
              </div>

              <h1
                id="education-hero-heading"
                className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F5F5F5] tracking-tight leading-[1.08]"
              >
                Mineral Knowledge &amp; Guides
              </h1>

              <p className="text-base sm:text-lg text-[#A3A3A3] font-light leading-relaxed">
                Understand the crystalline structures, optical behaviors, evaluation protocols, and laboratory testing standards of rough gemstones. Our technical references are prepared for collectors, gemologists, and lapidary professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Editorial Article */}
        {featuredArticle && (
          <section
            aria-labelledby="featured-guide-heading"
            className="border-b border-[#2A2A2A] bg-[#050505] py-16 sm:py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="sr-only">
                <h2 id="featured-guide-heading">Featured Technical Guide</h2>
              </div>
              <EducationCard article={featuredArticle} featured={true} />
            </div>
          </section>
        )}

        {/* Cluster 1: Crystalline Mineral Guides */}
        <section
          aria-labelledby="mineral-guides-heading"
          className="border-b border-[#2A2A2A] bg-[#080808] py-20 sm:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
              <div className="space-y-3">
                <span className="type-eyebrow text-[#B69B5E] block">
                  Primary Varieties
                </span>
                <h2
                  id="mineral-guides-heading"
                  className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal"
                >
                  Crystalline Mineral Guides
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#A3A3A3] font-light max-w-md">
                Detailed crystallography, prism geometry, and optical evaluation for Tourmaline, Kunzite, and Morganite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mineralGuides.map((guide) => (
                <EducationCard key={guide.slug} article={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* Cluster 2: Buying & Specimen Evaluation */}
        {buyingGuides.length > 0 && (
          <section
            aria-labelledby="buying-guides-heading"
            className="border-b border-[#2A2A2A] bg-[#050505] py-20 sm:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
                <div className="space-y-3">
                  <span className="type-eyebrow text-[#B69B5E] block">
                    Acquisition &amp; Quality Assessment
                  </span>
                  <h2
                    id="buying-guides-heading"
                    className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal"
                  >
                    Buying &amp; Specimen Evaluation
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#A3A3A3] font-light max-w-md">
                  Practical guidelines for inspecting rough crystal terminations, backlighting transparency, and evaluating yield potential.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {buyingGuides.map((guide) => (
                  <EducationCard key={guide.slug} article={guide} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cluster 3: Verification & Laboratory Standards */}
        <section
          aria-labelledby="standards-guides-heading"
          className="border-b border-[#2A2A2A] bg-[#080808] py-20 sm:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
              <div className="space-y-3">
                <span className="type-eyebrow text-[#B69B5E] block">
                  Testing &amp; Transparency
                </span>
                <h2
                  id="standards-guides-heading"
                  className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal"
                >
                  Certification &amp; Treatment Standards
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#A3A3A3] font-light max-w-md">
                Understanding independent laboratory reports, analytical instrumentation, and industry disclosure standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {verificationGuides.map((guide) => (
                <EducationCard key={guide.slug} article={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* Cluster 4: Specimen Care & Handling */}
        {careGuides.length > 0 && (
          <section
            aria-labelledby="care-guides-heading"
            className="border-b border-[#2A2A2A] bg-[#050505] py-20 sm:py-24"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
                <div className="space-y-3">
                  <span className="type-eyebrow text-[#B69B5E] block">
                    Preservation
                  </span>
                  <h2
                    id="care-guides-heading"
                    className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal"
                  >
                    Specimen Handling &amp; Preservation
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#A3A3A3] font-light max-w-md">
                  Safe handling practices for cleavage-sensitive minerals, light management, and archival display mounting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {careGuides.map((guide) => (
                  <EducationCard key={guide.slug} article={guide} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cross-Link Strip to Collections */}
        <section className="bg-[#070707] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F5]">
                Explore Our Physical Gemstone Collections
              </h3>
              <p className="text-xs text-[#A3A3A3] font-light">
                View catalogued specimens of rough Tourmaline, Kunzite, and Morganite with documented physical specifications.
              </p>
            </div>
            <Link
              href="/collections"
              className="shrink-0 px-6 py-3 border border-[#2A2A2A] hover:border-[#B69B5E] bg-[#0F0F0F] text-xs uppercase tracking-[0.2em] text-[#F5F5F5] hover:text-[#B69B5E] transition-all inline-flex items-center gap-2"
            >
              <span>View All Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
