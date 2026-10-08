import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Gem, AlertCircle } from "lucide-react";
import { requireAdmin } from "@/lib/auth/server";
import {
  getAdminGemstones,
  getAdminCategories,
} from "@/lib/data/gemstones-admin";
import { GemstonesFilterBar } from "@/components/admin/GemstonesFilterBar";
import { GemstonesTable } from "@/components/admin/GemstonesTable";
import { GemstonesPagination } from "@/components/admin/GemstonesPagination";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Gemstone Management | Saif Trading Co",
  description: "Manage, filter, and curate rough gemstone specimens in the catalogue.",
  canonical: "/admin/gemstones",
  noIndex: true,
});

interface AdminGemstonesPageProps {
  searchParams: Promise<{
    search?: string;
    status?: "all" | "draft" | "available" | "sold" | "hidden";
    category?: string;
    featured?: "all" | "featured" | "not_featured";
    sort?:
      | "newest"
      | "oldest"
      | "name_asc"
      | "name_desc"
      | "updated"
      | "price_asc"
      | "price_desc";
    page?: string;
  }>;
}

export default async function AdminGemstonesPage({
  searchParams,
}: AdminGemstonesPageProps) {
  await requireAdmin();

  const resolvedParams = await searchParams;
  const pageNumber = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;
  const currentPage = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

  const [gemstonesResult, categories] = await Promise.all([
    getAdminGemstones({
      search: resolvedParams.search,
      status: resolvedParams.status,
      category: resolvedParams.category,
      featured: resolvedParams.featured,
      sort: resolvedParams.sort,
      page: currentPage,
      pageSize: 20,
    }),
    getAdminCategories(),
  ]);

  const { gemstones, total, totalPages, pageSize } = gemstonesResult;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#2A2A2A]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69B5E] font-medium">
            Catalogue Database
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal tracking-tight mt-1">
            Gemstone Management
          </h1>
          <p className="text-xs text-[#A3A3A3] mt-1 font-light">
            Search, filter, edit, and publish rough gemstone inventory.
          </p>
        </div>

        <div>
          <Link href="/admin/gemstones/new">
            <Button size="sm" variant="luxury" className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              <span>Add Gemstone</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <GemstonesFilterBar
        categories={categories}
        currentSearch={resolvedParams.search}
        currentStatus={resolvedParams.status}
        currentCategory={resolvedParams.category}
        currentFeatured={resolvedParams.featured}
        currentSort={resolvedParams.sort}
      />

      {/* Gemstones Content */}
      {gemstones.length === 0 ? (
        <div className="bg-[#101010] border border-[#2A2A2A] p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-[#0A0A0A] border border-[#2A2A2A] flex items-center justify-center mx-auto text-[#737373]">
            {resolvedParams.search || resolvedParams.status ? (
              <AlertCircle className="w-6 h-6 text-[#B69B5E]" />
            ) : (
              <Gem className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-serif text-[#F5F5F5]">
              {resolvedParams.search ||
              resolvedParams.status ||
              resolvedParams.category
                ? "No matching gemstones found"
                : "Your catalogue is empty"}
            </h2>
            <p className="text-xs text-[#A3A3A3] max-w-sm mx-auto font-light leading-relaxed">
              {resolvedParams.search ||
              resolvedParams.status ||
              resolvedParams.category
                ? "Try adjusting your search criteria, clear status filters, or reset the search query."
                : "Begin curating the Saif Trading Co catalogue by adding your first rough gemstone specimen."}
            </p>
          </div>

          <div>
            {resolvedParams.search ||
            resolvedParams.status ||
            resolvedParams.category ? (
              <Link href="/admin/gemstones">
                <Button size="sm" variant="secondary" className="text-xs">
                  Reset All Filters
                </Button>
              </Link>
            ) : (
              <Link href="/admin/gemstones/new">
                <Button size="sm" variant="luxury" className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add First Gemstone
                </Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <GemstonesTable gemstones={gemstones} />
          <GemstonesPagination
            page={currentPage}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
