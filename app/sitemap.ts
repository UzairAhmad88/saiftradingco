import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import {
  ALL_DEMO_GEMSTONES,
  COLLECTIONS_DATA,
} from "@/lib/data/collections-data";
import { EDUCATION_ARTICLES } from "@/lib/data/education-data";
import { createServerClientInstance } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data/gemstones-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Core Primary Site Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/collections`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/certification`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/education`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Collection Category Routes (Active Categories Only)
  const categoryRoutes: MetadataRoute.Sitemap = COLLECTIONS_DATA.map((cat) => ({
    url: `${SITE_URL}/collections/${cat.slug}`,
    lastModified: cat.created_at ? new Date(cat.created_at) : new Date("2026-03-01T00:00:00Z"),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Published Gemstone Detail Routes (Strictly status in 'available', 'sold')
  // Draft and hidden specimens are explicitly excluded from sitemap
  let publishedGemstones: Array<{ slug: string; updated_at: string; status: string }>;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from("gemstones")
        .select("slug, updated_at, status")
        .in("status", ["available", "sold"]);

      if (!error && data && data.length > 0) {
        publishedGemstones = data;
      } else {
        publishedGemstones = ALL_DEMO_GEMSTONES.filter(
          (g) => g.status === "available" || g.status === "sold"
        ).map((g) => ({
          slug: g.slug,
          updated_at: g.updated_at,
          status: g.status,
        }));
      }
    } catch {
      publishedGemstones = ALL_DEMO_GEMSTONES.filter(
        (g) => g.status === "available" || g.status === "sold"
      ).map((g) => ({
        slug: g.slug,
        updated_at: g.updated_at,
        status: g.status,
      }));
    }
  } else {
    publishedGemstones = ALL_DEMO_GEMSTONES.filter(
      (g) => g.status === "available" || g.status === "sold"
    ).map((g) => ({
      slug: g.slug,
      updated_at: g.updated_at,
      status: g.status,
    }));
  }

  const gemstoneRoutes: MetadataRoute.Sitemap = publishedGemstones.map((gem) => ({
    url: `${SITE_URL}/gemstones/${gem.slug}`,
    lastModified: gem.updated_at ? new Date(gem.updated_at) : new Date("2026-03-01T00:00:00Z"),
    changeFrequency: gem.status === "available" ? "weekly" : "monthly",
    priority: gem.status === "available" ? 0.8 : 0.6,
  }));

  // 4. Educational Articles & Guides
  const educationRoutes: MetadataRoute.Sitemap = EDUCATION_ARTICLES.map((art) => ({
    url: `${SITE_URL}/education/${art.slug}`,
    lastModified: new Date("2026-03-01T00:00:00Z"),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...gemstoneRoutes,
    ...educationRoutes,
  ];
}
