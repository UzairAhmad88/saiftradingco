import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  constructMetadata,
  siteConfig,
  getBreadcrumbListSchema,
} from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleTableOfContents } from "@/components/education/ArticleTableOfContents";
import { RelatedArticles } from "@/components/education/RelatedArticles";
import { RelatedGemstonesSection } from "@/components/gemstones/RelatedGemstonesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import {
  getEducationArticleBySlug,
  getAllEducationSlugs,
  getRelatedArticles,
} from "@/lib/data/education-data";
import { getGemstones } from "@/lib/data/collections-data";
import { ArrowRight, Clock } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const toAbsoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")
    ? pathOrUrl
    : `${siteConfig.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;

// 1. Static Parameter Generation for Educational Guides
export async function generateStaticParams() {
  const slugs = getAllEducationSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getEducationArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Saif Trading Co",
      description: "The requested educational guide could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const metadata = constructMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    canonical: `/education/${article.slug}`,
  });

  if (article.heroImage) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: toAbsoluteUrl(article.heroImage),
          width: 1200,
          height: 800,
          alt: article.title,
        },
      ],
    };
  }

  return metadata;
}

// 3. Article Server Component
export default async function EducationArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getEducationArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  // If article relates to a mineral family, fetch relevant rough specimens; otherwise fetch featured specimens
  const relatedGemstones = article.relatedCollectionSlug
    ? getGemstones({
        categorySlug: article.relatedCollectionSlug,
        pageSize: 3,
      }).gemstones
    : getGemstones({
        pageSize: 3,
      }).gemstones;

  const breadcrumbs = [
    { label: "Education", href: "/education" },
    { label: article.title },
  ];

  const breadcrumbSchema = getBreadcrumbListSchema(breadcrumbs);

  // Schema.org Article JSON-LD (Factual only, publisher: Saif Trading Co)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.shortDescription,
    image: article.heroImage ? toAbsoluteUrl(article.heroImage) : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/education/${article.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#FAF9F5] focus:outline-none"
      >
        {/* Breadcrumb Header */}
        <div className="border-b border-[#E2DFD7] bg-[#F5F3EE]">
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Article Header & Hero — Off-White Editorial Canvas */}
        <article className="border-b border-[#E2DFD7] bg-[#FAF9F5] py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-[#4D6618] px-3 py-1 border border-[#D4D1C7] bg-[#E2DFD7] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] rounded-[3px] font-semibold">
                {article.category}
              </span>

              <div className="flex items-center gap-1.5 text-[#777772] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readingTime}</span>
              </div>
            </div>

            {/* Single Semantic H1 */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#050505] tracking-tight leading-[1.1] text-balance">
              {article.title}
            </h1>

            {/* Lead Paragraph with Light Green Accent Bar */}
            <p className="text-base sm:text-lg text-[#333330] font-light leading-relaxed border-l-2 border-[#B6D94C] pl-6 py-1">
              {article.shortDescription}
            </p>

            {/* Hero Image Frame in Black Luxury Container */}
            {article.heroImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050505] border border-[#242424] rounded-[4px] shadow-2xl">
                <Image
                  src={article.heroImage}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Table of Contents Navigation */}
            <ArticleTableOfContents items={article.tableOfContents} />

            {/* Article Content Body (Constrained Readable Width) */}
            <div className="pt-8 space-y-12 max-w-3xl">
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="space-y-4 scroll-mt-24"
                >
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#050505] font-normal tracking-tight pt-4 border-t border-[#E2DFD7]">
                    {section.heading}
                  </h2>

                  <div className="space-y-4 text-sm sm:text-base text-[#333330] font-light leading-relaxed">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {section.subSections && (
                    <div className="space-y-6 pt-4">
                      {section.subSections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <h3 className="font-serif text-lg sm:text-xl text-[#050505] font-normal">
                            {sub.heading}
                          </h3>
                          <div className="space-y-2 text-xs sm:text-sm text-[#555550] font-light leading-relaxed">
                            {sub.paragraphs.map((subP, subPIdx) => (
                              <p key={subPIdx}>{subP}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Contextual Link to Collection — Dry Black Surface */}
            <div className="mt-12 p-6 bg-[#0C0C0C] border border-[#242424] rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-[#F5F3EE]">
                  {article.relatedCollectionSlug
                    ? `Explore Rough ${article.mineralFamily} Specimens`
                    : "Explore Our Rough Gemstone Catalogue"}
                </h3>
                <p className="text-xs text-[#A5A5A0] font-light">
                  {article.relatedCollectionSlug
                    ? "Inspect physical specimens with carat weights and crystal terminations in our catalogue."
                    : "Inspect natural rough Tourmaline, Kunzite, and Morganite crystal specimens with documented physical specifications."}
                </p>
              </div>
              <Link
                href={article.relatedCollectionSlug ? `/collections/${article.relatedCollectionSlug}` : "/collections"}
                className="shrink-0 px-5 py-2.5 bg-[#B6D94C] text-[#050505] hover:bg-[#A3C73A] rounded-[4px] text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 font-bold shadow-sm"
              >
                <span>{article.relatedCollectionSlug ? "View Collection" : "Browse All Collections"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </article>

        {/* Related Rough Gemstones — Dry Black Foundation */}
        {relatedGemstones.length > 0 && (
          <section className="border-b border-[#242424] bg-[#050505] py-16 sm:py-20 text-[#F5F3EE]">
            <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
              <RelatedGemstonesSection
                relatedGemstones={relatedGemstones}
                categoryName={article.mineralFamily || "Catalogue Specimens"}
                categorySlug={article.relatedCollectionSlug || "collections"}
              />
            </div>
          </section>
        )}

        {/* Related Technical Articles Strip — Off-White Editorial Breathing Space */}
        <section className="border-b border-[#E2DFD7] bg-[#F5F3EE] py-16 sm:py-20">
          <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </section>

        {/* Trade Consultation CTA — Dry Black Contrast Ending Section */}
        <section className="bg-[#050505] py-16 sm:py-20 text-[#F5F3EE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="type-eyebrow text-[#B6D94C] block">
              Trade Correspondence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F3EE]">
              Questions Regarding Mineral Specifications?
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A5A0] font-light max-w-xl mx-auto leading-relaxed">
              Contact our Hong Kong trade desk to discuss crystal characteristics, specific carat weight requirements, or independent laboratory documentation.
            </p>
            <div className="pt-2 flex justify-center">
              <LinkButton href="/contact" variant="primary" size="md">
                Contact Our Hong Kong Office
              </LinkButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
