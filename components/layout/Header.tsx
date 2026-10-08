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
      ? "bg-[#0A0A0A] border-[#262626]"
      : "bg-transparent border-transparent"
    : isScrolled
    ? "bg-[#0A0A0A] border-[#262626]"
    : "bg-[#050505] border-[#262626]";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-colors duration-200",
          headerBgClass
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo / Wordmark Treatment */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
            aria-label="Saif Trading Co Home"
          >
            <span className="font-serif text-lg sm:text-xl lg:text-2xl tracking-[0.2em] uppercase text-[#F5F5F0] group-hover:text-[#9CCB63] transition-colors duration-200">
              Saif Trading Co
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#9A9A94] font-light">
              Rough Gemstones · Hong Kong
            </span>
          </Link>

          {/* Center & Right: Desktop Navigation with Active Indicator */}
          <DesktopNavigation />

          {/* Mobile Right Controls: Inquire + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/contact"
              className="text-[10px] uppercase tracking-[0.18em] px-3.5 py-1.5 border border-[#9CCB63]/70 text-[#9CCB63] hover:bg-[#9CCB63] hover:text-[#050505] font-medium transition-colors rounded-[3px]"
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
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#262626] bg-[#111111] text-[#9A9A94] hover:text-[#F5F5F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CCB63] rounded-[4px]"
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
