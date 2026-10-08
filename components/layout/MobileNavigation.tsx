"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Manage body scroll lock and autofocus on mount
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && navContainerRef.current) {
        const focusableElements = navContainerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navItems = [
    { number: "01", label: "Collections", href: "/collections" },
    { number: "02", label: "Education", href: "/education" },
    { number: "03", label: "About", href: "/about" },
    { number: "04", label: "Certification", href: "/certification" },
    { number: "05", label: "Contact", href: "/contact" },
  ];

  const subCollections = [
    { label: "Tourmaline Specimens", href: "/collections/tourmaline" },
    { label: "Kunzite Specimens", href: "/collections/kunzite" },
    { label: "Morganite Specimens", href: "/collections/morganite" },
  ];

  return (
    <div
      id="mobile-navigation-dialog"
      ref={navContainerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 flex flex-col bg-[#050505] text-[#F5F5F0] md:hidden animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-[#262626] bg-[#050505]">
        <Link
          href="/"
          onClick={onClose}
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
          aria-label="Saif Trading Co Home"
        >
          <span className="font-serif text-lg tracking-[0.2em] uppercase text-[#F5F5F0]">
            Saif Trading Co
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#9A9A94] font-light">
            Hong Kong
          </span>
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="min-h-[44px] min-w-[44px] p-2.5 flex items-center justify-center text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] bg-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CCB63] rounded-[4px]"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable Navigation Body */}
      <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
        <ul className="space-y-5">
          {navItems.map((item) => {
            const active = isItemActive(item.href);

            return (
              <li key={item.href} className="border-b border-[#1A1A1A] pb-3">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline justify-between py-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#9CCB63] tracking-wider">
                      {item.number}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-2xl tracking-wide transition-colors",
                        active ? "text-[#9CCB63] font-medium" : "text-[#F5F5F0] group-hover:text-[#9CCB63]"
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                  {active && (
                    <span className="text-[10px] uppercase tracking-widest text-[#9CCB63] font-sans">
                      Active
                    </span>
                  )}
                </Link>

                {/* Sub-links for Collections */}
                {item.href === "/collections" && (
                  <div className="pl-9 pt-2 pb-1 space-y-2">
                    {subCollections.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          aria-current={subActive ? "page" : undefined}
                          className={cn(
                            "block text-xs uppercase tracking-[0.18em] py-1.5 transition-colors",
                            subActive ? "text-[#9CCB63] font-medium" : "text-[#9A9A94] hover:text-[#F5F5F0]"
                          )}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Primary Mobile CTA Button */}
        <div className="pt-2">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full min-h-[48px] py-3.5 text-xs uppercase tracking-[0.22em] font-medium bg-[#9CCB63] text-[#050505] hover:bg-[#B7D98B] active:bg-[#CFE7AA] transition-colors rounded-[4px]"
          >
            <span>Make an Inquiry</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Verified Business Details */}
        <div className="pt-8 border-t border-[#262626] space-y-4 text-xs text-[#9A9A94]">
          <span className="type-eyebrow text-[#9CCB63] block">
            Hong Kong Office
          </span>
          <div className="space-y-2.5 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#9A9A94] shrink-0 mt-0.5" />
              <span>
                417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street, Hung Hom, Kowloon, Hong Kong
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#9A9A94] shrink-0" />
              <a href="tel:+85235251640" className="hover:text-[#9CCB63] transition-colors">
                +852 3525 1640
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#9A9A94] shrink-0" />
              <a href="mailto:Saiftradingco@yahoo.com" className="hover:text-[#9CCB63] transition-colors">
                Saiftradingco@yahoo.com
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
