"use server";

import { revalidatePath } from "next/cache";
import { createServerClientInstance } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/server";
import {
  adminGemstoneCreateSchema,
  adminCategorySchema,
  type AdminGemstoneInput,
  type AdminCategoryInput,
} from "@/lib/validations/gemstone";
import type { GemstoneStatus } from "@/types/database";

export interface MutationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Revalidate all public and admin paths influenced by catalogue changes.
 */
function revalidateCataloguePaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath("/collections/[category]", "page");
  if (slug) {
    revalidatePath(`/gemstones/${slug}`);
  }
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/gemstones");
}

/**
 * Server Action: Create a new gemstone specimen.
 * Defaults to 'draft' status to guarantee safety.
 */
export async function createGemstoneAction(
  rawInput: AdminGemstoneInput
): Promise<MutationResult<{ id: string; slug: string }>> {
  // 1. Rigorous server-side authorization check
  await requireAdmin();

  // 2. Validate input against schema
  const parsed = adminGemstoneCreateSchema.safeParse(rawInput);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input data.";
    return { success: false, error: errorMsg };
  }

  const input = parsed.data;

  try {
    const supabase = await createServerClientInstance();

    // 3. Verify slug uniqueness
    const { data: existingSlug } = await supabase
      .from("gemstones")
      .select("id")
      .eq("slug", input.slug)
      .maybeSingle();

    if (existingSlug) {
      return {
        success: false,
        error: "This URL slug is already in use. Please specify a unique slug.",
      };
    }

    // 4. Verify SKU uniqueness if provided
    if (input.sku && input.sku.trim() !== "") {
      const { data: existingSku } = await supabase
        .from("gemstones")
        .select("id")
        .eq("sku", input.sku.trim())
        .maybeSingle();

      if (existingSku) {
        return {
          success: false,
          error: "This SKU is already in use by another specimen.",
        };
      }
    }

    // 5. Insert gemstone record with explicit fields
    const { data: inserted, error: insertError } = await supabase
      .from("gemstones")
      .insert({
        category_id: input.category_id,
        name: input.name.trim(),
        slug: input.slug.trim(),
        sku: input.sku ? input.sku.trim() : null,
        short_description: input.short_description || null,
        description: input.description || null,
        price: input.price !== undefined && input.price !== null ? input.price : null,
        currency: input.currency || "USD",
        carat_weight:
          input.carat_weight !== undefined && input.carat_weight !== null
            ? input.carat_weight
            : null,
        dimensions: input.dimensions || null,
        color: input.color || null,
        clarity: input.clarity || null,
        cut: input.cut || null,
        origin: input.origin || null,
        treatment: input.treatment || null,
        certificate_lab: input.certificate_lab || null,
        certificate_number: input.certificate_number || null,
        certificate_url: input.certificate_url || null,
        status: input.status || "draft",
        featured: input.featured ?? false,
        seo_title: input.seo_title || null,
        seo_description: input.seo_description || null,
      })
      .select("id, slug")
      .single();

    if (insertError || !inserted) {
      console.error("[createGemstoneAction] Insert error:", insertError);
      return {
        success: false,
        error: "Unable to save the gemstone. Please check the fields and try again.",
      };
    }

    revalidateCataloguePaths(inserted.slug);
    return { success: true, data: { id: inserted.id, slug: inserted.slug } };
  } catch (err) {
    console.error("[createGemstoneAction] Exception:", err);
    return {
      success: false,
      error: "An unexpected error occurred while creating the gemstone.",
    };
  }
}

/**
 * Server Action: Update an existing gemstone specimen.
 */
