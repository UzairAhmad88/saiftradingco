"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RotateCcw,
  ArrowUpRight,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const ROTATION_FRAMES = [
  { angle: 0, label: "0° · Front View", src: "/images/gemstones/tourmaline-360/frame-0.jpg" },
  { angle: 45, label: "45° · Oblique Right", src: "/images/gemstones/tourmaline-360/frame-1.jpg" },
  { angle: 90, label: "90° · Side Profile", src: "/images/gemstones/tourmaline-360/frame-2.jpg" },
  { angle: 135, label: "135° · Rear Oblique", src: "/images/gemstones/tourmaline-360/frame-3.jpg" },
  { angle: 180, label: "180° · Reverse View", src: "/images/gemstones/tourmaline-360/frame-4.jpg" },
  { angle: 225, label: "225° · Rear Left", src: "/images/gemstones/tourmaline-360/frame-5.jpg" },
  { angle: 270, label: "270° · Flank Profile", src: "/images/gemstones/tourmaline-360/frame-6.jpg" },
  { angle: 315, label: "315° · Front Oblique", src: "/images/gemstones/tourmaline-360/frame-7.jpg" },
];

export function Tourmaline360Viewer() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number>(0);
  const startFrameRef = useRef<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all 8 frames for instantaneous zero-latency rotation
  useEffect(() => {
    ROTATION_FRAMES.forEach((frame) => {
      const img = new window.Image();
      img.src = frame.src;
    });
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % ROTATION_FRAMES.length);
      }, 350);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying]);

  const stepNext = useCallback(() => {
    setHasInteracted(true);
    setCurrentFrame((prev) => (prev + 1) % ROTATION_FRAMES.length);
  }, []);

  const stepPrev = useCallback(() => {
    setHasInteracted(true);
    setCurrentFrame((prev) => (prev - 1 + ROTATION_FRAMES.length) % ROTATION_FRAMES.length);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlaying(false);
    setIsDragging(true);
    setHasInteracted(true);
    dragStartXRef.current = e.clientX;
    startFrameRef.current = currentFrame;
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPlaying(false);
      setIsDragging(true);
      setHasInteracted(true);
      dragStartXRef.current = e.touches[0].clientX;
      startFrameRef.current = currentFrame;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    // Each 32px of drag rotates one frame
    const frameShift = Math.floor(deltaX / 32);
    const total = ROTATION_FRAMES.length;
    const nextIndex = ((startFrameRef.current + frameShift) % total + total) % total;
    setCurrentFrame(nextIndex);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Global mouse move & up listeners when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartXRef.current;
      const frameShift = Math.floor(deltaX / 30);
      const total = ROTATION_FRAMES.length;
      const nextIndex = ((startFrameRef.current + frameShift) % total + total) % total;
      setCurrentFrame(nextIndex);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepNext();
    } else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setIsPlaying((p) => !p);
      setHasInteracted(true);
    }
  };

  const current = ROTATION_FRAMES[currentFrame];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Interactive 360-degree specimen rotation viewer"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-[#0A0A0A] border border-[#262626] rounded-[4px] overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#9CCB63] transition-all shadow-2xl group ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Editorial Corner Brackets */}
      <div
        className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#9CCB63]/60 z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#9CCB63]/60 z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#9CCB63]/60 z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#9CCB63]/60 z-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Layered 360 Specimen Frames */}
      {ROTATION_FRAMES.map((frame, index) => (
        <div
          key={frame.angle}
          className={`absolute inset-0 transition-opacity duration-150 ease-out ${
            index === currentFrame ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
          }`}
        >
          <Image
            src={frame.src}
            alt={`Tourmaline Rough Specimen - ${frame.label}`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
            className="object-cover object-center pointer-events-none"
          />
        </div>
      ))}

      {/* Subtle Depth Shadow Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85 z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* TOP HEADER CONTROLS */}
      <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex items-center justify-between z-30 pointer-events-auto">
        {/* Angle Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#050505]/85 border border-[#262626] rounded-[4px] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9CCB63] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F5F5F0]">
            {current.label}
          </span>
        </div>

        {/* 360 Action & Auto-Play Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHasInteracted(true);
              setIsPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#050505]/85 hover:bg-[#171717] border border-[#262626] hover:border-[#9CCB63]/60 rounded-[4px] text-[10px] uppercase font-mono tracking-wider text-[#9CCB63] transition-colors"
            title={isPlaying ? "Pause auto-rotation" : "Start 360° auto-rotation"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#9CCB63]" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3 h-3 text-[#9CCB63]" />
                <span>360° Spin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step Left / Right Arrows (Visible on hover or keyboard) */}
      <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between z-25 pointer-events-none">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            stepPrev();
          }}
          aria-label="Rotate specimen left"
          className="p-1.5 bg-[#050505]/70 hover:bg-[#171717] border border-[#262626] hover:border-[#9CCB63]/60 rounded-[4px] text-[#F5F5F0] transition-opacity opacity-0 group-hover:opacity-100 pointer-events-auto shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            stepNext();
          }}
          aria-label="Rotate specimen right"
          className="p-1.5 bg-[#050505]/70 hover:bg-[#171717] border border-[#262626] hover:border-[#9CCB63]/60 rounded-[4px] text-[#F5F5F0] transition-opacity opacity-0 group-hover:opacity-100 pointer-events-auto shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Initial Drag Hint Overlay (fades once user interacts) */}
      {!hasInteracted && !isPlaying && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-30 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#050505]/90 border border-[#9CCB63]/50 rounded-[4px] shadow-xl animate-pulse">
            <RotateCcw className="w-3.5 h-3.5 text-[#9CCB63]" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5F5F0]">
              Drag to Rotate 360°
            </span>
          </div>
        </div>
      )}

      {/* Angle Scrub Bar (8 discreet angle dots) */}
      <div className="absolute bottom-20 sm:bottom-22 inset-x-0 flex justify-center items-center gap-1.5 z-30 pointer-events-auto">
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#050505]/80 border border-[#262626] rounded-full backdrop-blur-xs">
          {ROTATION_FRAMES.map((f, idx) => (
            <button
              key={f.angle}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHasInteracted(true);
                setIsPlaying(false);
                setCurrentFrame(idx);
              }}
              title={`Jump to ${f.label}`}
              className={`transition-all rounded-full ${
                idx === currentFrame
                  ? "w-4 h-1.5 bg-[#9CCB63]"
                  : "w-1.5 h-1.5 bg-[#262626] hover:bg-[#9CCB63]/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Editorial Caption & Link */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-30 space-y-1 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#9CCB63]">
          <span className="inline-flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-[#9CCB63]" />
            Interactive 360° Specimen
          </span>
          <span className="text-[#9A9A94] font-mono">HK-ELB-01</span>
        </div>

        <Link
          href="/gemstones/rough-green-tourmaline-crystal"
          className="group/link block"
          title="Inspect full laboratory metrics and provenance"
        >
          <div className="flex items-center justify-between">
            <p className="font-serif text-lg sm:text-xl text-[#F5F5F0] font-normal group-hover/link:text-[#9CCB63] transition-colors">
              Natural Green Elbaite Tourmaline
            </p>
            <span className="text-[#9CCB63] inline-flex items-center gap-0.5 text-xs font-mono group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
              View <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-center justify-between pt-0.5 text-[11px] text-[#9A9A94] font-light">
            <span>Fine Striations &amp; Pristine Terminations</span>
            <span className="text-[10px] font-mono text-[#9A9A94]">Drag or click dots</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
