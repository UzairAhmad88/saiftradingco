import React from "react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/server";
import { getAdminInquiries } from "@/lib/data/gemstones-admin";
import { InquiriesListManager } from "@/components/admin/InquiriesListManager";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Trade Inquiries | Saif Trading Co",
  description: "View, triage, and manage incoming customer and trade inquiries.",
  canonical: "/admin/inquiries",
  noIndex: true,
});

interface AdminInquiriesPageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AdminInquiriesPage({
  searchParams,
}: AdminInquiriesPageProps) {
  await requireAdmin();

  const resolvedParams = await searchParams;
  const currentPage = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;

  const inquiriesData = await getAdminInquiries({
    status: resolvedParams.status,
    search: resolvedParams.search,
    page: isNaN(currentPage) || currentPage < 1 ? 1 : currentPage,
    pageSize: 30,
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-5 border-b border-[#262626]">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9CCB63] font-medium">
          Commercial Correspondence
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] font-normal tracking-tight mt-1">
          Trade Inquiries
        </h1>
        <p className="text-xs text-[#9A9A94] mt-1 font-light">
          Review buyer requests, quotation inquiries, and specimen documentation requests.
        </p>
      </div>

      <InquiriesListManager
        initialData={inquiriesData}
        currentStatus={resolvedParams.status || "all"}
        currentSearch={resolvedParams.search || ""}
      />
    </div>
  );
}
