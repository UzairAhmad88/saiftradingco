import { createServerClientInstance } from "@/lib/supabase/server";
import {
  type CategoryDetail,
  type GemstoneFilterOptions,
  type PaginatedGemstonesResult,
  getGemstones as getLocalGemstones,
  getGemstoneBySlug as getLocalGemstoneBySlug,
  getFeaturedGemstones as getLocalFeaturedGemstones,
  getCollections as getLocalCollections,
  getCollectionBySlug as getLocalCollectionBySlug,
} from "@/lib/data/collections-data";
import type { GemstoneWithDetails, GemstoneImage } from "@/types/gemstone";
import type { InquiryInsert, GemstoneStatus } from "@/types/database";
import { sanitizePostgrestSearch } from "@/lib/utils/security";

/**
 * Interface representing the joined gemstone record returned by Supabase.
 */
interface DbGemstoneJoinedRow {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description?: string | null;
  price: number | null;
  currency: string | null;
  carat_weight: number | null;
  dimensions?: string | null;
  color: string | null;
  clarity?: string | null;
  cut?: string | null;
  origin: string | null;
  treatment?: string | null;
  certificate_lab: string | null;
  certificate_number?: string | null;
  certificate_url?: string | null;
  status: GemstoneStatus;
  featured: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at: string;
  updated_at?: string;
  categories: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  } | null;
  images: Array<{
    id: string;
    gemstone_id: string;
    image_url: string;
    alt_text: string | null;
    sort_order: number;
    is_primary?: boolean;
    created_at?: string;
  }> | null;
}

/**
 * Lightweight in-memory cache for category slug -> ID mapping.
 * Prevents unnecessary sequential roundtrips when filtering catalogue by category.
 */
interface CategorySlugCacheEntry {
  map: Map<string, string>;
  timestamp: number;
}
let categorySlugCache: CategorySlugCacheEntry | null = null;
const CATEGORY_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getCategoryIdBySlug(
  supabase: Awaited<ReturnType<typeof createServerClientInstance>>,
  slug: string
): Promise<string | null> {
  const now = Date.now();
  if (categorySlugCache && now - categorySlugCache.timestamp < CATEGORY_CACHE_TTL_MS) {
    const cached = categorySlugCache.map.get(slug);
    if (cached) return cached;
  }

  const { data: cat } = await supabase
    .from("categories")
    .select("id, slug")
    .eq("slug", slug)
    .single();

  if (cat) {
    if (!categorySlugCache || now - categorySlugCache.timestamp >= CATEGORY_CACHE_TTL_MS) {
      categorySlugCache = { map: new Map(), timestamp: now };
    }
    categorySlugCache.map.set(cat.slug, cat.id);
    return cat.id;
  }
  return null;
}

/**
 * Helper to determine if Supabase environment variables are available.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );
}

/**
 * Fetch all active gemstone categories.
 * Queries Supabase `categories` table with fallback to verified collections data.
 */
export async function getDbCategories(): Promise<CategoryDetail[]> {
  if (!isSupabaseConfigured()) {
    return getLocalCollections();
  }

  try {
    const supabase = await createServerClientInstance();
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, description, image, sort_order, is_active, created_at")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return getLocalCollections();
    }

    // Merge with mineralogical metadata from static collections definition if needed
    return data.map((cat) => {
      const local = getLocalCollectionBySlug(cat.slug);
      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || local?.description || "",
        longDescription: local?.longDescription || cat.description || "",
        mineralGroup: local?.mineralGroup || "Natural Rough Specimen",
        formula: local?.formula || "",
        crystalSystem: local?.crystalSystem || "Natural Habit",
        mohsHardness: local?.mohsHardness || "7+",
        specificGravity: local?.specificGravity || "3+",
        image: cat.image || local?.image || "",
        heroImage: local?.heroImage || cat.image || "",
        specimenCount: local?.specimenCount || 0,
        created_at: cat.created_at,
      };
    });
  } catch (err) {
    console.warn("[getDbCategories] Falling back to local collections:", err);
    return getLocalCollections();
  }
}

/**
 * Transform a database joined row into GemstoneWithDetails.
 */
