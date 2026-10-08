import { inquirySchema, type InquiryFormData } from "@/lib/validations/inquiry";
import { createDbInquiry, getDbGemstoneBySlug } from "@/lib/data/gemstones-db";

export interface InquirySubmissionResult {
  success: boolean;
  reference?: string;
  timestamp?: string;
  message?: string;
  fieldErrors?: Partial<Record<keyof InquiryFormData, string>>;
}

/**
 * Inquiry Submission Service (Phase 09)
 *
 * Provides:
 * 1. Strict server-side Zod validation
 * 2. Anti-spam honeypot detection
 * 3. Gemstone slug resolution & relational linkage
 * 4. PostgreSQL persistence via Supabase client with RLS protection
 * 5. Unique trade reference code generation
 */
export async function submitInquiryService(
  rawInput: unknown
): Promise<InquirySubmissionResult> {
  // 1. Strict server-side schema validation
  const parseResult = inquirySchema.safeParse(rawInput);
  if (!parseResult.success) {
    const fieldErrors: Partial<Record<keyof InquiryFormData, string>> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path[0] as keyof InquiryFormData;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please review and complete the required fields.",
      fieldErrors,
    };
  }

  const data = parseResult.data;

  // 2. Anti-spam check (honeypot field)
  if (data.website && data.website.trim().length > 0) {
    return {
      success: false,
      message: "Inquiry could not be processed.",
    };
  }

  // 3. Resolve gemstone ID safely if slug provided
  let resolvedGemstoneId: string | null = null;
  let resolvedGemstoneName: string | null = data.gemstoneName || null;

  if (data.gemstoneSlug && data.gemstoneSlug.trim() !== "") {
    try {
      const specimen = await getDbGemstoneBySlug(data.gemstoneSlug.trim());
      if (specimen) {
        resolvedGemstoneId = specimen.id;
        resolvedGemstoneName = specimen.name;
      }
    } catch (lookupErr) {
      console.warn("[submitInquiryService] Could not resolve gemstone slug:", lookupErr);
    }
  }

  // 4. Generate unique trade reference ID (format: STC-YYYYMMDD-XXXXX)
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const reference = `STC-${dateStr}-${randomSuffix}`;
  const timestamp = now.toISOString();

  // 5. Persist to Supabase Database (if configured)
  const dbResult = await createDbInquiry({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    inquiry_type: data.inquiryType,
    gemstone_id: resolvedGemstoneId,
    gemstone_slug: data.gemstoneSlug || null,
    gemstone_name: resolvedGemstoneName,
    message: data.message,
    status: "new",
  });

  if (!dbResult.success) {
    console.error("[submitInquiryService] Database insert failed:", dbResult.error);
    return {
      success: false,
      message:
        "Your inquiry could not be registered at this moment. Please try again or contact our trade desk directly via telephone or email.",
    };
  }

  // Diagnostic log in development mode
  if (process.env.NODE_ENV !== "production") {
    console.info(`[InquiryService] Trade inquiry registered successfully: ${reference}`, {
      name: data.name,
      email: data.email,
      inquiryType: data.inquiryType,
      gemstoneId: resolvedGemstoneId || "General",
      gemstoneSlug: data.gemstoneSlug || "General",
      timestamp,
    });
  }

  return {
    success: true,
    reference,
    timestamp,
    message: "Your inquiry has been submitted successfully.",
  };
}
