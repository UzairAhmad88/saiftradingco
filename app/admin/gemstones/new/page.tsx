import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth/server";
import { getAdminCategories } from "@/lib/data/gemstones-admin";
import { GemstoneForm } from "@/components/admin/GemstoneForm";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "New Gemstone Specimen | Saif Trading Co",
  description: "Create and register a new rough gemstone specimen in the catalogue.",
  canonical: "/admin/gemstones/new",
  noIndex: true,
});

export default async function AdminNewGemstonePage() {
  await requireAdmin();

  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-5 border-b border-[#2A2A2A] space-y-2">
        <Link
          href="/admin/gemstones"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#B69B5E] transition-colors uppercase tracking-wider font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Gemstones Catalogue</span>
        </Link>
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69B5E] font-medium">
            New Specimen Registration
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal tracking-tight mt-1">
            Create Gemstone Specimen
          </h1>
          <p className="text-xs text-[#A3A3A3] font-light mt-1">
            Specify physical metrics and details. The specimen will default to{" "}
            <strong className="text-[#F5F5F5]">Draft</strong> until you explicitly choose to publish.
          </p>
        </div>
      </div>

      {/* Creation Form */}
      <GemstoneForm mode="create" categories={categories} />
    </div>
  );
}
