"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export interface NavItem {
  label: string;
  href: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Collections", href: "/collections" },
  { label: "Education", href: "/education" },
  { label: "About", href: "/about" },
  { label: "Certification", href: "/certification" },
  { label: "Contact", href: "/contact" },
];

export interface DesktopNavigationProps {
  className?: string;
}

export function DesktopNavigation({ className }: DesktopNavigationProps) {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={cn("hidden md:flex items-center space-x-4 lg:space-x-7 xl:space-x-9 text-[11px] lg:text-xs uppercase tracking-[0.16em] lg:tracking-[0.2em]", className)}
    >
      {PRIMARY_NAV_ITEMS.map((item) => {
        const active = isItemActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative py-2 transition-colors duration-200 select-none",
              "hover:text-[#294D2C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]",
              active ? "text-[#050505] font-semibold" : "text-[#050505]/80"
            )}
          >
            <span>{item.label}</span>
            {/* Subtle black active underline */}
            {active && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#050505]"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}

      {/* Primary Global CTA: INQUIRE (Black background + Light Green text) */}
      <Link
        href="/contact"
        className={cn(
          "px-5 py-2.5 transition-all duration-200 select-none font-semibold rounded-[4px]",
          "bg-[#050505] text-[#B7D98B] border border-[#050505]",
          "hover:bg-[#294D2C] hover:text-[#F7F7F1] active:bg-[#101010]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#050505]"
        )}
      >
        Inquire
      </Link>
    </nav>
  );
}
