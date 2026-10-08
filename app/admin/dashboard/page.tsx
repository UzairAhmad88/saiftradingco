import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Gem,
  Plus,
  ExternalLink,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  EyeOff,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth/server";
import {
  getAdminCatalogueStats,
  getAdminGemstones,
} from "@/lib/data/gemstones-admin";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Admin Dashboard | Saif Trading Co",
  description: "Operational overview of the rough gemstone catalogue.",
  canonical: "/admin/dashboard",
  noIndex: true,
});

export default async function AdminDashboardPage() {
  await requireAdmin();

  // Fetch real database metrics and recently updated specimens
  const [stats, recentResult] = await Promise.all([
    getAdminCatalogueStats(),
    getAdminGemstones({ pageSize: 5, sort: "updated" }),
  ]);

  const recentGemstones = recentResult.gemstones;

  const statCards = [
    {
      label: "TOTAL SPECIMENS",
      value: stats.total,
      description: "In catalogue database",
      icon: Gem,
      accent: "text-[#F5F5F0]",
      border: "border-[#262626]",
    },
    {
      label: "AVAILABLE",
      value: stats.available,
      description: "Live on public catalogue",
      icon: CheckCircle2,
      accent: "text-[#9CCB63]",
      border: "border-[#9CCB63]/30",
    },
    {
      label: "SOLD",
      value: stats.sold,
      description: "Archived sales history",
      icon: AlertCircle,
      accent: "text-[#9A9A94]",
      border: "border-[#262626]",
    },
    {
      label: "DRAFT",
      value: stats.draft,
      description: "Pending publication review",
      icon: Clock,
      accent: "text-[#B7D98B]",
      border: "border-[#B7D98B]/30",
    },
    {
      label: "HIDDEN",
      value: stats.hidden,
      description: "De-listed from website",
      icon: EyeOff,
      accent: "text-[#737373]",
      border: "border-[#262626]",
    },
    {
      label: "FEATURED",
      value: stats.featured,
      description: "Highlighted on homepage",
      icon: Sparkles,
      accent: "text-[#9CCB63]",
      border: "border-[#9CCB63]/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#262626]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9CCB63] font-medium">
            Operational Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] font-normal tracking-tight mt-1">
            Catalogue Dashboard
          </h1>
          <p className="text-xs text-[#9A9A94] mt-1 font-light">
            Manage rough gemstone specimens, inventory status, and public catalogue visibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/collections" target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs border-[#262626] text-[#9A9A94] hover:text-[#F5F5F0] hover:border-[#9CCB63]/40"
            >
              <span>View Catalogue</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
            </Button>
          </Link>

          <Link href="/admin/gemstones">
            <Button
              size="sm"
              variant="secondary"
              className="text-xs border-[#262626] text-[#F5F5F0] hover:border-[#9CCB63]"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
            </Button>
          </Link>

          <Link href="/admin/gemstones/new">
            <Button size="sm" variant="luxury" className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              <span>Add Gemstone</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Catalogue Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`p-4 bg-[#111111] border ${card.border} rounded-[4px] transition-colors flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between text-[#9A9A94]">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-medium truncate">
                    {card.label}
                  </span>
                  <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden="true" />
                </div>
                <div className="mt-3">
                  <span className={`text-2xl sm:text-3xl font-serif font-light ${card.accent}`}>
                    {card.value}
                  </span>
                  <p className="text-[10px] text-[#9A9A94] mt-1 font-mono truncate">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two Column Section: Recently Updated Gemstones + Operational Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Updated Specimens (2 cols) */}
        <div className="lg:col-span-2 bg-[#111111] border border-[#262626] rounded-[4px] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9CCB63]" aria-hidden="true" />
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-medium">
                Recently Updated Specimens
              </h2>
            </div>
            <Link
              href="/admin/gemstones"
              className="text-[11px] uppercase tracking-wider text-[#9CCB63] hover:underline flex items-center gap-1 font-mono"
            >
              <span>View Table</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentGemstones.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Gem className="w-8 h-8 text-[#404040] mx-auto" aria-hidden="true" />
              <p className="text-xs text-[#9A9A94]">No gemstones have been added yet.</p>
              <Link href="/admin/gemstones/new">
                <Button size="sm" variant="luxury" className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add First Gemstone
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#1F1F1F]">
              {recentGemstones.map((gem) => {
                const primaryImg =
                  gem.images?.find((img) => img.is_primary) || gem.images?.[0];

                const statusColor =
                  gem.status === "available"
                    ? "bg-[#9CCB63]/10 text-[#9CCB63] border-[#9CCB63]/30"
                    : gem.status === "sold"
                    ? "bg-[#262626] text-[#9A9A94] border-[#333333]"
                    : gem.status === "draft"
                    ? "bg-[#B7D98B]/10 text-[#B7D98B] border-[#B7D98B]/30"
                    : "bg-[#171717] text-[#737373] border-[#262626]";

                return (
                  <div
                    key={gem.id}
                    className="py-3 flex items-center justify-between gap-4 group hover:bg-[#171717] px-2 -mx-2 transition-colors rounded-[2px]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Thumbnail */}
                      <div className="relative w-11 h-11 bg-[#0A0A0A] border border-[#262626] rounded-[2px] shrink-0 overflow-hidden">
                        {primaryImg?.image_url ? (
                          <Image
                            src={primaryImg.image_url}
                            alt={gem.name}
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#404040]">
                            <Gem className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Name & metadata */}
                      <div className="min-w-0">
                        <Link
                          href={`/admin/gemstones/${gem.id}/edit`}
                          className="text-xs text-[#F5F5F0] font-medium hover:text-[#9CCB63] transition-colors truncate block"
                        >
                          {gem.name}
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] text-[#9A9A94] font-mono mt-0.5 truncate">
                          <span>{gem.category?.name || "Rough Specimen"}</span>
                          {gem.sku && (
                            <>
                              <span>•</span>
                              <span>{gem.sku}</span>
                            </>
                          )}
                          {gem.carat_weight && (
                            <>
                              <span>•</span>
                              <span>{gem.carat_weight} ct</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status & Edit action */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border font-mono rounded-[2px] ${statusColor}`}
                      >
                        {gem.status}
                      </span>
                      <Link
                        href={`/admin/gemstones/${gem.id}/edit`}
                        className="p-1.5 text-[#9A9A94] hover:text-[#F5F5F0] border border-transparent hover:border-[#262626] rounded-[2px] transition-colors"
                        title={`Edit ${gem.name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Operational Shortcuts & Reference (1 col) */}
        <div className="bg-[#111111] border border-[#262626] rounded-[4px] p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#1F1F1F]">
              <Layers className="w-4 h-4 text-[#9CCB63]" aria-hidden="true" />
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-medium">
                Catalogue Guidelines
              </h2>
            </div>

            <div className="space-y-3 text-xs text-[#9A9A94] font-light leading-relaxed">
              <div className="p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#9CCB63] block">
                  Publication Safety
                </span>
                <p className="text-[11px]">
                  All newly created gemstones default to <strong className="text-[#F5F5F0]">Draft</strong>. Change status to <strong className="text-[#9CCB63]">Available</strong> to display on the public website.
                </p>
              </div>

              <div className="p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#9A9A94] block">
                  Sold Status Preservation
                </span>
                <p className="text-[11px]">
                  Marking specimens as <strong className="text-[#F5F5F0]">Sold</strong> preserves public specimen URLs and inquiries while marking the specimen as acquired.
                </p>
              </div>

              <div className="p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#737373] block">
                  Image Guidelines
                </span>
                <p className="text-[11px]">
                  Supported formats: WebP, JPEG, PNG (max 10MB per asset). Set exactly one primary image per specimen.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1F1F1F]">
            <Link href="/admin/gemstones/new" className="block w-full">
              <Button size="md" variant="luxury" className="w-full text-xs">
                <Plus className="w-3.5 h-3.5 mr-2" />
                <span>Create New Specimen</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
