"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import type { GemstoneWithDetails } from "@/types/gemstone";
import type { GemstoneStatus } from "@/types/database";
import { generateSlug, type AdminGemstoneInput } from "@/lib/validations/gemstone";
import { createGemstoneAction, updateGemstoneAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";

export interface GemstoneFormProps {
  mode: "create" | "edit";
  categories: Array<{ id: string; name: string; slug: string }>;
  initialData?: GemstoneWithDetails;
}

export function GemstoneForm({
  mode,
  categories,
  initialData,
}: GemstoneFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form states
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(
    Boolean(initialData?.slug)
  );
  const [categoryId, setCategoryId] = useState(
    initialData?.category_id || categories[0]?.id || ""
  );
  const [sku, setSku] = useState(initialData?.sku || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || ""
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  // Specifications
  const [caratWeight, setCaratWeight] = useState<string>(
    initialData?.carat_weight?.toString() || ""
  );
  const [dimensions, setDimensions] = useState(initialData?.dimensions || "");
  const [color, setColor] = useState(initialData?.color || "");
  const [clarity, setClarity] = useState(initialData?.clarity || "");
  const [cut, setCut] = useState(initialData?.cut || "");
  const [origin, setOrigin] = useState(initialData?.origin || "");
  const [treatment, setTreatment] = useState(initialData?.treatment || "");

  // Pricing
  const [price, setPrice] = useState<string>(
    initialData?.price !== null && initialData?.price !== undefined
      ? initialData.price.toString()
      : ""
  );
  const [currency, setCurrency] = useState(initialData?.currency || "USD");

  // Availability & Publishing
  const [status, setStatus] = useState<GemstoneStatus>(
    initialData?.status || "draft"
  );
  const [featured, setFeatured] = useState<boolean>(
    initialData?.featured || false
  );

  // Certification
  const [certificateLab, setCertificateLab] = useState(
    initialData?.certificate_lab || ""
  );
  const [certificateNumber, setCertificateNumber] = useState(
    initialData?.certificate_number || ""
  );
  const [certificateUrl, setCertificateUrl] = useState(
    initialData?.certificate_url || ""
  );

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seo_description || ""
  );

  // Status & feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto slug generation on name change if not manually edited
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugManuallyEdited && mode === "create") {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugRegenerate = () => {
    setSlug(generateSlug(name));
    setIsSlugManuallyEdited(false);
  };

  const handleSubmit = (overrideStatus?: GemstoneStatus) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const targetStatus = overrideStatus || status;

    if (!name.trim()) {
      setErrorMsg("Please enter a specimen name.");
      return;
    }

    if (!slug.trim()) {
      setErrorMsg("Please specify a URL slug.");
      return;
    }

    if (!categoryId) {
      setErrorMsg("Please select a valid gemstone category.");
      return;
    }

    const payload: AdminGemstoneInput = {
      name: name.trim(),
      slug: slug.trim(),
      category_id: categoryId,
      sku: sku.trim() || null,
      short_description: shortDescription.trim() || null,
      description: description.trim() || null,
      price: price ? parseFloat(price) : null,
      currency: currency || "USD",
      carat_weight: caratWeight ? parseFloat(caratWeight) : null,
      dimensions: dimensions.trim() || null,
      color: color.trim() || null,
      clarity: clarity.trim() || null,
      cut: cut.trim() || null,
      origin: origin.trim() || null,
      treatment: treatment.trim() || null,
      certificate_lab: certificateLab.trim() || null,
      certificate_number: certificateNumber.trim() || null,
      certificate_url: certificateUrl.trim() || null,
      status: targetStatus,
      featured,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
    };

    startTransition(async () => {
      if (mode === "create") {
        const res = await createGemstoneAction(payload);
        if (res.success && res.data) {
          router.push(`/admin/gemstones/${res.data.id}/edit?created=true`);
        } else {
          setErrorMsg(res.error || "Unable to create gemstone specimen.");
        }
      } else {
        if (!initialData?.id) return;
        const res = await updateGemstoneAction(initialData.id, payload);
        if (res.success) {
          setSuccessMsg("Specimen details updated successfully.");
          setStatus(targetStatus);
        } else {
          setErrorMsg(res.error || "Unable to update gemstone specimen.");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top status banners */}
      {errorMsg && (
        <div
          role="alert"
          className="p-4 bg-red-950/20 border border-red-800/40 text-red-300 text-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-[10px] uppercase tracking-wider underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {successMsg && (
        <div
          role="status"
          className="p-4 bg-[#B6D94C]/10 border border-[#B6D94C]/30 text-[#B6D94C] text-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMsg(null)}
            className="text-[10px] uppercase tracking-wider underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid: Left form fields (2 cols), Right publishing widget (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#B69B5E] font-medium pb-2 border-b border-[#1C1C1C]">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="gemstone-name"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Specimen Name <span className="text-[#B69B5E]">*</span>
                </label>
                <input
                  id="gemstone-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Natural Rough Green Tourmaline Crystal"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="gemstone-category"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Category <span className="text-[#B69B5E]">*</span>
                </label>
                <select
                  id="gemstone-category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* SKU */}
              <div>
                <label
                  htmlFor="gemstone-sku"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Stock Keeping Unit (SKU)
                </label>
                <input
                  id="gemstone-sku"
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. STC-TRM-001"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#B69B5E] font-mono"
                />
              </div>

              {/* Slug */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="gemstone-slug"
                    className="text-xs font-medium text-[#F5F5F5]"
                  >
                    URL Slug <span className="text-[#B69B5E]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleSlugRegenerate}
                    className="text-[10px] text-[#B69B5E] hover:underline flex items-center gap-1 font-mono"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Generate from Title</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="bg-[#141414] border border-r-0 border-[#2A2A2A] px-3 py-2.5 text-[11px] font-mono text-[#737373] select-none">
                    /gemstones/
                  </span>
                  <input
                    id="gemstone-slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setIsSlugManuallyEdited(true);
                    }}
                    placeholder="natural-rough-green-tourmaline-crystal"
                    className="flex-1 bg-[#050505] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#B69B5E] font-mono"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="gemstone-short-desc"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Short Summary
                </label>
                <input
                  id="gemstone-short-desc"
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="One sentence overview for catalogue listings and preview cards"
                  maxLength={300}
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Full Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="gemstone-desc"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Full Mineralogical Description
                </label>
                <textarea
                  id="gemstone-desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed mineralogical characteristics, crystal habit, luster, transparency, and provenance notes..."
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F5F5] placeholder-[#737373] focus:outline-none focus:border-[#B69B5E] leading-relaxed resize-y"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Physical Specifications */}
          <div className="bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#B69B5E] font-medium pb-2 border-b border-[#1C1C1C]">
              2. Physical & Mineralogical Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Carat Weight */}
              <div>
                <label
                  htmlFor="spec-carat"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Carat Weight (ct)
                </label>
                <input
                  id="spec-carat"
                  type="number"
                  step="0.01"
                  min="0"
                  value={caratWeight}
                  onChange={(e) => setCaratWeight(e.target.value)}
                  placeholder="e.g. 54.8"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] font-mono focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Dimensions */}
              <div>
                <label
                  htmlFor="spec-dimensions"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Dimensions (L × W × D)
                </label>
                <input
                  id="spec-dimensions"
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 42 × 24 × 18 mm"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] font-mono focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Color */}
              <div>
                <label
                  htmlFor="spec-color"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Color Hue & Saturation
                </label>
                <input
                  id="spec-color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Deep Forest Green"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Clarity */}
              <div>
                <label
                  htmlFor="spec-clarity"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Clarity Grade
                </label>
                <input
                  id="spec-clarity"
                  type="text"
                  value={clarity}
                  onChange={(e) => setClarity(e.target.value)}
                  placeholder="e.g. Transparent / Eye-Clean"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Cut / Habit */}
              <div>
                <label
                  htmlFor="spec-cut"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Crystal Habit / Form
                </label>
                <input
                  id="spec-cut"
                  type="text"
                  value={cut}
                  onChange={(e) => setCut(e.target.value)}
                  placeholder="e.g. Striated Trigonal Prism"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Origin */}
              <div>
                <label
                  htmlFor="spec-origin"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Geographic Provenance
                </label>
                <input
                  id="spec-origin"
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. Paprok, Nuristan, Afghanistan"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              {/* Treatment */}
              <div className="sm:col-span-2 md:col-span-3">
                <label
                  htmlFor="spec-treatment"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Enhancement / Treatment Status
                </label>
                <input
                  id="spec-treatment"
                  type="text"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  placeholder="e.g. 100% Natural / Unheated Rough"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Certification & Authenticity */}
          <div className="bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#B69B5E] font-medium pb-2 border-b border-[#1C1C1C]">
              3. Laboratory Certification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cert-lab"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Testing Laboratory
                </label>
                <input
                  id="cert-lab"
                  type="text"
                  value={certificateLab}
                  onChange={(e) => setCertificateLab(e.target.value)}
                  placeholder="e.g. GIA / SSEF / GRS / Gübelin"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              <div>
                <label
                  htmlFor="cert-number"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Certificate Identification #
                </label>
                <input
                  id="cert-number"
                  type="text"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  placeholder="e.g. 222589012"
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] font-mono focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="cert-url"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Online Report Verification URL (HTTPS)
                </label>
                <input
                  id="cert-url"
                  type="url"
                  value={certificateUrl}
                  onChange={(e) => setCertificateUrl(e.target.value)}
                  placeholder="https://www.gia.edu/report-check?reportno=..."
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] font-mono focus:outline-none focus:border-[#B69B5E]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: SEO Metadata */}
          <div className="bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#B69B5E] font-medium pb-2 border-b border-[#1C1C1C]">
              4. Search Engine Optimization
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="seo-title"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Meta Title Tag
                </label>
                <input
                  id="seo-title"
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Defaults to specimen name + Saif Trading Co"
                  maxLength={100}
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>

              <div>
                <label
                  htmlFor="seo-desc"
                  className="block text-xs font-medium text-[#F5F5F5] mb-1.5"
                >
                  Meta Description
                </label>
                <input
                  id="seo-desc"
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Defaults to short summary"
                  maxLength={200}
                  className="w-full bg-[#050505] border border-[#2A2A2A] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Publishing Column */}
        <div className="space-y-6">
          {/* Status & Publication Box */}
          <div className="bg-[#101010] border border-[#2A2A2A] p-5 space-y-5 sticky top-20">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F5] font-medium pb-2 border-b border-[#1C1C1C]">
              Publishing & Status
            </h3>

            {/* Status Select */}
            <div className="space-y-1.5">
              <label
                htmlFor="publish-status"
                className="block text-xs font-medium text-[#F5F5F5]"
              >
                Catalogue Status <span className="text-[#B69B5E]">*</span>
              </label>
              <select
                id="publish-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as GemstoneStatus)}
                className="w-full bg-[#050505] border border-[#2A2A2A] p-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
              >
                <option value="draft">Draft (Private, not visible publicly)</option>
                <option value="available">Available (Public catalogue item)</option>
                <option value="sold">Sold (Preserved record marked sold)</option>
                <option value="hidden">Hidden (Archived / delisted)</option>
              </select>
              <p className="text-[10px] text-[#737373] font-light">
                {status === "draft" && "Safe mode: invisible to visitors."}
                {status === "available" && "Live on the public website."}
                {status === "sold" && "Visible on website with SOLD banner."}
                {status === "hidden" && "Completely hidden from collection listings."}
              </p>
            </div>

            {/* Featured toggle */}
            <div className="pt-3 border-t border-[#1C1C1C]">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="mt-0.5 accent-[#B69B5E] w-4 h-4 rounded-none bg-[#050505] border-[#2A2A2A]"
                />
                <div>
                  <span className="text-xs text-[#F5F5F5] font-medium block">
                    Featured on Homepage
                  </span>
                  <span className="text-[10px] text-[#737373] block mt-0.5">
                    Feature this specimen in the curated homepage showcase.
                  </span>
                </div>
              </label>
            </div>

            {/* Pricing Section */}
            <div className="pt-3 border-t border-[#1C1C1C] space-y-3">
              <label className="block text-xs font-medium text-[#F5F5F5]">
                Pricing (Trade / B2B)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price (leave empty for inquiry)"
                  className="flex-1 bg-[#050505] border border-[#2A2A2A] p-2 text-xs text-[#F5F5F5] font-mono focus:outline-none focus:border-[#B69B5E]"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-[#050505] border border-[#2A2A2A] p-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#B69B5E]"
                >
                  <option value="USD">USD</option>
                  <option value="HKD">HKD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <p className="text-[10px] text-[#737373]">
                Empty price displays &quot;Price on Application / Inquiry&quot; on the public site.
              </p>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-[#1C1C1C] space-y-2.5">
              {mode === "create" ? (
                <>
                  <Button
                    type="button"
                    onClick={() => handleSubmit("draft")}
                    disabled={isPending}
                    variant="secondary"
                    className="w-full text-xs border-[#2A2A2A] hover:border-[#B69B5E]"
                  >
                    {isPending ? (
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5 mr-2" />
                    )}
                    <span>Save as Draft</span>
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleSubmit("available")}
                    disabled={isPending}
                    variant="luxury"
                    className="w-full text-xs"
                  >
                    {isPending ? (
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 mr-2" />
                    )}
                    <span>Save & Publish</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isPending}
                    variant="luxury"
                    className="w-full text-xs"
                  >
                    {isPending ? (
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5 mr-2" />
                    )}
                    <span>Save Changes</span>
                  </Button>

                  {status !== "available" && (
                    <Button
                      type="button"
                      onClick={() => handleSubmit("available")}
                      disabled={isPending}
                      variant="secondary"
                      className="w-full text-xs border-[#B6D94C]/40 text-[#B6D94C] hover:bg-[#B6D94C]/10"
                    >
                      <span>Publish (Make Available)</span>
                    </Button>
                  )}

                  {status === "available" && (
                    <Button
                      type="button"
                      onClick={() => handleSubmit("sold")}
                      disabled={isPending}
                      variant="secondary"
                      className="w-full text-xs border-[#2A2A2A] text-[#A3A3A3]"
                    >
                      <span>Mark as Sold</span>
                    </Button>
                  )}
                </>
              )}

              <Link href="/admin/gemstones" className="block text-center pt-1">
                <span className="text-[11px] text-[#737373] hover:text-[#F5F5F5] uppercase tracking-wider inline-flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Cancel and Return
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
