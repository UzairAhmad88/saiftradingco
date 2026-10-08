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
        className="p-8 sm:p-10 bg-[#101010] border border-[#B69B5E]/50 space-y-6"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2
            className="w-7 h-7 text-[#B69B5E] shrink-0"
            aria-hidden="true"
          />
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69B5E] block font-medium">
              Transmission Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal tracking-tight">
              Inquiry Submitted
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#D4D4D4] leading-relaxed font-light">
          Thank you for contacting Saif Trading Co. Your inquiry has been received by our Hong Kong trade desk.
        </p>

        {submissionResult.reference && (
          <div className="p-4 bg-[#0A0A0A] border border-[#2A2A2A] space-y-1">
            <span className="text-[10px] text-[#737373] uppercase tracking-wider block">
              Reference Identification
            </span>
            <span className="font-mono text-sm text-[#B69B5E] tracking-wider block">
              {submissionResult.reference}
            </span>
          </div>
        )}

        <div className="space-y-2 text-xs text-[#A3A3A3] pt-2 border-t border-[#1C1C1C]">
          <div className="flex justify-between py-1 border-b border-[#1A1A1A]">
            <span>Inquiry Type:</span>
            <span className="text-[#F5F5F5]">{formData.inquiryType}</span>
          </div>
          {gemstoneContext && (
            <div className="flex justify-between py-1 border-b border-[#1A1A1A]">
              <span>Specimen:</span>
              <span className="text-[#F5F5F5]">{gemstoneContext.name}</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-[#1A1A1A]">
            <span>Contact Email:</span>
            <span className="text-[#F5F5F5]">{formData.email}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B69B5E] text-[#050505] font-medium text-xs uppercase tracking-wider hover:bg-[#C8AE6F] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#171717] text-[#D4D4D4] border border-[#2A2A2A] text-xs uppercase tracking-wider hover:border-[#3A3A3A] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
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
          className="p-5 bg-[#1A0A0A] border border-[#DC2626]/60 text-sm space-y-3"
        >
          <div className="flex items-center gap-2 text-[#EF4444] font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Submission Notice</span>
          </div>
          <p className="text-xs text-[#E5E5E5] leading-relaxed">
            {submitError}
          </p>
          <div className="pt-2 border-t border-[#331111] flex flex-wrap gap-4 text-xs text-[#A3A3A3]">
            <a
              href="tel:+85235251640"
              className="inline-flex items-center gap-1.5 hover:text-[#B69B5E] text-[#F5F5F5]"
            >
              <Phone className="w-3.5 h-3.5 text-[#B69B5E]" />
              <span>+852 3525 1640</span>
            </a>
            <a
              href="mailto:Saiftradingco@yahoo.com"
              className="inline-flex items-center gap-1.5 hover:text-[#B69B5E] text-[#F5F5F5]"
            >
              <Mail className="w-3.5 h-3.5 text-[#B69B5E]" />
              <span>Saiftradingco@yahoo.com</span>
            </a>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Gemstone inquiry form"
        className="p-6 sm:p-8 bg-[#101010] border border-[#2A2A2A] space-y-6"
      >
        <div className="border-b border-[#1C1C1C] pb-4">
          <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F5] font-normal">
            Trade Inquiry Form
          </h2>
          <p className="text-xs text-[#A3A3A3] mt-1">
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
          <p className="text-xs text-[#737373] leading-relaxed">
            By submitting this form, you agree that the information provided may be used to respond to your inquiry in accordance with our{" "}
            <Link
              href="/privacy"
              className="text-[#A3A3A3] hover:text-[#B69B5E] underline underline-offset-2 transition-colors"
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
