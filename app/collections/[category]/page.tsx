import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  constructMetadata,
  siteConfig,
  getBreadcrumbListSchema,
} from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CollectionHero } from "@/components/collections/CollectionHero";
import { CollectionControls } from "@/components/collections/CollectionControls";
import { CollectionGrid } from "@/components/collections/CollectionGrid";
import { Pagination } from "@/components/collections/Pagination";
import { RelatedCollections } from "@/components/collections/RelatedCollections";
import { RelatedEducation } from "@/components/collections/RelatedEducation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCollections,
  getCollectionBySlug,
  type GemstoneFilterOptions,
} from "@/lib/data/collections-data";
import { getDbGemstones } from "@/lib/data/gemstones-db";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    search?: string;
    status?: "all" | "available" | "sold";
    color?: string;
    carat?: "all" | "under-50" | "50-100" | "over-100";
    sort?: "featured" | "newest" | "carat-asc" | "carat-desc" | "name-asc" | "name-desc";
    page?: string;
  }>;
}

// 1. Static Parameter Generation for Known Specialties
export async function generateStaticParams() {
  const collections = getCollections();
  return collections.map((c) => ({
    category: c.slug,
  }));
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCollectionBySlug(categorySlug);

  if (!category) {
    return {
      title: "Collection Not Found | Saif Trading Co",
      description: "The requested gemstone collection could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const resolvedSearchParams = await searchParams;
  // If an internal search query is active, avoid indexing endless query parameter variations
  const isSearchQuery = Boolean(resolvedSearchParams.search && resolvedSearchParams.search.trim().length > 0);

  const pageTitle = `Rough ${category.name} Crystals | Saif Trading Co`;
  const pageDescription = `Explore natural rough ${category.name} specimens from Saif Trading Co in Hong Kong. Documented ${category.mineralGroup} crystals with exact carat weights, physical dimensions, and crystalline terminations.`;

  return constructMetadata({
    title: pageTitle,
    description: pageDescription,
    canonical: `/collections/${category.slug}`,
    noIndex: isSearchQuery,
  });
}

// 3. Category Page Server Component
export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCollectionBySlug(categorySlug);

  // Trigger Next.js 404 if category is invalid
  if (!category) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const filterOptions: GemstoneFilterOptions = {
    categorySlug: category.slug,
    search: resolvedSearchParams.search || "",
    status: resolvedSearchParams.status || "all",
    color: resolvedSearchParams.color || "all",
    caratRange: resolvedSearchParams.carat || "all",
    sort: resolvedSearchParams.sort || "featured",
    page: currentPage,
    pageSize: 9,
  };

  const {
    gemstones,
    total,
    page,
    totalPages,
    availableColors,
  } = await getDbGemstones(filterOptions);

  const breadcrumbs = [
    { label: "Collections", href: "/collections" },
    { label: category.name },
  ];

  const breadcrumbSchema = getBreadcrumbListSchema(breadcrumbs);

  // ItemList structured data for search engines
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Rough ${category.name} Collection`,
    description: category.description,
    numberOfItems: total,
    itemListElement: gemstones.map((g, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: g.name,
      url: `${siteConfig.url}/gemstones/${g.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full bg-[#050505] focus:outline-none"
      >
        {/* Breadcrumb Navigation */}
        <div className="border-b border-[#262626] bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Category Hero Banner */}
        <CollectionHero category={category} />

        {/* Gemstones Catalogue Results Section */}
        <section
          aria-labelledby="collection-results-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="sr-only">
            <h2 id="collection-results-heading">
              Rough {category.name} Specimens Catalogue
            </h2>
          </div>

          {/* Interactive Search, Filter, and Sort Controls */}
          <CollectionControls
            totalCount={total}
            availableColors={availableColors}
            initialSearch={resolvedSearchParams.search || ""}
            initialStatus={resolvedSearchParams.status || "all"}
            initialColor={resolvedSearchParams.color || "all"}
            initialCarat={resolvedSearchParams.carat || "all"}
            initialSort={resolvedSearchParams.sort || "featured"}
          />

          {/* Gemstone Cards Grid */}
          <CollectionGrid
            gemstones={gemstones}
            resetHref={`/collections/${category.slug}`}
          />

          {/* Crawlable Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/collections/${category.slug}`}
            queryParams={{
              search: resolvedSearchParams.search,
              status: resolvedSearchParams.status,
              color: resolvedSearchParams.color,
              carat: resolvedSearchParams.carat,
              sort: resolvedSearchParams.sort,
            }}
          />
        </section>

        {/* Related Education Technical Guides */}
        <RelatedEducation categorySlug={category.slug} />

        {/* Related Mineral Collections */}
        <RelatedCollections currentCategorySlug={category.slug} />
      </main>
    </>
  );
}
