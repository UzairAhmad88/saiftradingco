import { createServerClientInstance } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data/gemstones-db";
import {
  ALL_DEMO_GEMSTONES,
  getGemstoneBySlug as getLocalGemstoneBySlug,
  getCollections as getLocalCollections,
} from "@/lib/data/collections-data";
import type { GemstoneWithDetails, GemstoneImage } from "@/types/gemstone";
import type { GemstoneStatus } from "@/types/database";
import { requireAdmin } from "@/lib/auth/server";
import { sanitizePostgrestSearch } from "@/lib/utils/security";

export interface AdminCatalogueStats {
  total: number;
  available: number;
  sold: number;
  draft: number;
  hidden: number;
  featured: number;
}

export interface AdminGemstoneFilterOptions {
  search?: string;
  status?: "all" | "draft" | "available" | "sold" | "hidden";
  category?: string;
  featured?: "all" | "featured" | "not_featured";
  sort?:
    | "newest"
    | "oldest"
    | "name_asc"
    | "name_desc"
    | "updated"
    | "price_asc"
    | "price_desc";
  page?: number;
  pageSize?: number;
}

export interface AdminPaginatedGemstonesResult {
  gemstones: GemstoneWithDetails[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AdminCategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sort_order: number;
  is_active: boolean;
  specimenCount: number;
  created_at: string;
}

interface DbGemstoneRowWithRelations {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  price: number | null;
  currency: string | null;
  carat_weight: number | null;
  dimensions: string | null;
  color: string | null;
  clarity: string | null;
  cut: string | null;
  origin: string | null;
  treatment: string | null;
  certificate_lab: string | null;
  certificate_number: string | null;
  certificate_url: string | null;
  status: GemstoneStatus;
  featured: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at: string;
  updated_at: string;
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  } | null;
  images: Array<{
    id: string;
    gemstone_id: string;
    image_url: string;
    storage_path?: string | null;
    alt_text: string | null;
    sort_order: number;
    is_primary: boolean;
    created_at: string;
  }> | null;
}

function mapRowToGemstone(row: DbGemstoneRowWithRelations): GemstoneWithDetails {
  const rawImages = row.images || [];
  const sortedImages: GemstoneImage[] = [...rawImages]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({
      id: img.id,
      gemstone_id: img.gemstone_id,
      image_url: img.image_url,
      storage_path: img.storage_path || undefined,
      alt_text: img.alt_text,
      sort_order: img.sort_order,
      is_primary: img.is_primary,
      created_at: img.created_at,
    }));

  return {
    id: row.id,
    category_id: row.category_id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    short_description: row.short_description,
    description: row.description,
    price: row.price,
    currency: row.currency,
    carat_weight: row.carat_weight,
    dimensions: row.dimensions,
    color: row.color,
    clarity: row.clarity,
    cut: row.cut,
    origin: row.origin,
    treatment: row.treatment,
    certificate_lab: row.certificate_lab,
    certificate_number: row.certificate_number,
    certificate_url: row.certificate_url,
    status: row.status,
    featured: row.featured,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    created_at: row.created_at,
    updated_at: row.updated_at,
    category: row.categories
      ? {
          id: row.categories.id,
          name: row.categories.name,
          slug: row.categories.slug,
          description: row.categories.description,
          created_at: row.created_at,
        }
      : undefined,
    images: sortedImages,
  };
}

/**
 * Fetch high-level catalogue statistics from real database data.
 */
export async function getAdminCatalogueStats(): Promise<AdminCatalogueStats> {
  if (!isSupabaseConfigured()) {
    const local = ALL_DEMO_GEMSTONES;
    return {
      total: local.length,
      available: local.filter((g) => g.status === "available").length,
      sold: local.filter((g) => g.status === "sold").length,
      draft: 0,
      hidden: 0,
      featured: local.filter((g) => g.featured).length,
    };
  }

  try {
    await requireAdmin();
    const supabase = await createServerClientInstance();

    const [
      totalRes,
      availableRes,
      soldRes,
      draftRes,
      hiddenRes,
      featuredRes,
    ] = await Promise.all([
      supabase.from("gemstones").select("*", { count: "exact", head: true }),
      supabase.from("gemstones").select("*", { count: "exact", head: true }).eq("status", "available"),
      supabase.from("gemstones").select("*", { count: "exact", head: true }).eq("status", "sold"),
      supabase.from("gemstones").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("gemstones").select("*", { count: "exact", head: true }).eq("status", "hidden"),
      supabase.from("gemstones").select("*", { count: "exact", head: true }).eq("featured", true),
    ]);

    return {
      total: totalRes.count ?? 0,
      available: availableRes.count ?? 0,
      sold: soldRes.count ?? 0,
      draft: draftRes.count ?? 0,
      hidden: hiddenRes.count ?? 0,
      featured: featuredRes.count ?? 0,
    };
  } catch (err) {
    console.error("[getAdminCatalogueStats] Error fetching stats:", err);
    const local = ALL_DEMO_GEMSTONES;
    return {
      total: local.length,
      available: local.filter((g) => g.status === "available").length,
      sold: local.filter((g) => g.status === "sold").length,
      draft: 0,
      hidden: 0,
      featured: local.filter((g) => g.featured).length,
    };
  }
}

/**
 * Fetch paginated administrative gemstone list with searching, filtering, and sorting.
 */
