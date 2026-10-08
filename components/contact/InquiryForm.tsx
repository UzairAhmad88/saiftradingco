"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { GemstoneContextBadge } from "@/components/contact/GemstoneContextBadge";
import { submitInquiryAction } from "@/app/contact/actions";
import {
  INQUIRY_TYPES,
  inquirySchema,
  type InquiryFormData,
  type InquiryType,
} from "@/lib/validations/inquiry";
import type { InquirySubmissionResult } from "@/lib/services/inquiry-service";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  Mail,
  RotateCcw,
} from "lucide-react";

export interface SelectedGemstoneContext {
  slug: string;
  name: string;
  sku?: string;
  category?: string;
  image?: string;
}

export interface InquiryFormProps {
  initialGemstone?: SelectedGemstoneContext | null;
  initialType?: string;
}

export function InquiryForm({
  initialGemstone = null,
  initialType,
}: InquiryFormProps) {
  // Determine default inquiry type
  const defaultInquiryType: InquiryType =
    initialType && (INQUIRY_TYPES as readonly string[]).includes(initialType)
      ? (initialType as InquiryType)
      : initialGemstone
      ? "Gemstone Inquiry"
      : "General Inquiry";

  // Form State
  const [gemstoneContext, setGemstoneContext] =
    useState<SelectedGemstoneContext | null>(initialGemstone);

  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    phone: "",
    inquiryType: defaultInquiryType,
    gemstoneSlug: initialGemstone?.slug || "",
    gemstoneName: initialGemstone?.name || "",
    message: initialGemstone
      ? `I would like to inquire about ${initialGemstone.name}${
          initialGemstone.sku ? ` (${initialGemstone.sku})` : ""
        }. Please provide details on physical viewing availability and specifications.`
      : "",
    website: "", // Honeypot anti-spam field
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof InquiryFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<InquirySubmissionResult | null>(null);

  // Handle clearing gemstone context
  const handleClearGemstone = () => {
    setGemstoneContext(null);
    setFormData((prev) => ({
      ...prev,
      gemstoneSlug: "",
      gemstoneName: "",
    }));
  };

  // Field change handler
  const handleChange = (
    field: keyof InquiryFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error as user edits
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    if (submitError) {
      setSubmitError(null);
    }
  };

  // Client validation
  const validateClient = (): boolean => {
    const parseResult = inquirySchema.safeParse(formData);
    if (!parseResult.success) {
      const errors: Partial<Record<keyof InquiryFormData, string>> = {};
      for (const issue of parseResult.error.issues) {
        const field = issue.path[0] as keyof InquiryFormData;
        if (field && !errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);

      // Focus first error field for accessibility
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField);
        el?.focus();
      }

      return false;
    }

    setFieldErrors({});
    return true;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate client-side first
    if (!validateClient()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitInquiryAction(formData);

      if (result.success) {
        setSubmissionResult(result);
      } else {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setSubmitError(
          result.message ||
            "Something went wrong. Your inquiry could not be submitted. Please try again or contact us directly."
        );
      }
    } catch {
      setSubmitError(
        "A network communication error occurred. Please try again or contact our trade desk directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to submit another inquiry
  const handleReset = () => {
    setSubmissionResult(null);
    setSubmitError(null);
    setFieldErrors({});
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "General Inquiry",
      gemstoneSlug: "",
      gemstoneName: "",
      message: "",
      website: "",
    });
    setGemstoneContext(null);
  };

  // ─────────────────────────────────────────────────────────────
  // SUCCESS STATE VIEW
  // ─────────────────────────────────────────────────────────────
  if (submissionResult?.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 sm:p-10 bg-[#F7F7F1] border border-[#D4DEC5] rounded-[4px] space-y-6 text-[#050505] shadow-sm"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2
            className="w-7 h-7 text-[#294D2C] shrink-0"
            aria-hidden="true"
          />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#294D2C] block font-medium">
              Transmission Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#050505] font-normal tracking-tight">
              Inquiry Submitted
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#777A70] leading-relaxed font-light">
          Thank you for contacting Saif Trading Co. Your inquiry has been received by our Hong Kong trade desk.
        </p>

        {submissionResult.reference && (
          <div className="p-4 bg-[#E5F1D2] border border-[#D4DEC5] rounded-[4px] space-y-1">
            <span className="text-[10px] text-[#777A70] uppercase tracking-wider block font-medium">
              Reference Identification
            </span>
            <span className="font-mono text-sm text-[#294D2C] tracking-wider block font-bold">
              {submissionResult.reference}
            </span>
          </div>
        )}

        <div className="space-y-2 text-xs text-[#777A70] pt-2 border-t border-[#D4DEC5]">
          <div className="flex justify-between py-1 border-b border-[#D4DEC5]/60">
            <span>Inquiry Type:</span>
            <span className="text-[#050505] font-medium">{formData.inquiryType}</span>
          </div>
          {gemstoneContext && (
            <div className="flex justify-between py-1 border-b border-[#D4DEC5]/60">
              <span>Specimen:</span>
              <span className="text-[#050505] font-medium">{gemstoneContext.name}</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-[#D4DEC5]/60">
            <span>Contact Email:</span>
            <span className="text-[#050505] font-medium">{formData.email}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#050505] text-[#B7D98B] font-medium text-xs uppercase tracking-wider rounded-[4px] hover:bg-[#294D2C] hover:text-[#F7F7F1] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E5F1D2] text-[#050505] border border-[#D4DEC5] rounded-[4px] text-xs uppercase tracking-wider hover:border-[#050505] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Submit Another Inquiry</span>
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // FORM VIEW
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Gemstone Context Banner (if arriving from gemstone detail) */}
      {gemstoneContext && (
        <GemstoneContextBadge
          gemstone={gemstoneContext}
          onClear={handleClearGemstone}
        />
      )}

      {/* Global Submission Failure Alert */}
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-5 bg-[#FEE2E2] border border-[#DC2626]/40 rounded-[4px] text-sm space-y-3"
        >
          <div className="flex items-center gap-2 text-[#991B1B] font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Submission Notice</span>
          </div>
          <p className="text-xs text-[#7F1D1D] leading-relaxed">
            {submitError}
          </p>
          <div className="pt-2 border-t border-[#FCA5A5] flex flex-wrap gap-4 text-xs text-[#991B1B]">
            <a
              href="tel:+85235251640"
              className="inline-flex items-center gap-1.5 hover:underline font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+852 3525 1640</span>
            </a>
            <a
              href="mailto:Saiftradingco@yahoo.com"
              className="inline-flex items-center gap-1.5 hover:underline font-mono"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Saiftradingco@yahoo.com</span>
            </a>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Gemstone inquiry form"
        className="p-6 sm:p-8 sm:p-10 bg-[#F7F7F1] border border-[#D4DEC5] rounded-[4px] space-y-6 shadow-sm"
      >
        <div className="border-b border-[#D4DEC5] pb-4">
          <h2 className="font-serif text-xl sm:text-2xl text-[#050505] font-normal">
            Trade Inquiry Form
          </h2>
          <p className="text-xs text-[#777A70] mt-1">
            Complete the fields below to contact our Hong Kong desk regarding specimen viewings, physical lots, or general trade queries.
          </p>
        </div>

        {/* 1. Name Field */}
        <FormField
          id="name"
          label="Full Name"
          required
          errorMessage={fieldErrors.name}
        >
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Alexander Wright"
            error={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
        </FormField>

        {/* 2. Email Field */}
        <FormField
          id="email"
          label="Email Address"
          required
          errorMessage={fieldErrors.email}
        >
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="e.g., a.wright@example.com"
            error={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
        </FormField>

        {/* 3. Phone Field (Optional) */}
        <FormField
          id="phone"
          label="Phone / Mobile (Optional)"
          helperText="Direct line for correspondence"
          errorMessage={fieldErrors.phone}
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="e.g., +852 9000 0000 or local number"
            error={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "phone-error" : "phone-helper"}
          />
        </FormField>

        {/* 4. Inquiry Type Field */}
        <FormField
          id="inquiryType"
          label="Inquiry Type"
          required
          errorMessage={fieldErrors.inquiryType}
        >
          <Select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={(e) => handleChange("inquiryType", e.target.value)}
            error={!!fieldErrors.inquiryType}
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormField>

        {/* 5. Message Field */}
        <FormField
          id="message"
          label="Message"
          required
          helperText="Detail your requirements such as crystal dimensions, lapidary intent, or certificate review requests."
          errorMessage={fieldErrors.message}
        >
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Tell us what you would like to know about this gemstone or mineral lot..."
            error={!!fieldErrors.message}
            aria-describedby={
              fieldErrors.message ? "message-error" : "message-helper"
            }
          />
        </FormField>

        {/* 6. Anti-Spam Honeypot Field (Visually hidden & omitted from tab order) */}
        <div
          className="absolute -left-[9999px] top-auto w-1 h-1 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="website-hp">Website</label>
          <input
            id="website-hp"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
        </div>

        {/* 7. Privacy Notice */}
        <div className="pt-2">
          <p className="text-xs text-[#9A9A94] leading-relaxed">
            By submitting this form, you agree that the information provided may be used to respond to your inquiry in accordance with our{" "}
            <Link
              href="/privacy"
              className="text-[#D8D8D2] hover:text-[#9CCB63] underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* 8. Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {isSubmitting ? "Sending Inquiry..." : "Send Inquiry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
