import React from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/server";
import { getAdminCategories } from "@/lib/data/gemstones-admin";
import { CategoryListManager } from "@/components/admin/CategoryListManager";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Categories Management | Saif Trading Co",
  description: "Manage rough gemstone specimen categories and collections.",
  canonical: "/admin/categories",
  noIndex: true,
});

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-5 border-b border-[#2A2A2A]">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69B5E] font-medium">
          Mineralogical Classification
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal tracking-tight mt-1">
          Gemstone Categories
        </h1>
        <p className="text-xs text-[#A3A3A3] mt-1 font-light">
          Configure mineral species and collection taxonomies for the public catalogue.
        </p>
      </div>

      <CategoryListManager categories={categories} />
    </div>
  );
}
