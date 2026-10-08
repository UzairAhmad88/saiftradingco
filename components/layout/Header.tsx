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

export function Header({ transparentAtTop: _transparentAtTop = false }: HeaderProps) {
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

  const headerBgClass = isScrolled
    ? "bg-[#050505]/95 backdrop-blur-md border-[#242424] shadow-xs"
    : "bg-[#050505] border-[#1A1A1A]";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-colors duration-200",
          headerBgClass
        )}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo / Wordmark in Off-White & Botanical Green */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
            aria-label="Saif Trading Co Home"
          >
            <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.2em] uppercase text-[#F5F3EE] group-hover:text-[#B6D94C] transition-colors duration-200 font-semibold">
              Saif Trading Co
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#A5A5A0] group-hover:text-[#B6D94C] transition-colors font-medium">
              Rough Gemstones · Hong Kong
            </span>
          </Link>

          {/* Center & Right: Desktop Navigation with Active Indicator */}
          <DesktopNavigation />

          {/* Mobile Right Controls: Inquire + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/contact"
              className="text-[10px] uppercase tracking-[0.18em] px-3.5 py-1.5 bg-[#B6D94C] text-[#050505] hover:bg-[#A3C73A] font-semibold transition-colors rounded-[4px]"
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
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#242424] bg-[#0C0C0C] text-[#F5F3EE] hover:border-[#B6D94C] hover:text-[#B6D94C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6D94C] rounded-[4px] transition-colors"
            >
              <Menu className="w-5 h-5 text-[#F5F3EE]" aria-hidden="true" />
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
