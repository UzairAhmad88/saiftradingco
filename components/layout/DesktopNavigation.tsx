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
              "hover:text-[#B6D94C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]",
              active ? "text-[#F5F3EE] font-medium" : "text-[#A5A5A0]"
            )}
          >
            <span>{item.label}</span>
            {/* Subtle botanical green active underline */}
            {active && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B6D94C]"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}

      {/* Primary Global CTA: INQUIRE (Botanical green background + Dark text) */}
      <Link
        href="/contact"
        className={cn(
          "px-5 py-2.5 transition-all duration-200 select-none font-semibold rounded-[4px]",
          "bg-[#B6D94C] text-[#050505] border border-[#B6D94C]",
          "hover:bg-[#A3C73A] hover:border-[#A3C73A] active:bg-[#91B32A] hover:-translate-y-0.5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B6D94C]"
        )}
      >
        Inquire
      </Link>
    </nav>
  );
}
