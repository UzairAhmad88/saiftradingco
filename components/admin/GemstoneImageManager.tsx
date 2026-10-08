"use client";

import React, { useState, useTransition, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Star,
  ArrowUp,
  ArrowDown,
  Trash2,
  Loader2,
  AlertCircle,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import type { GemstoneImage } from "@/types/gemstone";
import {
  uploadGemstoneImageAction,
  setPrimaryImageAction,
  reorderGemstoneImagesAction,
  updateImageAltTextAction,
  deleteGemstoneImageAction,
} from "@/lib/admin/actions";

export interface GemstoneImageManagerProps {
  gemstoneId: string;
  initialImages: GemstoneImage[];
}

export function GemstoneImageManager({
  gemstoneId,
  initialImages,
}: GemstoneImageManagerProps) {
  const [images, setImages] = useState<GemstoneImage[]>(initialImages);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [altTextInput, setAltTextInput] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<GemstoneImage | null>(null);
  const [editingAltId, setEditingAltId] = useState<string | null>(null);
  const [currentAltVal, setCurrentAltVal] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFeedback({
        type: "error",
        message: "Image exceeds 10MB limit. Please choose a smaller asset.",
      });
      return;
    }

    // Validate type
    if (!["image/webp", "image/jpeg", "image/png"].includes(file.type)) {
      setFeedback({
        type: "error",
        message: "Only WebP, JPEG, and PNG images are supported.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt_text", altTextInput.trim() || file.name.replace(/\.[^/.]+$/, ""));

    setFeedback(null);

    startTransition(async () => {
      const res = await uploadGemstoneImageAction(gemstoneId, formData);
      if (res.success && res.data) {
        setFeedback({ type: "success", message: "Image uploaded successfully." });
        setAltTextInput("");
        if (fileInputRef.current) fileInputRef.current.value = "";

        // Optimistically add to list
        const newImg: GemstoneImage = {
          id: res.data.id,
          gemstone_id: gemstoneId,
          image_url: res.data.image_url,
          alt_text: altTextInput.trim() || null,
          sort_order: images.length,
          is_primary: images.length === 0,
          created_at: new Date().toISOString(),
        };
        setImages((prev) => [...prev, newImg]);
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Image upload failed.",
        });
      }
    });
  };

  const handleSetPrimary = (imageId: string) => {
    startTransition(async () => {
      const res = await setPrimaryImageAction(gemstoneId, imageId);
      if (res.success) {
        setImages((prev) =>
          prev.map((img) => ({
            ...img,
            is_primary: img.id === imageId,
          }))
        );
        setFeedback({ type: "success", message: "Primary image updated." });
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to set primary." });
      }
    });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newOrder = [...images];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);

    // Update sort orders
    const updatedImages = newOrder.map((img, idx) => ({
      ...img,
      sort_order: idx,
    }));
    setImages(updatedImages);

    startTransition(async () => {
      const res = await reorderGemstoneImagesAction(
        gemstoneId,
        updatedImages.map((img) => img.id)
      );
      if (!res.success) {
        setFeedback({ type: "error", message: "Failed to save image order." });
        setImages(images); // rollback
      }
    });
  };

  const handleSaveAltText = (imageId: string) => {
    startTransition(async () => {
      const res = await updateImageAltTextAction(
        gemstoneId,
        imageId,
        currentAltVal
      );
      if (res.success) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId ? { ...img, alt_text: currentAltVal } : img
          )
        );
        setEditingAltId(null);
        setFeedback({ type: "success", message: "Alt text saved." });
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to save alt text." });
      }
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await deleteGemstoneImageAction(
        gemstoneId,
        deleteTarget.id,
        deleteTarget.storage_path
      );
      if (res.success) {
        setImages((prev) => {
          const filtered = prev.filter((img) => img.id !== deleteTarget.id);
          // If deleted image was primary, first remaining becomes primary
          if (deleteTarget.is_primary && filtered.length > 0) {
            filtered[0] = { ...filtered[0], is_primary: true };
          }
          return filtered;
        });
        setDeleteTarget(null);
        setFeedback({ type: "success", message: "Image deleted." });
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to delete image." });
        setDeleteTarget(null);
      }
    });
  };

  return (
    <div className="bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F5] font-medium">
            Specimen Photography & Assets
          </h3>
          <p className="text-[11px] text-[#A3A3A3] mt-0.5 font-light">
            Upload high-resolution rough crystal imagery. Designate exactly one primary cover image.
          </p>
        </div>
        <span className="text-xs font-mono text-[#9CCB63]">
          {images.length} {images.length === 1 ? "Image" : "Images"}
        </span>
      </div>

      {feedback && (
        <div
          className={`p-3 text-xs border rounded-[4px] flex items-center justify-between ${
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

      {/* Upload Zone */}
      <div className="p-4 bg-[#0A0A0A] border border-dashed border-[#262626] rounded-[4px] hover:border-[#9CCB63]/60 transition-colors space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#141414] border border-[#262626] rounded-[4px] flex items-center justify-center text-[#9CCB63]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-[#F5F5F0] font-medium">
                Upload New Specimen Asset
              </p>
              <p className="text-[10px] text-[#737373] font-mono">
                WebP, JPEG, PNG · Maximum 10MB per file
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/webp,image/jpeg,image/png"
              className="hidden"
              id="gemstone-image-upload"
              disabled={isPending}
            />
            <label
              htmlFor="gemstone-image-upload"
              className={`w-full sm:w-auto px-4 py-2 bg-[#9CCB63] hover:bg-[#B7D98B] text-[#050505] text-xs uppercase tracking-wider font-medium text-center cursor-pointer rounded-[4px] transition-colors flex items-center justify-center gap-2 ${
                isPending ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>Select Image File</span>
            </label>
          </div>
        </div>

        {/* Optional Alt text input for next upload */}
        <div className="pt-2 border-t border-[#1F1F1F]">
          <input
            type="text"
            value={altTextInput}
            onChange={(e) => setAltTextInput(e.target.value)}
            placeholder="Alt text / descriptive caption (e.g. 'Natural rough green tourmaline prism on matrix')"
            className="w-full bg-[#111111] border border-[#262626] rounded-[4px] px-3 py-1.5 text-xs text-[#F5F5F0] placeholder-[#737373] focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]"
          />
        </div>
      </div>

      {/* Image List */}
      {images.length === 0 ? (
        <div className="py-8 text-center text-[#737373] space-y-1">
          <ImageIcon className="w-6 h-6 mx-auto opacity-40" />
          <p className="text-xs">No images currently attached to this specimen.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {images.map((img, index) => (
            <div
              key={img.id}
              className={`p-3 bg-[#0A0A0A] border rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                img.is_primary ? "border-[#9CCB63]/60 bg-[#121411]" : "border-[#1F1F1F]"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Thumbnail */}
                <div className="relative w-14 h-14 bg-[#050505] border border-[#262626] rounded-[4px] shrink-0 overflow-hidden">
                  <Image
                    src={img.image_url}
                    alt={img.alt_text || "Gemstone specimen asset"}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  {img.is_primary && (
                    <div className="absolute top-0 right-0 bg-[#9CCB63] text-[#050505] p-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" />
                    </div>
                  )}
                </div>

                {/* Info & Alt Text Editor */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#737373]">
                      #{index + 1}
                    </span>
                    {img.is_primary && (
                      <span className="text-[9px] uppercase tracking-wider font-mono text-[#9CCB63] bg-[#9CCB63]/10 px-1.5 py-0.5 border border-[#9CCB63]/30 rounded-[4px]">
                        Primary Cover
                      </span>
                    )}
                  </div>

                  {editingAltId === img.id ? (
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="text"
                        value={currentAltVal}
                        onChange={(e) => setCurrentAltVal(e.target.value)}
                        className="bg-[#141414] border border-[#262626] rounded-[4px] px-2 py-1 text-xs text-[#F5F5F0] w-full focus:outline-none focus:border-[#9CCB63]"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveAltText(img.id)}
                        disabled={isPending}
                        className="p-1 bg-[#9CCB63] text-[#050505] rounded-[4px] hover:bg-[#B7D98B]"
                        title="Save alt text"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p
                      onClick={() => {
                        setEditingAltId(img.id);
                        setCurrentAltVal(img.alt_text || "");
                      }}
                      className="text-xs text-[#9A9A94] hover:text-[#F5F5F0] cursor-pointer truncate mt-0.5 underline decoration-[#333333] hover:decoration-[#9CCB63]"
                      title="Click to edit alt text"
                    >
                      {img.alt_text || <span className="italic text-[#737373]">Add descriptive alt text...</span>}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                {!img.is_primary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    disabled={isPending}
                    className="px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#9CCB63] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/40 transition-colors"
                  >
                    Set as Primary
                  </button>
                )}

                {/* Move up */}
                <button
                  type="button"
                  onClick={() => handleMove(index, "up")}
                  disabled={index === 0 || isPending}
                  className="p-1 text-[#A3A3A3] hover:text-[#F5F5F5] border border-[#2A2A2A] disabled:opacity-30 disabled:pointer-events-none"
                  title="Move image up in display order"
                  aria-label="Move image up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Move down */}
                <button
                  type="button"
                  onClick={() => handleMove(index, "down")}
                  disabled={index === images.length - 1 || isPending}
                  className="p-1 text-[#A3A3A3] hover:text-[#F5F5F5] border border-[#2A2A2A] disabled:opacity-30 disabled:pointer-events-none"
                  title="Move image down in display order"
                  aria-label="Move image down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(img)}
                  disabled={isPending}
                  className="p-1 text-[#737373] hover:text-red-400 border border-transparent hover:border-red-900/40"
                  title="Delete image asset"
                  aria-label="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#101010] border border-[#2A2A2A] max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h4 className="text-base font-serif text-[#F5F5F5]">
              Delete Image Asset
            </h4>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Are you sure you want to delete this gemstone image? The file will be removed from storage and cannot be restored.
            </p>
            <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3 py-1.5 text-xs text-[#A3A3A3] hover:text-[#F5F5F5] border border-[#2A2A2A]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isPending}
                className="px-3 py-1.5 text-xs bg-red-950 text-red-200 border border-red-800 hover:bg-red-900 flex items-center gap-1.5"
              >
                {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
