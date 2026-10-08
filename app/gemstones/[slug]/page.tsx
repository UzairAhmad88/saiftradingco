import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  constructMetadata,
  siteConfig,
  getBreadcrumbListSchema,
} from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GemstoneGallery } from "@/components/gemstones/GemstoneGallery";
import { GemstoneIdentity } from "@/components/gemstones/GemstoneIdentity";
import { GemstoneSpecifications } from "@/components/gemstones/GemstoneSpecifications";
import { GemstoneDescription } from "@/components/gemstones/GemstoneDescription";
import { CertificationSection } from "@/components/gemstones/CertificationSection";
import { GemstoneInquiryCTA } from "@/components/gemstones/GemstoneInquiryCTA";
import { RelatedGemstonesSection } from "@/components/gemstones/RelatedGemstonesSection";
import { RelatedEducation } from "@/components/collections/RelatedEducation";
import { RelatedCollections } from "@/components/collections/RelatedCollections";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getRelatedGemstones,
  getAllGemstoneSlugs,
} from "@/lib/data/collections-data";
import { getDbGemstoneBySlug } from "@/lib/data/gemstones-db";

interface GemstonePageProps {
  params: Promise<{ slug: string }>;
}

const toAbsoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")
    ? pathOrUrl
    : `${siteConfig.url}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;

// 1. Static Parameter Generation for Known Gemstones
export async function generateStaticParams() {
  const slugs = getAllGemstoneSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
}: GemstonePageProps): Promise<Metadata> {
  const { slug } = await params;
  const gemstone = await getDbGemstoneBySlug(slug);

  if (!gemstone || gemstone.status === "draft" || (gemstone.status as string) === "hidden") {
    return {
      title: "Gemstone Not Found | Saif Trading Co",
      description: "The requested gemstone specimen record could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const categoryName = gemstone.category?.name || "Gemstone";
  const pageTitle = `${gemstone.name} — Rough ${categoryName} | Saif Trading Co`;
  const primaryImage = gemstone.images?.[0]?.image_url;

  const pageDescription =
    gemstone.short_description ||
    `Natural rough ${categoryName} specimen (${gemstone.carat_weight} ct) with documented physical dimensions and crystalline habit from Saif Trading Co in Hong Kong.`;

  const metadata = constructMetadata({
    title: pageTitle,
    description: pageDescription,
    canonical: `/gemstones/${gemstone.slug}`,
  });

  if (primaryImage) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: toAbsoluteUrl(primaryImage),
          width: 1200,
          height: 900,
          alt: gemstone.name,
        },
      ],
    };
  }

  return metadata;
}

// 3. Gemstone Detail Page Server Component
export default async function GemstoneDetailPage({ params }: GemstonePageProps) {
  const { slug } = await params;
  const gemstone = await getDbGemstoneBySlug(slug);

  // Trigger Next.js 404 if gemstone does not exist or is not public
  if (!gemstone || gemstone.status === "draft" || (gemstone.status as string) === "hidden") {
    notFound();
  }

  const relatedGemstones = getRelatedGemstones(gemstone, 3);
  const categoryName = gemstone.category?.name || "Gemstones";
  const categorySlug = gemstone.category?.slug || "collections";

  const breadcrumbs = [
    { label: "Collections", href: "/collections" },
    { label: categoryName, href: `/collections/${categorySlug}` },
    { label: gemstone.name },
  ];

  const breadcrumbSchema = getBreadcrumbListSchema(breadcrumbs);

  // Schema.org Product Structured Data (Strictly factual - no fake prices or fake reviews)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: gemstone.name,
    description: gemstone.description || gemstone.short_description,
    image: gemstone.images?.map((img) => toAbsoluteUrl(img.image_url)),
    sku: gemstone.sku || undefined,
    category: `Rough ${categoryName}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    // Factual offer mapping: only include offer if actual numeric price is configured
    offers: gemstone.price && gemstone.price > 0 ? {
      "@type": "Offer",
      price: gemstone.price,
      priceCurrency: gemstone.currency || "USD",
      availability: gemstone.status === "available"
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      url: `${siteConfig.url}/gemstones/${gemstone.slug}`,
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    } : undefined,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
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

        {/* Specimen Hero: Dual-Column Photography (Gallery) & Black Information Panel */}
        <section
          aria-labelledby="gemstone-detail-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
        >
          <div className="sr-only">
            <h2 id="gemstone-detail-heading">
              {gemstone.name} Specimen Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Multi-Angle Image Gallery & Lightbox */}
            <div className="lg:col-span-7">
              <GemstoneGallery
                images={gemstone.images || []}
                gemstoneName={gemstone.name}
                isSold={gemstone.status === "sold"}
                has360View={
                  gemstone.slug === "rough-green-tourmaline-crystal" ||
                  gemstone.slug.includes("tourmaline")
                }
              />
            </div>

            {/* Right Column: Black Information Panel */}
            <div className="lg:col-span-5">
              <GemstoneIdentity gemstone={gemstone} />
            </div>
          </div>
        </section>

        {/* Technical Specifications & Descriptive Observation — Off-White Breathing Reading Area */}
        <section
          aria-labelledby="specifications-section-heading"
          className="border-t border-[#E2DFD7] bg-[#F5F3EE] py-16 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sr-only">
              <h2 id="specifications-section-heading">
                Detailed Mineral Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Two-Column Specification List */}
              <div className="lg:col-span-6">
                <GemstoneSpecifications gemstone={gemstone} />
              </div>

              {/* Right Column: In-Depth Mineral Character & Testing Notes */}
              <div className="lg:col-span-6 space-y-10">
                <GemstoneDescription gemstone={gemstone} />
                <CertificationSection gemstone={gemstone} />
              </div>
            </div>
          </div>
        </section>

        {/* Focused In-Page Commercial Inquiry Banner — Dry Black Luxury Container */}
        <section className="border-t border-[#242424] bg-[#080808] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GemstoneInquiryCTA gemstone={gemstone} />
          </div>
        </section>

        {/* Comparative Related Gemstones */}
        {relatedGemstones.length > 0 && (
          <section className="border-t border-[#242424] bg-[#050505] py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedGemstonesSection
                relatedGemstones={relatedGemstones}
                categoryName={categoryName}
                categorySlug={categorySlug}
              />
            </div>
          </section>
        )}

        {/* Related Mineral Knowledge Guides */}
        <RelatedEducation categorySlug={categorySlug} />

        {/* Cross-Collection Navigation */}
        <RelatedCollections currentCategorySlug={categorySlug} />
      </main>
    </>
  );
}
