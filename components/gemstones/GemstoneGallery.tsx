"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GemstoneImage } from "@/types/gemstone";
import { cn } from "@/lib/utils/cn";

export interface GemstoneGalleryProps {
  images: GemstoneImage[];
  gemstoneName: string;
  isSold?: boolean;
}

export function GemstoneGallery({
  images,
  gemstoneName,
  isSold = false,
}: GemstoneGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);

  const displayImages =
    images && images.length > 0
      ? images
      : [
          {
            id: "fallback",
            gemstone_id: "fallback",
            image_url: "/images/placeholder-gemstone.svg",
            alt_text: gemstoneName,
            sort_order: 0,
            created_at: new Date().toISOString(),
          },
        ];

  const currentImage = displayImages[selectedIndex] || displayImages[0];
  const hasMultipleImages = displayImages.length > 1;

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  }, [displayImages.length]);

  const closeLightboxButtonRef = useRef<HTMLButtonElement | null>(null);

  // Keyboard navigation for Lightbox and Gallery
  useEffect(() => {
    if (!isLightboxOpen) return;

    // Focus close button when lightbox opens
    closeLightboxButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "ArrowRight") {
        handleNext();
        return;
      }

      if (e.key === "ArrowLeft") {
        handlePrev();
        return;
      }

      if (e.key === "Tab" && lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, handleNext, handlePrev]);

  return (
    <div className="w-full space-y-4">
      {/* Primary Display Frame */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] w-full bg-[#080808] border border-[#262626] rounded-[4px] overflow-hidden group shadow-2xl">
        {/* Corner Accents */}
        <div
          className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#9CCB63]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#9CCB63]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#9CCB63]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#9CCB63]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Primary Specimen Image (contain mode ensures complete crystal termination visibility) */}
        <div className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center">
          <Image
            src={currentImage.image_url}
            alt={currentImage.alt_text || `${gemstoneName} specimen`}
            fill
            priority={selectedIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className={cn(
              "object-contain transition-transform duration-500 ease-out",
              isSold && "opacity-85 grayscale-[15%]"
            )}
          />
        </div>

        {/* Top-Right Expand to Lightbox Trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#050505]/80 hover:bg-[#111111] border border-[#262626] hover:border-[#9CCB63] text-[#9A9A94] hover:text-[#F5F5F0] transition-colors rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CCB63]"
          aria-label={`Open full-resolution view of ${gemstoneName}`}
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Bottom Image Position Badge */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 bg-[#050505]/85 border border-[#262626] rounded-[2px] text-[10px] uppercase tracking-widest text-[#9CCB63] font-mono">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Accessible Screen-Reader Announcement */}
      <div className="sr-only" aria-live="polite">
        Image {selectedIndex + 1} of {displayImages.length}: {currentImage.alt_text}
      </div>

      {/* Thumbnails Navigation Rail */}
      {hasMultipleImages && (
        <div
          className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin"
          role="region"
          aria-label="Gemstone gallery thumbnails"
        >
          {displayImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative w-20 sm:w-24 aspect-[4/3] shrink-0 bg-[#0A0A0A] border rounded-[4px] transition-all overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CCB63]",
                  isSelected
                    ? "border-[#9CCB63] ring-1 ring-[#9CCB63] opacity-100"
                    : "border-[#262626] opacity-60 hover:opacity-100 hover:border-[#3A3A3A]"
                )}
                aria-label={`View image ${idx + 1} of ${displayImages.length}`}
                aria-current={isSelected ? "true" : undefined}
              >
                <Image
                  src={img.image_url}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightweight Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`High-resolution view: ${gemstoneName}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30">
            <div className="text-xs uppercase tracking-[0.2em] text-[#9CCB63] font-mono">
              <span>{gemstoneName}</span>
              <span className="mx-2 text-[#404040]">·</span>
              <span>
                {selectedIndex + 1} / {displayImages.length}
              </span>
            </div>

            <button
              ref={closeLightboxButtonRef}
              type="button"
              onClick={() => {
                setIsLightboxOpen(false);
                triggerRef.current?.focus();
              }}
              className="p-2.5 bg-[#111111] border border-[#262626] hover:border-[#9CCB63] text-[#9A9A94] hover:text-[#F5F5F0] transition-colors rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CCB63]"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#111111]/90 border border-[#262626] hover:border-[#9CCB63] text-[#9A9A94] hover:text-[#F5F5F0] transition-colors rounded-[4px]"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Central High-Resolution Specimen Image */}
          <div className="relative w-full max-w-5xl h-[75vh] sm:h-[82vh] flex items-center justify-center">
            <Image
              src={currentImage.image_url}
              alt={currentImage.alt_text || `${gemstoneName} high-resolution image`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {/* Next Button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#111111]/90 border border-[#262626] hover:border-[#9CCB63] text-[#9A9A94] hover:text-[#F5F5F0] transition-colors rounded-[4px]"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Caption */}
          <div className="absolute bottom-4 inset-x-4 text-center">
            <p className="text-xs text-[#9A9A94] font-light max-w-xl mx-auto truncate">
              {currentImage.alt_text || gemstoneName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