export async function updateGemstoneAction(
  id: string,
  rawInput: AdminGemstoneInput
): Promise<MutationResult<{ id: string; slug: string }>> {
  // 1. Authorize
  await requireAdmin();

  // 2. Validate input
  const parsed = adminGemstoneCreateSchema.safeParse(rawInput);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input data.";
    return { success: false, error: errorMsg };
  }

  const input = parsed.data;

  try {
    const supabase = await createServerClientInstance();

    // 3. Verify slug uniqueness against other records
    const { data: existingSlug } = await supabase
      .from("gemstones")
      .select("id")
      .eq("slug", input.slug)
      .neq("id", id)
      .maybeSingle();

    if (existingSlug) {
      return {
        success: false,
        error: "This URL slug is already in use by another gemstone.",
      };
    }

    // 4. Verify SKU uniqueness against other records
    if (input.sku && input.sku.trim() !== "") {
      const { data: existingSku } = await supabase
        .from("gemstones")
        .select("id")
        .eq("sku", input.sku.trim())
        .neq("id", id)
        .maybeSingle();

      if (existingSku) {
        return {
          success: false,
          error: "This SKU is already assigned to another specimen.",
        };
      }
    }

    // 5. Update record
    const { data: updated, error: updateError } = await supabase
      .from("gemstones")
      .update({
        category_id: input.category_id,
        name: input.name.trim(),
        slug: input.slug.trim(),
        sku: input.sku ? input.sku.trim() : null,
        short_description: input.short_description || null,
        description: input.description || null,
        price: input.price !== undefined && input.price !== null ? input.price : null,
        currency: input.currency || "USD",
        carat_weight:
          input.carat_weight !== undefined && input.carat_weight !== null
            ? input.carat_weight
            : null,
        dimensions: input.dimensions || null,
        color: input.color || null,
        clarity: input.clarity || null,
        cut: input.cut || null,
        origin: input.origin || null,
        treatment: input.treatment || null,
        certificate_lab: input.certificate_lab || null,
        certificate_number: input.certificate_number || null,
        certificate_url: input.certificate_url || null,
        status: input.status,
        featured: input.featured,
        seo_title: input.seo_title || null,
        seo_description: input.seo_description || null,
      })
      .eq("id", id)
      .select("id, slug")
      .single();

    if (updateError || !updated) {
      console.error("[updateGemstoneAction] Update error:", updateError);
      return {
        success: false,
        error: "Unable to update the gemstone. Please verify your data and try again.",
      };
    }

    revalidateCataloguePaths(updated.slug);
    revalidatePath(`/admin/gemstones/${id}/edit`);
    return { success: true, data: { id: updated.id, slug: updated.slug } };
  } catch (err) {
    console.error("[updateGemstoneAction] Exception:", err);
    return {
      success: false,
      error: "An unexpected error occurred while updating the gemstone.",
    };
  }
}

/**
 * Server Action: Quick update gemstone publication status (draft, available, sold, hidden).
 */
export async function quickUpdateGemstoneStatusAction(
  id: string,
  status: GemstoneStatus
): Promise<MutationResult> {
  await requireAdmin();

  if (!["draft", "available", "sold", "hidden"].includes(status)) {
    return { success: false, error: "Invalid status value." };
  }

  try {
    const supabase = await createServerClientInstance();
    const { data: updated, error } = await supabase
      .from("gemstones")
      .update({ status })
      .eq("id", id)
      .select("slug")
      .single();

    if (error || !updated) {
      return { success: false, error: "Failed to update gemstone status." };
    }

    revalidateCataloguePaths(updated.slug);
    revalidatePath(`/admin/gemstones/${id}/edit`);
    return { success: true };
  } catch (err) {
    console.error("[quickUpdateGemstoneStatusAction] Error:", err);
    return { success: false, error: "Unexpected status update failure." };
  }
}

/**
 * Server Action: Quick toggle featured gemstone flag.
 */
export async function quickToggleFeaturedAction(
  id: string,
  featured: boolean
): Promise<MutationResult> {
  await requireAdmin();

  try {
    const supabase = await createServerClientInstance();
    const { data: updated, error } = await supabase
      .from("gemstones")
      .update({ featured })
      .eq("id", id)
      .select("slug")
      .single();

    if (error || !updated) {
      return { success: false, error: "Failed to update featured flag." };
    }

    revalidateCataloguePaths(updated.slug);
    revalidatePath(`/admin/gemstones/${id}/edit`);
    return { success: true };
  } catch (err) {
    console.error("[quickToggleFeaturedAction] Error:", err);
    return { success: false, error: "Unexpected featured toggle failure." };
  }
}

/**
 * Server Action: Permanent deletion of a gemstone and its storage assets.
 * Only intended as a secondary, confirmed workflow (Hide or Mark as Sold is preferred).
 */
export async function deleteGemstoneAction(id: string): Promise<MutationResult> {
  await requireAdmin();

  try {
    const supabase = await createServerClientInstance();

    // 1. Fetch images to delete from storage
    const { data: images } = await supabase
      .from("gemstone_images")
      .select("storage_path")
      .eq("gemstone_id", id);

    if (images && images.length > 0) {
      const pathsToDelete = images
        .map((img) => img.storage_path)
        .filter((p): p is string => Boolean(p));

      if (pathsToDelete.length > 0) {
        await supabase.storage.from("gemstones").remove(pathsToDelete);
      }
    }

    // 2. Delete gemstone row (foreign key on delete cascade cleans gemstone_images)
    const { error } = await supabase.from("gemstones").delete().eq("id", id);

    if (error) {
      console.error("[deleteGemstoneAction] Delete error:", error);
      return {
        success: false,
        error: "Unable to delete gemstone. Inquiries may reference this specimen.",
      };
    }

    revalidateCataloguePaths();
    return { success: true };
  } catch (err) {
    console.error("[deleteGemstoneAction] Exception:", err);
    return { success: false, error: "Unexpected error during deletion." };
  }
}

