export type GemstoneStatus = "draft" | "available" | "sold" | "hidden";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  created_at: string;
}

export interface GemstoneImage {
  id: string;
  gemstone_id: string;
  image_url: string;
  storage_path?: string | null;
  alt_text?: string | null;
  sort_order: number;
  is_primary?: boolean;
  created_at: string;
}

export interface Gemstone {
  id: string;
  category_id?: string | null;
  name: string;
  slug: string;
  sku?: string | null;
  short_description?: string | null;
  description?: string | null;
  price?: number | null;
  currency?: string | null;
  carat_weight?: number | null;
  dimensions?: string | null;
  color?: string | null;
  clarity?: string | null;
  cut?: string | null;
  origin?: string | null;
  treatment?: string | null;
  certificate_lab?: string | null;
  certificate_number?: string | null;
  certificate_url?: string | null;
  status: GemstoneStatus;
  featured: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GemstoneWithDetails extends Gemstone {
  category?: Category | null;
  images?: GemstoneImage[];
}
