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
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import type { AdminCategoryRow } from "@/lib/data/gemstones-admin";
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
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
  const [editingCategory, setEditingCategory] = useState<AdminCategoryRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategoryRow | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // New Category form state
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newSortOrder, setNewSortOrder] = useState("0");

  // Edit Category form state
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editSortOrder, setEditSortOrder] = useState("0");
  const [editIsActive, setEditIsActive] = useState(true);

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

  const openEditModal = (cat: AdminCategoryRow) => {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditDescription(cat.description || "");
    setEditSortOrder(cat.sort_order.toString());
    setEditIsActive(cat.is_active);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editName.trim() || !editSlug.trim()) return;

    startTransition(async () => {
      const res = await updateCategoryAction(editingCategory.id, {
        name: editName.trim(),
        slug: editSlug.trim(),
        description: editDescription.trim() || null,
        is_active: editIsActive,
        sort_order: parseInt(editSortOrder, 10) || 0,
      });

      if (res.success) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? {
                  ...c,
                  name: editName.trim(),
                  slug: editSlug.trim(),
                  description: editDescription.trim() || null,
                  is_active: editIsActive,
                  sort_order: parseInt(editSortOrder, 10) || 0,
                }
              : c
          )
        );
        setEditingCategory(null);
        setFeedback({ type: "success", message: "Category updated successfully." });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update category.",
        });
      }
    });
  };

  const handleDeleteCategory = () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;

    startTransition(async () => {
      const res = await deleteCategoryAction(targetId);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== targetId));
        setDeleteTarget(null);
        setFeedback({ type: "success", message: "Category deleted successfully." });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to delete category.",
        });
        setDeleteTarget(null);
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
          Manage rough mineral categories. Core mineral species: Tourmaline, Kunzite, Morganite.
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
      <div className="bg-[#101010] border border-[#2A2A2A] overflow-x-auto rounded-[4px]">
        <table className="w-full text-left border-collapse" aria-label="Categories table">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#0A0A0A] text-[10px] font-mono uppercase tracking-[0.16em] text-[#737373]">
              <th scope="col" className="py-3 px-4">Category Name</th>
              <th scope="col" className="py-3 px-4">Slug</th>
              <th scope="col" className="py-3 px-4">Order</th>
              <th scope="col" className="py-3 px-4">Specimens</th>
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

                <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373]">
                  {cat.sort_order}
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

                <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
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
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 text-[#9A9A94] hover:text-[#9CCB63] border border-[#262626] rounded-[4px] transition-colors"
                    title="Edit category details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(cat.id, cat.is_active)}
                    disabled={isPending}
                    className="px-2 py-1 text-[10px] uppercase tracking-wider text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/40 transition-colors"
                  >
                    {cat.is_active ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(cat)}
                    disabled={isPending}
                    className="p-1.5 text-[#737373] hover:text-red-400 border border-[#262626] hover:border-red-900/40 rounded-[4px] transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
                  placeholder="Mineralogical species description..."
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

      {/* Edit Category Modal */}
      {editingCategory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#111111] border border-[#262626] rounded-[4px] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3 className="text-base font-serif text-[#F5F5F0]">
                Edit Category: {editingCategory.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="p-1 text-[#737373] hover:text-[#F5F5F0]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
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
                  value={editSlug}
                  onChange={(e) => setEditSlug(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] font-mono focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editSortOrder}
                    onChange={(e) => setEditSortOrder(e.target.value)}
                    className="w-full bg-[#050505] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] font-mono focus:outline-none focus:border-[#9CCB63]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F5F5F0] mb-1">
                    Status
                  </label>
                  <select
                    value={editIsActive ? "active" : "inactive"}
                    onChange={(e) => setEditIsActive(e.target.value === "active")}
                    className="w-full bg-[#050505] border border-[#262626] rounded-[4px] p-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#9CCB63]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1F1F1F] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
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
                  <span>Save Changes</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Dialog */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#111111] border border-red-900/40 rounded-[4px] max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-red-950/40 border border-red-800/50 flex items-center justify-center text-red-400 mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-serif text-[#F5F5F0]">
                Delete Category?
              </h3>
              <p className="text-xs text-[#9A9A94] leading-relaxed">
                Are you sure you want to delete <strong className="text-[#F5F5F0]">{deleteTarget.name}</strong>?
                {deleteTarget.specimenCount > 0 ? (
                  <span className="block mt-2 text-red-400 font-medium">
                    Warning: There are {deleteTarget.specimenCount} specimen(s) assigned to this category. The system will disallow deletion until they are reassigned or deleted.
                  </span>
                ) : (
                  <span className="block mt-2">
                    This category has 0 assigned specimens and can be safely deleted.
                  </span>
                )}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCategory}
                disabled={isPending}
                className="px-4 py-2 text-xs bg-red-700 hover:bg-red-600 text-white font-medium rounded-[4px] transition-colors flex items-center gap-1.5"
              >
                {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