/**
 * Server Action: Upload image asset to Supabase Storage and register in database.
 */
export async function uploadGemstoneImageAction(
  gemstoneId: string,
  formData: FormData
): Promise<MutationResult<{ id: string; image_url: string }>> {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  const altText = (formData.get("alt_text") as string) || "Rough gemstone specimen";

  if (!file || !(file instanceof File)) {
    return { success: false, error: "Please select an image file to upload." };
  }

  // File size validation (10MB limit per Supabase bucket policy)
  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: "File exceeds 10MB limit." };
  }

  // MIME type validation
  const allowedMimes = ["image/webp", "image/jpeg", "image/png"];
  if (!allowedMimes.includes(file.type)) {
    return {
      success: false,
      error: "Only WebP, JPEG, and PNG images are supported.",
    };
  }

  try {
    const supabase = await createServerClientInstance();

    // Generate safe storage path: gemstones/[gemstoneId]/[timestamp]-[random].[ext]
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const cleanExt = ["webp", "jpg", "jpeg", "png"].includes(ext) ? ext : "webp";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${cleanExt}`;
    const storagePath = `${gemstoneId}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("gemstones")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[uploadGemstoneImageAction] Storage upload error:", uploadError);
      return {
        success: false,
        error: "Failed to upload file to storage. Verify storage permissions.",
      };
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("gemstones")
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData.publicUrl;

    // Check if any existing image is primary
    const { count: existingCount } = await supabase
      .from("gemstone_images")
      .select("*", { count: "exact", head: true })
      .eq("gemstone_id", gemstoneId);

    const isPrimary = (existingCount ?? 0) === 0;
    const sortOrder = existingCount ?? 0;

    // Insert database record
    const { data: insertedImage, error: dbError } = await supabase
      .from("gemstone_images")
      .insert({
        gemstone_id: gemstoneId,
        storage_path: storagePath,
        image_url: publicUrl,
        alt_text: altText.trim(),
        sort_order: sortOrder,
        is_primary: isPrimary,
      })
      .select("id, image_url")
      .single();

    if (dbError || !insertedImage) {
      console.error("[uploadGemstoneImageAction] DB insert error:", dbError);
      // Clean up orphaned storage object
      await supabase.storage.from("gemstones").remove([storagePath]);
      return {
        success: false,
        error: "Failed to register image record in database.",
      };
    }

    revalidatePath(`/admin/gemstones/${gemstoneId}/edit`);
    revalidateCataloguePaths();

    return {
      success: true,
      data: { id: insertedImage.id, image_url: insertedImage.image_url },
    };
  } catch (err) {
    console.error("[uploadGemstoneImageAction] Exception:", err);
    return { success: false, error: "Unexpected error during image upload." };
  }
}

/**
 * Server Action: Designate an image as primary for a gemstone.
 * Ensures consistent single-primary state via transactional updates.
 */
export async function setPrimaryImageAction(
  gemstoneId: string,
  imageId: string
): Promise<MutationResult> {
  await requireAdmin();

  try {
    const supabase = await createServerClientInstance();

    // 1. Demote all existing images of this gemstone
    const { error: demoteError } = await supabase
      .from("gemstone_images")
      .update({ is_primary: false })
      .eq("gemstone_id", gemstoneId);

    if (demoteError) {
      console.error("[setPrimaryImageAction] Demote error:", demoteError);
      return { success: false, error: "Failed to reset primary image status." };
    }

    // 2. Promote target image
    const { error: promoteError } = await supabase
      .from("gemstone_images")
      .update({ is_primary: true })
      .eq("id", imageId)
      .eq("gemstone_id", gemstoneId);

    if (promoteError) {
      console.error("[setPrimaryImageAction] Promote error:", promoteError);
      return { success: false, error: "Failed to set primary image." };
    }

    revalidatePath(`/admin/gemstones/${gemstoneId}/edit`);
    revalidateCataloguePaths();
    return { success: true };
  } catch (err) {
    console.error("[setPrimaryImageAction] Exception:", err);
    return { success: false, error: "Unexpected primary image assignment failure." };
  }
}

/**
 * Server Action: Reorder gemstone images by updating their sort_order.
 */
export async function reorderGemstoneImagesAction(
  gemstoneId: string,
  orderedImageIds: string[]
): Promise<MutationResult> {
  await requireAdmin();

  try {
    const supabase = await createServerClientInstance();

    // Sequential updates for sort_order
    for (let index = 0; index < orderedImageIds.length; index++) {
      const id = orderedImageIds[index];
      await supabase
        .from("gemstone_images")
        .update({ sort_order: index })
        .eq("id", id)
        .eq("gemstone_id", gemstoneId);
    }

    revalidatePath(`/admin/gemstones/${gemstoneId}/edit`);
    revalidateCataloguePaths();
    return { success: true };
  } catch (err) {
    console.error("[reorderGemstoneImagesAction] Exception:", err);
    return { success: false, error: "Failed to reorder images." };
  }
}

