"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  XCircle,
  Plus,
  ExternalLink,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import type { AdminCategoryRow } from "@/lib/data/gemstones-admin";
import {
  createCategoryAction,
  toggleCategoryActiveAction,
} from "@/lib/admin/actions";
import { generateSlug } from "@/lib/validations/gemstone";
import { Button } from "@/components/ui/Button";

export interface CategoryListManagerProps {
  categories: AdminCategoryRow[];
}

export function CategoryListManager({
  categories: initialCategories,
}: CategoryListManagerProps) {
  const [categories, setCategories] = useState<AdminCategoryRow[]>(initialCategories);
  const [isPending, startTransition] = useTransition();
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // New Category form state
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSortOrder, setNewSortOrder] = useState("0");

  const handleNameChange = (val: string) => {
    setNewName(val);
    setNewSlug(generateSlug(val));
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    startTransition(async () => {
      const res = await toggleCategoryActiveAction(id, nextStatus);
      if (res.success) {
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? { ...c, is_active: nextStatus } : c))
        );
        setFeedback({
          type: "success",
          message: `Category ${nextStatus ? "activated" : "deactivated"} successfully.`,
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update category status.",
        });
      }
    });
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newSlug.trim()) return;

    startTransition(async () => {
      const res = await createCategoryAction({
        name: newName.trim(),
        slug: newSlug.trim(),
        description: newDescription.trim() || null,
        is_active: true,
        sort_order: parseInt(newSortOrder, 10) || 0,
      });

      if (res.success && res.data) {
        const added: AdminCategoryRow = {
          id: res.data.id,
          name: newName.trim(),
          slug: newSlug.trim(),
          description: newDescription.trim() || null,
          image: null,
          sort_order: parseInt(newSortOrder, 10) || 0,
          is_active: true,
          specimenCount: 0,
          created_at: new Date().toISOString(),
        };
        setCategories((prev) => [...prev, added]);
        setShowAddModal(false);
        setNewName("");
        setNewSlug("");
        setNewDescription("");
        setFeedback({ type: "success", message: "Category created successfully." });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to create category.",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div
          role="status"
          className={`p-4 text-xs border rounded-[4px] flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-[#9CCB63]/10 border-[#9CCB63]/30 text-[#9CCB63]"
              : "bg-red-950/20 border-red-800/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[10px] uppercase tracking-wider underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Action Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#A3A3A3]">
          Manage rough mineral categories. Standard core categories: Tourmaline, Kunzite, Morganite.
        </p>

        <Button
          size="sm"
          variant="luxury"
          onClick={() => setShowAddModal(true)}
          className="text-xs"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          <span>Add Category</span>
        </Button>
      </div>

      {/* Category Table */}
      <div className="bg-[#101010] border border-[#2A2A2A] overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label="Categories table">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[10px] font-mono uppercase tracking-[0.16em] text-[#737373]">
              <th scope="col" className="py-3 px-4">Category Name</th>
              <th scope="col" className="py-3 px-4">Slug</th>
              <th scope="col" className="py-3 px-4">Catalogue Specimens</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1C1C] text-xs">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-[#141414] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#9CCB63] shrink-0" />
                    <div>
                      <span className="font-medium text-[#F5F5F0]">{cat.name}</span>
                      {cat.description && (
                        <p className="text-[11px] text-[#737373] line-clamp-1 max-w-sm mt-0.5">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-mono text-[11px] text-[#9A9A94]">
                  /{cat.slug}
                </td>

                <td className="py-3.5 px-4 font-mono text-[11px] text-[#F5F5F0]">
                  <Link
                    href={`/admin/gemstones?category=${cat.slug}`}
                    className="hover:text-[#9CCB63] underline decoration-[#333333] hover:decoration-[#9CCB63]"
                  >
                    {cat.specimenCount} {cat.specimenCount === 1 ? "specimen" : "specimens"}
                  </Link>
                </td>

                <td className="py-3.5 px-4">
                  {cat.is_active ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#9CCB63] bg-[#9CCB63]/10 border border-[#9CCB63]/30 rounded-[4px] px-2 py-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#737373] bg-[#171717] border border-[#262626] rounded-[4px] px-2 py-0.5">
                      <XCircle className="w-3 h-3" />
                      <span>Inactive</span>
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-4 text-right space-x-2">
                  <Link
                    href={`/collections/${cat.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#737373] hover:text-[#F5F5F0] inline-block"
                    title="View public category page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(cat.id, cat.is_active)}
                    disabled={isPending}
                    className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/40 transition-colors"
                  >
                    {cat.is_active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#111111] border border-[#262626] rounded-[4px] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-serif text-[#F5F5F0]">
              Add Gemstone Category
            </h3>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Aquamarine"
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="e.g. aquamarine"
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] font-mono focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Mineralogical family description..."
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={newSortOrder}
                  onChange={(e) => setNewSortOrder(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] font-mono focus:outline-none focus:border-[#9CCB63]"
                />
              </div>

              <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-xs text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px]"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  size="sm"
                  variant="luxury"
                  disabled={isPending}
                  className="text-xs"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />}
                  <span>Save Category</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