export async function getAdminGemstones(
  options: AdminGemstoneFilterOptions = {}
): Promise<AdminPaginatedGemstonesResult> {
  const {
    search,
    status = "all",
    category = "all",
    featured = "all",
    sort = "newest",
    page = 1,
    pageSize = 20,
  } = options;

  if (!isSupabaseConfigured()) {
    let list = [...ALL_DEMO_GEMSTONES];

    if (search && search.trim() !== "") {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.slug.toLowerCase().includes(q) ||
          (g.sku && g.sku.toLowerCase().includes(q))
      );
    }

    if (status !== "all") {
      list = list.filter((g) => g.status === status);
    }

    if (category !== "all") {
      list = list.filter(
        (g) => g.category?.slug === category || g.category_id === category
      );
    }

    if (featured === "featured") {
      list = list.filter((g) => g.featured);
    } else if (featured === "not_featured") {
      list = list.filter((g) => !g.featured);
    }

    // Sort
    list.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "price_asc":
          return (a.price || 0) - (b.price || 0);
        case "price_desc":
          return (b.price || 0) - (a.price || 0);
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    const total = list.length;
    const from = (page - 1) * pageSize;
    const paginated = list.slice(from, from + pageSize);

    return {
      gemstones: paginated,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  }

  try {
    await requireAdmin();
    const supabase = await createServerClientInstance();

    let query = supabase.from("gemstones").select(
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
      images:gemstone_images (id, gemstone_id, image_url, storage_path, alt_text, sort_order, is_primary, created_at)
    `,
      { count: "exact" }
    );

    // Filter by search with injection prevention
    if (search && search.trim() !== "") {
      const q = sanitizePostgrestSearch(search);
      if (q) {
        query = query.or(`name.ilike.%${q}%,slug.ilike.%${q}%,sku.ilike.%${q}%`);
      }
    }

    // Filter by status
    if (status !== "all") {
      query = query.eq("status", status);
    }

    // Filter by category
    if (category !== "all") {
      // Check if UUID or slug
      if (category.includes("-") && category.length === 36) {
        query = query.eq("category_id", category);
      } else {
        // Look up category id by slug first
        const { data: catData } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", category)
          .maybeSingle();

        if (catData?.id) {
          query = query.eq("category_id", catData.id);
        }
      }
    }

    // Filter by featured
    if (featured === "featured") {
      query = query.eq("featured", true);
    } else if (featured === "not_featured") {
      query = query.eq("featured", false);
    }

    // Sort order
    switch (sort) {
      case "oldest":
        query = query.order("created_at", { ascending: true });
        break;
      case "name_asc":
        query = query.order("name", { ascending: true });
        break;
      case "name_desc":
        query = query.order("name", { ascending: false });
        break;
      case "updated":
        query = query.order("updated_at", { ascending: false });
        break;
      case "price_asc":
        query = query.order("price", { ascending: true, nullsFirst: false });
        break;
      case "price_desc":
        query = query.order("price", { ascending: false, nullsFirst: false });
        break;
      case "newest":
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }

    // Pagination bounds
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error("[getAdminGemstones] Query error:", error);
      throw error;
    }

    const total = count ?? 0;
    const typedRows = (data as unknown as DbGemstoneRowWithRelations[]) || [];
    const gemstones = typedRows.map(mapRowToGemstone);

    return {
      gemstones,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  } catch (err) {
    console.error("[getAdminGemstones] Falling back to local data:", err);
    return {
      gemstones: [],
      total: 0,
      page: 1,
      pageSize,
      totalPages: 1,
    };
  }
}

/**
 * Fetch a single gemstone record by ID for editing, without public status constraints.
 */
export async function getAdminGemstoneById(
  id: string
): Promise<GemstoneWithDetails | null> {
  if (!isSupabaseConfigured()) {
    const local = ALL_DEMO_GEMSTONES.find((g) => g.id === id);
    if (local) return local;
    return getLocalGemstoneBySlug(id) || null;
  }

  try {
    await requireAdmin();
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
        images:gemstone_images (id, gemstone_id, image_url, storage_path, alt_text, sort_order, is_primary, created_at)
      `
      )
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      // Fallback search by slug or local data if needed
      return (
        ALL_DEMO_GEMSTONES.find((g) => g.id === id) ||
        getLocalGemstoneBySlug(id) ||
        null
      );
    }

    const typedRow = data as unknown as DbGemstoneRowWithRelations;
    return mapRowToGemstone(typedRow);
  } catch (err) {
    console.error("[getAdminGemstoneById] Query error:", err);
    return null;
  }
}

/**
 * Fetch all categories for admin management and form selector.
 */
export async function getAdminCategories(): Promise<AdminCategoryRow[]> {
  if (!isSupabaseConfigured()) {
    const local = getLocalCollections();
    return local.map((c, index) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description || null,
      image: c.image || null,
      sort_order: index,
      is_active: true,
      specimenCount: c.specimenCount,
      created_at: new Date().toISOString(),
    }));
  }

  try {
    await requireAdmin();
    const supabase = await createServerClientInstance();
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, name, slug, description, image, sort_order, is_active, created_at")
      .order("sort_order", { ascending: true });

    if (error || !categories) {
      console.warn("[getAdminCategories] Query failed, using local:", error);
      return getLocalCollections().map((c, index) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || null,
        image: c.image || null,
        sort_order: index,
        is_active: true,
        specimenCount: c.specimenCount,
        created_at: new Date().toISOString(),
      }));
    }

    // Get counts per category
    const { data: counts } = await supabase
      .from("gemstones")
      .select("category_id");

    const countMap: Record<string, number> = {};
    if (counts) {
      counts.forEach((item) => {
        if (item.category_id) {
          countMap[item.category_id] = (countMap[item.category_id] || 0) + 1;
        }
      });
    }

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      sort_order: cat.sort_order,
      is_active: cat.is_active,
      specimenCount: countMap[cat.id] || 0,
      created_at: cat.created_at,
    }));
  } catch (err) {
    console.error("[getAdminCategories] Unexpected error:", err);
    return [];
  }
}