function mapDbRowToGemstone(item: DbGemstoneJoinedRow): GemstoneWithDetails {
  const rawImages = item.images || [];
  const sortedImages: GemstoneImage[] = [...rawImages]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({
      id: img.id,
      gemstone_id: img.gemstone_id,
      image_url: img.image_url,
      alt_text: img.alt_text,
      sort_order: img.sort_order,
      created_at: img.created_at || item.created_at,
    }));

  return {
    id: item.id,
    category_id: item.category_id,
    name: item.name,
    slug: item.slug,
    sku: item.sku,
    short_description: item.short_description,
    description: item.description ?? null,
    price: item.price,
    currency: item.currency,
    carat_weight: item.carat_weight,
    dimensions: item.dimensions ?? null,
    color: item.color,
    clarity: item.clarity ?? null,
    cut: item.cut ?? null,
    origin: item.origin,
    treatment: item.treatment ?? null,
    certificate_lab: item.certificate_lab,
    certificate_number: item.certificate_number ?? null,
    certificate_url: item.certificate_url ?? null,
    status: item.status,
    featured: item.featured,
    seo_title: item.seo_title ?? null,
    seo_description: item.seo_description ?? null,
    created_at: item.created_at,
    updated_at: item.updated_at ?? item.created_at,
    category: item.categories
      ? {
          id: item.categories.id,
          name: item.categories.name,
          slug: item.categories.slug,
          description: item.categories.description ?? null,
          created_at: item.created_at,
        }
      : undefined,
    images: sortedImages,
  };
}

/**
 * Fetch paginated public gemstones.
 * Enforces public visibility constraint: status IN ('available', 'sold').
 * Never returns 'draft' or 'hidden' gemstones.
 * Uses lean column projection to minimize wire payload and JSON parsing overhead.
 */
export async function getDbGemstones(
  options: GemstoneFilterOptions = {}
): Promise<PaginatedGemstonesResult> {
  if (!isSupabaseConfigured()) {
    return getLocalGemstones(options);
  }

  try {
    const supabase = await createServerClientInstance();

    // 1. Fetch active categories for join mapping with lean card projection
    let query = supabase
      .from("gemstones")
      .select(
        `
        id,
        category_id,
        name,
        slug,
        sku,
        short_description,
        price,
        currency,
        carat_weight,
        color,
        origin,
        certificate_lab,
        status,
        featured,
        created_at,
        categories:category_id (id, name, slug),
        images:gemstone_images (id, gemstone_id, image_url, alt_text, sort_order)
      `,
        { count: "exact" }
      )
      .in("status", ["available", "sold"]);

    // Category Filter via cached slug lookup
    if (options.categorySlug && options.categorySlug !== "all") {
      const categoryId = await getCategoryIdBySlug(supabase, options.categorySlug);
      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }
    }

    // Status Filter (user can toggle between available or sold within public scope)
    if (options.status && options.status !== "all") {
      query = query.eq("status", options.status);
    }

    // Color Filter
    if (options.color && options.color !== "all") {
      query = query.ilike("color", `%${options.color}%`);
    }

    // Carat Range Filter
    if (options.caratRange && options.caratRange !== "all") {
      if (options.caratRange === "under-50") {
        query = query.lt("carat_weight", 50);
      } else if (options.caratRange === "50-100") {
        query = query.gte("carat_weight", 50).lte("carat_weight", 100);
      } else if (options.caratRange === "over-100") {
        query = query.gt("carat_weight", 100);
      }
    }

    // Search Query (name, sku, or description) with injection prevention
    if (options.search && options.search.trim() !== "") {
      const sanitized = sanitizePostgrestSearch(options.search);
      if (sanitized) {
        const term = `%${sanitized}%`;
        query = query.or(`name.ilike.${term},sku.ilike.${term},color.ilike.${term}`);
      }
    }

    // Sorting
    switch (options.sort) {
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "carat-asc":
        query = query.order("carat_weight", { ascending: true, nullsFirst: false });
        break;
      case "carat-desc":
        query = query.order("carat_weight", { ascending: false, nullsFirst: false });
        break;
      case "name-asc":
        query = query.order("name", { ascending: true });
        break;
      case "name-desc":
        query = query.order("name", { ascending: false });
        break;
      case "featured":
      default:
        query = query
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false });
        break;
    }

    // Pagination
    const page = options.page && options.page > 0 ? options.page : 1;
    const pageSize = options.pageSize && options.pageSize > 0 ? options.pageSize : 12;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error || !data) {
      return getLocalGemstones(options);
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize) || 1;

    // Cast via unknown to DbGemstoneJoinedRow array safely
    const joinedRows = data as unknown as DbGemstoneJoinedRow[];
    const gemstones = joinedRows.map(mapDbRowToGemstone);

    return {
      gemstones,
      total,
      page,
      pageSize,
      totalPages,
      availableColors: ["Green", "Pink", "Peach", "Bi-color"],
    };
  } catch (err) {
    console.warn("[getDbGemstones] Fallback to local data:", err);
    return getLocalGemstones(options);
  }
}

