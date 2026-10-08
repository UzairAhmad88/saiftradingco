"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, RotateCcw, Pause } from "lucide-react";
import type { GemstoneImage } from "@/types/gemstone";
import { cn } from "@/lib/utils/cn";

const TOURMALINE_360_FRAMES = [
  { angle: 0, label: "0° · Front View", src: "/images/gemstones/tourmaline-360/frame-0.jpg" },
  { angle: 45, label: "45° · Oblique Right", src: "/images/gemstones/tourmaline-360/frame-1.jpg" },
  { angle: 90, label: "90° · Side Profile", src: "/images/gemstones/tourmaline-360/frame-2.jpg" },
  { angle: 135, label: "135° · Rear Oblique", src: "/images/gemstones/tourmaline-360/frame-3.jpg" },
  { angle: 180, label: "180° · Reverse View", src: "/images/gemstones/tourmaline-360/frame-4.jpg" },
  { angle: 225, label: "225° · Rear Left", src: "/images/gemstones/tourmaline-360/frame-5.jpg" },
  { angle: 270, label: "270° · Flank Profile", src: "/images/gemstones/tourmaline-360/frame-6.jpg" },
  { angle: 315, label: "315° · Front Oblique", src: "/images/gemstones/tourmaline-360/frame-7.jpg" },
];

export interface GemstoneGalleryProps {
  images: GemstoneImage[];
  gemstoneName: string;
  isSold?: boolean;
  has360View?: boolean;
}

