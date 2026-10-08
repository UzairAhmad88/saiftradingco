import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth/server";
import {
  getAdminGemstoneById,
  getAdminCategories,
} from "@/lib/data/gemstones-admin";
import { GemstoneForm } from "@/components/admin/GemstoneForm";
import { GemstoneImageManager } from "@/components/admin/GemstoneImageManager";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Edit Gemstone | Saif Trading Co",
  description: "Edit rough gemstone specifications, photography, and publication status.",
  noIndex: true,
});

interface AdminEditGemstonePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditGemstonePage({
  params,
}: AdminEditGemstonePageProps) {
  await requireAdmin();

  const { id } = await params;

  const [gemstone, categories] = await Promise.all([
    getAdminGemstoneById(id),
    getAdminCategories(),
  ]);

  if (!gemstone) {
    notFound();
  }

  const isLive = gemstone.status === "available" || gemstone.status === "sold";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-5 border-b border-[#262626] space-y-2">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/gemstones"
            className="inline-flex items-center gap-1.5 text-xs text-[#9A9A94] hover:text-[#9CCB63] transition-colors uppercase tracking-wider font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Gemstones Catalogue</span>
          </Link>

          {isLive && (
            <Link
              href={`/gemstones/${gemstone.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#9CCB63] hover:underline uppercase tracking-wider font-mono"
            >
              <span>View Public Specimen Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9CCB63] font-medium">
              Editing Specimen Record
            </span>
            {gemstone.sku && (
              <span className="text-[10px] font-mono text-[#9A9A94] bg-[#111111] px-1.5 py-0.5 border border-[#262626] rounded-[4px]">
                {gemstone.sku}
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] font-normal tracking-tight mt-1">
            {gemstone.name}
          </h1>
          <p className="text-xs text-[#9A9A94] font-light mt-1">
            Category: {gemstone.category?.name || "Uncategorized"} · Status:{" "}
            <span className="font-mono uppercase text-[#F5F5F0]">{gemstone.status}</span>
          </p>
        </div>
      </div>

      {/* Photography & Image Management Section */}
      <section aria-labelledby="images-section-title">
        <h2 id="images-section-title" className="sr-only">
          Specimen Images
        </h2>
        <GemstoneImageManager
          gemstoneId={gemstone.id}
          initialImages={gemstone.images || []}
        />
      </section>

      {/* Gemstone Specification & Publication Form */}
      <section aria-labelledby="details-section-title">
        <h2 id="details-section-title" className="sr-only">
          Specimen Specifications & Publishing
        </h2>
        <GemstoneForm
          mode="edit"
          categories={categories}
          initialData={gemstone}
        />
      </section>
    </div>
  );
}
