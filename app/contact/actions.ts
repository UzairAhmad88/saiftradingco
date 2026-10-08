"use server";

import { submitInquiryService, type InquirySubmissionResult } from "@/lib/services/inquiry-service";
import type { InquiryFormData } from "@/lib/validations/inquiry";

/**
 * Server Action for handling trade inquiry submissions.
 * Validates inputs server-side and routes to the inquiry service abstraction.
 */
export async function submitInquiryAction(
  data: InquiryFormData
): Promise<InquirySubmissionResult> {
  try {
    return await submitInquiryService(data);
  } catch (error) {
    console.error("[submitInquiryAction] Unexpected error:", error);
    return {
      success: false,
      message:
        "Something went wrong. Your inquiry could not be submitted. Please try again or contact us directly.",
    };
  }
}
