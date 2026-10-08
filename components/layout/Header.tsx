"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { cn } from "@/lib/utils/cn";

export interface HeaderProps {
  transparentAtTop?: boolean;
}

export function Header({ transparentAtTop = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleCloseMobileNav = () => {
    setIsMobileNavOpen(false);
    menuButtonRef.current?.focus();
  };

  const headerBgClass = transparentAtTop
    ? isScrolled
      ? "bg-[#050505]/92 backdrop-blur-md border-[#2A2A2A]"
      : "bg-transparent border-transparent"
    : isScrolled
    ? "bg-[#050505]/95 backdrop-blur-md border-[#2A2A2A]"
    : "bg-[#050505] border-[#2A2A2A]";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          headerBgClass
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo / Wordmark Treatment */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
            aria-label="Saif Trading Co Home"
          >
            <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.2em] uppercase text-[#F5F5F5] group-hover:text-[#B69B5E] transition-colors duration-200">
              Saif Trading Co
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#737373] font-light">
              Rough Gemstones · Hong Kong
            </span>
          </Link>

          {/* Center & Right: Desktop Navigation with Active Indicator */}
          <DesktopNavigation />

          {/* Mobile Right Controls: Inquire + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/contact"
              className="text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 border border-[#B69B5E]/50 text-[#B69B5E] font-medium"
            >
              Inquire
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-navigation-dialog"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#2A2A2A] bg-[#101010] text-[#A3A3A3] hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69B5E]"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Full-screen Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={handleCloseMobileNav}
      />
    </>
  );
}