/**
 * Fetch a single gemstone by its URL slug.
 * Enforces public visibility constraint: status IN ('available', 'sold').
 * Returns undefined for 'draft' or 'hidden' specimens.
 */
export async function getDbGemstoneBySlug(
  slug: string
): Promise<GemstoneWithDetails | undefined> {
  if (!isSupabaseConfigured()) {
    return getLocalGemstoneBySlug(slug);
  }

  try {
    const supabase = await createServerClientInstance();
    const { data, error } = await supabase
      .from("gemstones")
      .select(
        `
        id,
        category_id,
        name,
        slug,
        sku,
        short_description,
        description,
        price,
        currency,
        carat_weight,
        dimensions,
        color,
        clarity,
        cut,
        origin,
        treatment,
        certificate_lab,
        certificate_number,
        certificate_url,
        status,
        featured,
        seo_title,
        seo_description,
        created_at,
        updated_at,
        categories:category_id (id, name, slug, description),
        images:gemstone_images (id, gemstone_id, image_url, alt_text, sort_order, is_primary, created_at)
      `
      )
      .eq("slug", slug)
      .in("status", ["available", "sold"])
      .maybeSingle();

    if (error || !data) {
      return getLocalGemstoneBySlug(slug);
    }

    const joinedRow = data as unknown as DbGemstoneJoinedRow;
    return mapDbRowToGemstone(joinedRow);
  } catch (err) {
    console.warn("[getDbGemstoneBySlug] Fallback to local data:", err);
    return getLocalGemstoneBySlug(slug);
  }
}

/**
 * Fetch featured gemstones for homepage showcase.
 * Only selects public available gemstones.
 */
export async function getDbFeaturedGemstones(
  limit: number = 3
): Promise<GemstoneWithDetails[]> {
  if (!isSupabaseConfigured()) {
    return getLocalFeaturedGemstones(limit);
  }

  try {
    const supabase = await createServerClientInstance();
    const { data, error } = await supabase
      .from("gemstones")
      .select(
        `
        id,
        category_id,
        name,
        slug,
        sku,
        short_description,
        price,
        currency,
        carat_weight,
        color,
        origin,
        certificate_lab,
        status,
        featured,
        created_at,
        categories:category_id (id, name, slug),
        images:gemstone_images (id, gemstone_id, image_url, alt_text, sort_order)
      `
      )
      .eq("status", "available")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) {
      return getLocalFeaturedGemstones(limit);
    }

    const joinedRows = data as unknown as DbGemstoneJoinedRow[];
    return joinedRows.map(mapDbRowToGemstone);
  } catch (err) {
    console.warn("[getDbFeaturedGemstones] Fallback to local data:", err);
    return getLocalFeaturedGemstones(limit);
  }
}

/**
 * Persist a public trade inquiry record to Supabase `inquiries` table.
 * Enforces status = 'new'.
 */
export async function createDbInquiry(
  inquiry: InquiryInsert
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const supabase = await createServerClientInstance();
    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || null,
        inquiry_type: inquiry.inquiry_type,
        gemstone_id: inquiry.gemstone_id || null,
        gemstone_slug: inquiry.gemstone_slug || null,
        gemstone_name: inquiry.gemstone_name || null,
        message: inquiry.message,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[createDbInquiry] Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to persist inquiry";
    console.error("[createDbInquiry] Unexpected insert exception:", err);
    return { success: false, error: message };
  }
}
