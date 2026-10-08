import type { Metadata } from "next";

/**
 * Normalized production site URL configuration.
 * Always strips trailing slashes to guarantee clean canonical and sitemap URLs.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "") ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export const siteConfig = {
  name: "Saif Trading Co",
  legalName: "Saif Trading Co",
  description:
    "Hong Kong supplier of natural rough Tourmaline, Kunzite, and Morganite gemstone crystals. Documented physical dimensions, crystalline habits, and transparent commercial correspondence.",
  url: SITE_URL,
  address: {
    streetAddress:
      "417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street",
    addressLocality: "Hung Hom",
    addressRegion: "Kowloon",
    postalCode: "999077",
    addressCountry: "HK",
  },
  telephone: "+852 3525 1640",
  mobiles: ["+852 9064 9593", "+852 6903 7690"],
  email: "Saiftradingco@yahoo.com",
};

export interface ConstructMetadataOptions {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

/**
 * Constructs a fully qualified, standards-compliant Next.js Metadata object.
 * Enforces production canonicalization, OpenGraph, Twitter cards, and robots directives.
 */
export function constructMetadata({
  title,
  description,
  canonical,
  noIndex = false,
  noFollow = false,
  ogType = "website",
  ogImage,
  ogImageAlt,
  publishedTime,
  modifiedTime,
  keywords,
}: ConstructMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Rough Gemstone Supplier Hong Kong`;

  const pageDescription = description || siteConfig.description;

  // Clean canonical URL generation
  const cleanPath = canonical
    ? canonical === "/"
      ? ""
      : canonical.startsWith("/")
      ? canonical
      : `/${canonical}`
    : "";
  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  // Image URL resolution (ensures absolute URL)
  const resolvedOgImage = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
    : undefined;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow && !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noFollow && !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_HK",
      type: ogType,
      ...(ogType === "article" && {
        publishedTime,
        modifiedTime,
      }),
      ...(resolvedOgImage && {
        images: [
          {
            url: resolvedOgImage,
            width: 1200,
            height: 900,
            alt: ogImageAlt || pageTitle,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      ...(resolvedOgImage && {
        images: [resolvedOgImage],
      }),
    },
  };

  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords;
  }

  return metadata;
}

/**
 * Verified Organization Schema (JSON-LD).
 * Contains strictly truthful, documented Hong Kong business information.
 * Zero fabricated reviews, ratings, founders, or awards.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    email: siteConfig.email,
    telephone: siteConfig.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.telephone,
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Cantonese"],
      },
      ...siteConfig.mobiles.map((mobile) => ({
        "@type": "ContactPoint",
        telephone: mobile,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Cantonese"],
      })),
    ],
  };
}

/**
 * Verified WebSite Schema (JSON-LD).
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
    inLanguage: "en-HK",
  };
}

/**
 * BreadcrumbList Schema (JSON-LD).
 * Generates hierarchical item list matching visible breadcrumb navigation.
 */
export function getBreadcrumbListSchema(
  items: Array<{ name?: string; label?: string; path?: string; href?: string }>
) {
  const elements: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ];

  items.forEach((item, index) => {
    const position = index + 2;
    const name = item.name || item.label || "";
    const rawPath = item.path || item.href;
    const itemUrl = rawPath
      ? `${SITE_URL}${rawPath.startsWith("/") ? rawPath : `/${rawPath}`}`
      : undefined;

    elements.push({
      "@type": "ListItem",
      position,
      name,
      ...(itemUrl ? { item: itemUrl } : {}),
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: elements,
  };
}