export function GemstoneGallery({
  images,
  gemstoneName,
  isSold = false,
  has360View = false,
}: GemstoneGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [is360Active, setIs360Active] = useState(false);
  const [frame360, setFrame360] = useState(0);
  const [isDragging360, setIsDragging360] = useState(false);
  const [isSpinning360, setIsSpinning360] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number>(0);
  const startFrame = useRef<number>(0);
  const spinInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-spin 360 timer
  useEffect(() => {
    if (isSpinning360) {
      spinInterval.current = setInterval(() => {
        setFrame360((prev) => (prev + 1) % TOURMALINE_360_FRAMES.length);
      }, 350);
    } else if (spinInterval.current) {
      clearInterval(spinInterval.current);
    }

    return () => {
      if (spinInterval.current) {
        clearInterval(spinInterval.current);
      }
    };
  }, [isSpinning360]);

  // Preload 360 frames when 360 view is available
  useEffect(() => {
    if (has360View) {
      TOURMALINE_360_FRAMES.forEach((f) => {
        const img = new window.Image();
        img.src = f.src;
      });
    }
  }, [has360View]);

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

  // Mouse & Touch Drag listeners for 360 rotation in gallery
  useEffect(() => {
    if (!isDragging360) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartX.current;
      const shift = Math.floor(deltaX / 30);
      const total = TOURMALINE_360_FRAMES.length;
      setFrame360(((startFrame.current + shift) % total + total) % total);
    };

    const handleMouseUp = () => {
      setIsDragging360(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging360]);

  return (
    <div className="w-full space-y-4">
      {/* Optional Mode Switcher when 360 frames exist */}
      {has360View && (
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIs360Active(false);
                setIsSpinning360(false);
              }}
              className={cn(
                "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] border transition-colors",
                !is360Active
                  ? "bg-[#111111] border-[#B6D94C] text-[#F5F3EE]"
                  : "bg-transparent border-[#242424] text-[#777772] hover:text-[#F5F3EE]"
              )}
            >
              Gallery Photos ({displayImages.length})
            </button>
            <button
              type="button"
              onClick={() => setIs360Active(true)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[2px] border transition-colors",
                is360Active
                  ? "bg-[#111111] border-[#B6D94C] text-[#B6D94C]"
                  : "bg-transparent border-[#242424] text-[#777772] hover:text-[#B6D94C]"
              )}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>360° Interactive Rotation</span>
            </button>
          </div>
          {is360Active && (
            <span className="text-[11px] font-mono text-[#B6D94C]">
              {TOURMALINE_360_FRAMES[frame360].label}
            </span>
          )}
        </div>
      )}

      {/* Primary Display Frame */}
      <div
        onMouseDown={
          is360Active
            ? (e) => {
                e.preventDefault();
                setIsSpinning360(false);
                setIsDragging360(true);
                dragStartX.current = e.clientX;
                startFrame.current = frame360;
              }
            : undefined
        }
        onTouchStart={
          is360Active
            ? (e) => {
                if (e.touches.length === 1) {
                  setIsSpinning360(false);
                  setIsDragging360(true);
                  dragStartX.current = e.touches[0].clientX;
                  startFrame.current = frame360;
                }
              }
            : undefined
        }
        onTouchMove={
          is360Active
            ? (e) => {
                if (!isDragging360 || e.touches.length !== 1) return;
                const deltaX = e.touches[0].clientX - dragStartX.current;
                const shift = Math.floor(deltaX / 30);
                const total = TOURMALINE_360_FRAMES.length;
                setFrame360(((startFrame.current + shift) % total + total) % total);
              }
            : undefined
        }
        onTouchEnd={is360Active ? () => setIsDragging360(false) : undefined}
        className={cn(
          "relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] w-full bg-[#080808] border border-[#262626] rounded-[4px] overflow-hidden group shadow-2xl select-none",
          is360Active && (isDragging360 ? "cursor-grabbing" : "cursor-grab")
        )}
      >
        {/* Corner Accents */}
        <div
          className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#B6D94C]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#B6D94C]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#B6D94C]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#B6D94C]/40 z-10 pointer-events-none"
          aria-hidden="true"
        />

        {is360Active ? (
          <>
            {/* 360 Degree Layered Frames */}
            {TOURMALINE_360_FRAMES.map((f, idx) => (
              <div
                key={f.angle}
                className={cn(
                  "absolute inset-0 p-4 sm:p-6 flex items-center justify-center transition-opacity duration-150 ease-out",
                  idx === frame360 ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                )}
              >
                <Image
                  src={f.src}
                  alt={`${gemstoneName} 360 degree rotation - ${f.label}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  className="object-contain pointer-events-none"
                />
              </div>
            ))}

            {/* 360 Controls Overlay */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSpinning360((p) => !p)}
                className="px-2.5 py-1 bg-[#050505]/85 hover:bg-[#111111] border border-[#242424] hover:border-[#B6D94C] rounded-[2px] text-[10px] font-mono uppercase tracking-wider text-[#B6D94C] inline-flex items-center gap-1 transition-colors"
                title={isSpinning360 ? "Pause spin" : "Auto 360° spin"}
              >
                {isSpinning360 ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3 h-3" />
                    <span>Auto Spin</span>
                  </>
                )}
              </button>
            </div>

            {/* Stepper Chevron Controls */}
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-20 pointer-events-none">
              <button
                type="button"
                onClick={() =>
                  setFrame360(
                    (prev) =>
                      (prev - 1 + TOURMALINE_360_FRAMES.length) % TOURMALINE_360_FRAMES.length
                  )
                }
                className="p-1.5 bg-[#050505]/80 hover:bg-[#111111] border border-[#242424] hover:border-[#B6D94C] text-[#F5F3EE] rounded-[2px] pointer-events-auto transition-colors"
                aria-label="Rotate left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setFrame360((prev) => (prev + 1) % TOURMALINE_360_FRAMES.length)
                }
                className="p-1.5 bg-[#050505]/80 hover:bg-[#111111] border border-[#242424] hover:border-[#B6D94C] text-[#F5F3EE] rounded-[2px] pointer-events-auto transition-colors"
                aria-label="Rotate right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Angle Scrub Dots */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-20 pointer-events-auto">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#050505]/85 border border-[#242424] rounded-full backdrop-blur-xs">
                {TOURMALINE_360_FRAMES.map((f, idx) => (
                  <button
                    key={f.angle}
                    type="button"
                    onClick={() => {
                      setIsSpinning360(false);
                      setFrame360(idx);
                    }}
                    title={`Jump to ${f.label}`}
                    className={cn(
                      "transition-all rounded-full",
                      idx === frame360
                        ? "w-4 h-1.5 bg-[#B6D94C]"
                        : "w-1.5 h-1.5 bg-[#242424] hover:bg-[#B6D94C]/60"
                    )}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
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
              className="absolute top-4 right-4 z-20 p-2.5 bg-[#050505]/80 hover:bg-[#111111] border border-[#242424] hover:border-[#B6D94C] text-[#777772] hover:text-[#F5F3EE] transition-colors rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6D94C]"
              aria-label={`Open full-resolution view of ${gemstoneName}`}
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Image Position Badge */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 bg-[#050505]/85 border border-[#242424] rounded-[2px] text-[10px] uppercase tracking-widest text-[#B6D94C] font-mono">
                {selectedIndex + 1} / {displayImages.length}
              </div>
            )}
          </>
        )}
      </div>

      {/* Accessible Screen-Reader Announcement */}
      <div className="sr-only" aria-live="polite">
        {is360Active
          ? `360-degree rotation view at ${TOURMALINE_360_FRAMES[frame360].label}`
          : `Image ${selectedIndex + 1} of ${displayImages.length}: ${currentImage.alt_text}`}
      </div>

      {/* Thumbnails Navigation Rail (when in standard gallery view) */}
      {!is360Active && hasMultipleImages && (
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
                  "relative w-20 sm:w-24 aspect-[4/3] shrink-0 bg-[#0A0A0A] border rounded-[2px] transition-all overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6D94C]",
                  isSelected
                    ? "border-[#B6D94C] ring-1 ring-[#B6D94C] opacity-100"
                    : "border-[#242424] opacity-60 hover:opacity-100 hover:border-[#3A3A3A]"
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
            <div className="text-xs uppercase tracking-[0.2em] text-[#B6D94C] font-mono">
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
              className="p-2.5 bg-[#111111] border border-[#242424] hover:border-[#B6D94C] text-[#777772] hover:text-[#F5F3EE] transition-colors rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6D94C]"
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
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#111111]/90 border border-[#242424] hover:border-[#B6D94C] text-[#777772] hover:text-[#F5F3EE] transition-colors rounded-[2px]"
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
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-[#111111]/90 border border-[#242424] hover:border-[#B6D94C] text-[#777772] hover:text-[#F5F3EE] transition-colors rounded-[2px]"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Bottom Caption */}
          <div className="absolute bottom-4 inset-x-4 text-center">
            <p className="text-xs text-[#777772] font-light max-w-xl mx-auto truncate">
              {currentImage.alt_text || gemstoneName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