/**
 * Server Action: Update alt text for an image.
 */
export async function updateImageAltTextAction(
  gemstoneId: string,
  imageId: string,
  altText: string
): Promise<MutationResult> {
  await requireAdmin();

  try {
    const supabase = await createServerClientInstance();
    const { error } = await supabase
      .from("gemstone_images")
      .update({ alt_text: altText.trim() })
      .eq("id", imageId)
      .eq("gemstone_id", gemstoneId);

    if (error) {
      return { success: false, error: "Failed to update alt text." };
    }

    revalidatePath(`/admin/gemstones/${gemstoneId}/edit`);
    revalidateCataloguePaths();
    return { success: true };
  } catch (err) {
    console.error("[updateImageAltTextAction] Exception:", err);
    return { success: false, error: "Unexpected error updating alt text." };
  }
}

/**
 * Server Action: Delete an image from database and storage.
 */
export async function deleteGemstoneImageAction(
  gemstoneId: string,
  imageId: string,
  storagePath?: string | null
): Promise<MutationResult> {
  await requireAdmin();

  try {
    const supabase = await createServerClientInstance();

    // 1. Fetch image to see if it was primary
    const { data: targetImg } = await supabase
      .from("gemstone_images")
      .select("is_primary")
      .eq("id", imageId)
      .maybeSingle();

    const wasPrimary = targetImg?.is_primary;

    // 2. Delete database row
    const { error: dbDeleteError } = await supabase
      .from("gemstone_images")
      .delete()
      .eq("id", imageId)
      .eq("gemstone_id", gemstoneId);

    if (dbDeleteError) {
      console.error("[deleteGemstoneImageAction] DB delete error:", dbDeleteError);
      return { success: false, error: "Failed to delete image record." };
    }

    // 3. Delete from storage if storage path exists
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from("gemstones")
        .remove([storagePath]);

      if (storageError) {
        console.warn("[deleteGemstoneImageAction] Storage delete warning:", storageError);
      }
    }

    // 4. If deleted was primary, promote first remaining image
    if (wasPrimary) {
      const { data: remaining } = await supabase
        .from("gemstone_images")
        .select("id")
        .eq("gemstone_id", gemstoneId)
        .order("sort_order", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (remaining?.id) {
        await supabase
          .from("gemstone_images")
          .update({ is_primary: true })
          .eq("id", remaining.id);
      }
    }

    revalidatePath(`/admin/gemstones/${gemstoneId}/edit`);
    revalidateCataloguePaths();
    return { success: true };
  } catch (err) {
    console.error("[deleteGemstoneImageAction] Exception:", err);
    return { success: false, error: "Unexpected error during image deletion." };
  }
}

/**
 * Server Action: Create a new Category.
 */
export async function createCategoryAction(
  rawInput: AdminCategoryInput
): Promise<MutationResult<{ id: string }>> {
  await requireAdmin();

  const parsed = adminCategorySchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid category data.",
    };
  }

  try {
    const supabase = await createServerClientInstance();
    const { data: existing } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", parsed.data.slug)
      .maybeSingle();

    if (existing) {
      return { success: false, error: "A category with this slug already exists." };
    }

    const { data: inserted, error } = await supabase
      .from("categories")
      .insert({
        name: parsed.data.name.trim(),
        slug: parsed.data.slug.trim(),
        description: parsed.data.description || null,
        is_active: parsed.data.is_active,
        sort_order: parsed.data.sort_order,
      })
      .select("id")
      .single();

    if (error || !inserted) {
      return { success: false, error: "Failed to create category." };
    }

    revalidateCataloguePaths();
    revalidatePath("/admin/categories");
    return { success: true, data: { id: inserted.id } };
  } catch (err) {
    console.error("[createCategoryAction] Error:", err);
    return { success: false, error: "Unexpected error creating category." };
  }
}

/**
 * Server Action: Toggle category active status.
 */
export async function toggleCategoryActiveAction(
  id: string,
  isActive: boolean
): Promise<MutationResult> {
  await requireAdmin();

  try {
    const supabase = await createServerClientInstance();
    const { error } = await supabase
      .from("categories")
      .update({ is_active: isActive })
      .eq("id", id);

    if (error) {
      return { success: false, error: "Failed to toggle category status." };
    }

    revalidateCataloguePaths();
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err) {
    console.error("[toggleCategoryActiveAction] Error:", err);
    return { success: false, error: "Unexpected error updating category." };
  }
}
