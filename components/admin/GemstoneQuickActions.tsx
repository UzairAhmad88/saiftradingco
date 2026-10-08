"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Edit2, Eye, Star, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import {
  quickUpdateGemstoneStatusAction,
  quickToggleFeaturedAction,
  deleteGemstoneAction,
} from "@/lib/admin/actions";
import type { GemstoneStatus } from "@/types/database";

export interface GemstoneQuickActionsProps {
  id: string;
  slug: string;
  name: string;
  status: GemstoneStatus;
  featured: boolean;
}

export function GemstoneQuickActions({
  id,
  slug,
  name,
  status: initialStatus,
  featured: initialFeatured,
}: GemstoneQuickActionsProps) {
  const [status, setStatus] = useState<GemstoneStatus>(initialStatus);
  const [featured, setFeatured] = useState<boolean>(initialFeatured);
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleStatusChange = (newStatus: GemstoneStatus) => {
    setStatus(newStatus);
    startTransition(async () => {
      const res = await quickUpdateGemstoneStatusAction(id, newStatus);
      if (!res.success) {
        setStatus(status); // rollback
        setFeedback(res.error || "Failed to update status");
      } else {
        setFeedback(null);
      }
    });
  };

  const handleToggleFeatured = () => {
    const nextFeatured = !featured;
    setFeatured(nextFeatured);
    startTransition(async () => {
      const res = await quickToggleFeaturedAction(id, nextFeatured);
      if (!res.success) {
        setFeatured(featured); // rollback
        setFeedback(res.error || "Failed to toggle featured");
      } else {
        setFeedback(null);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteGemstoneAction(id);
      if (!res.success) {
        setFeedback(res.error || "Failed to delete gemstone");
        setShowDeleteModal(false);
      } else {
        setShowDeleteModal(false);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-1.5 justify-end">
        {/* Status Dropdown */}
        <select
          value={status}
          disabled={isPending}
          onChange={(e) => handleStatusChange(e.target.value as GemstoneStatus)}
          className="bg-[#0A0A0A] border border-[#2A2A2A] text-[11px] text-[#F5F5F5] py-1 px-2 focus:outline-none focus:border-[#B69B5E]"
          aria-label={`Change status for ${name}`}
        >
          <option value="draft">Draft</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="hidden">Hidden</option>
        </select>

        {/* Featured toggle */}
        <button
          type="button"
          onClick={handleToggleFeatured}
          disabled={isPending}
          title={featured ? "Featured specimen (click to unfeature)" : "Standard specimen (click to feature)"}
          className={`p-1.5 border transition-colors ${
            featured
              ? "bg-[#B69B5E]/20 text-[#B69B5E] border-[#B69B5E]/50"
              : "text-[#525252] hover:text-[#A3A3A3] border-transparent hover:border-[#2A2A2A]"
          }`}
          aria-label={`Toggle featured for ${name}`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* View on live site (if available or sold) */}
        {status !== "draft" && status !== "hidden" && (
          <Link
            href={`/gemstones/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title="View live public page"
            className="p-1.5 text-[#737373] hover:text-[#F5F5F5] border border-transparent hover:border-[#2A2A2A] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        )}

        {/* Edit Button */}
        <Link
          href={`/admin/gemstones/${id}/edit`}
          title={`Edit ${name}`}
          className="p-1.5 text-[#B69B5E] hover:text-[#F5F5F5] hover:bg-[#1A1A1A] border border-[#2A2A2A] transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </Link>

        {/* Delete button (trigger modal) */}
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          disabled={isPending}
          title={`Delete ${name}`}
          className="p-1.5 text-[#737373] hover:text-red-400 border border-transparent hover:border-red-900/50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {feedback && (
        <p className="text-[10px] text-red-400 mt-1 text-right">{feedback}</p>
      )}

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#101010] border border-[#2A2A2A] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <h3 id="delete-modal-title" className="text-base font-serif text-[#F5F5F5]">
                Confirm Specimen Deletion
              </h3>
            </div>

            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-[#F5F5F5] font-semibold">{name}</strong>?
              This will remove the record and any associated uploaded storage images.
              Consider setting status to <strong className="text-[#B69B5E]">Hidden</strong> or{" "}
              <strong className="text-[#F5F5F5]">Sold</strong> instead to preserve catalogue history.
            </p>

            <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isPending}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#A3A3A3] hover:text-[#F5F5F5] border border-[#2A2A2A]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 text-xs uppercase tracking-wider bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 flex items-center gap-2"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
