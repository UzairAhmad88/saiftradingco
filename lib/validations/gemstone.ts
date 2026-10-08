import { z } from "zod";

export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Generate a clean URL-friendly slug from a gemstone title.
 */
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Base Gemstone validation schema.
 */
export const gemstoneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(150),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(160)
    .regex(
      slugRegex,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  category_id: z.string().min(1, "Category is required"),
  sku: z.string().max(50).optional().nullable(),
  short_description: z.string().max(300).optional().nullable(),
  description: z.string().max(5000).optional().nullable(),
  price: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? null : Number(val)),
    z.number().nonnegative("Price must be a positive number").optional().nullable()
  ),
  currency: z.string().default("USD").optional().nullable(),
  carat_weight: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? null : Number(val)),
    z.number().positive("Carat weight must be greater than zero").optional().nullable()
  ),
  dimensions: z.string().max(100).optional().nullable(),
  color: z.string().max(100).optional().nullable(),
  clarity: z.string().max(100).optional().nullable(),
  cut: z.string().max(100).optional().nullable(),
  origin: z.string().max(100).optional().nullable(),
  treatment: z.string().max(100).optional().nullable(),
  certificate_lab: z.string().max(100).optional().nullable(),
  certificate_number: z.string().max(100).optional().nullable(),
  certificate_url: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || val === "" || /^https:\/\/[^\s$.?#].[^\s]*$/.test(val),
      "Certificate URL must be a valid HTTPS link"
    ),
  status: z.enum(["draft", "available", "sold", "hidden"]).default("draft"),
  featured: z.boolean().default(false),
  seo_title: z.string().max(100).optional().nullable(),
  seo_description: z.string().max(200).optional().nullable(),
});

export const adminGemstoneCreateSchema = gemstoneSchema;

export const adminGemstoneUpdateSchema = gemstoneSchema.extend({
  id: z.string().min(1, "Gemstone ID is required"),
});

export const adminGemstoneStatusSchema = z.object({
  id: z.string().min(1, "Gemstone ID is required"),
  status: z.enum(["draft", "available", "sold", "hidden"]),
});

export const adminCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(100)
    .regex(slugRegex, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().max(2000).optional().nullable(),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().nonnegative().default(0),
});

export type AdminGemstoneInput = z.infer<typeof gemstoneSchema>;
export type AdminCategoryInput = z.infer<typeof adminCategorySchema>;
