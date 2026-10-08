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
      className={cn("hidden md:flex items-center space-x-7 lg:space-x-9 text-xs uppercase tracking-[0.2em]", className)}
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
              "hover:text-[#F5F5F0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]",
              active ? "text-[#F5F5F0] font-medium" : "text-[#9A9A94]"
            )}
          >
            <span>{item.label}</span>
            {/* Subtle light green active accent indicator */}
            {active && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9CCB63]"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}

      {/* Primary Global CTA: INQUIRE */}
      <Link
        href="/contact"
        className={cn(
          "px-5 py-2.5 border transition-all duration-200 select-none font-medium rounded-[3px]",
          "border-[#9CCB63]/70 text-[#9CCB63]",
          "hover:border-[#9CCB63] hover:bg-[#9CCB63] hover:text-[#050505] active:bg-[#B7D98B]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CCB63]"
        )}
      >
        Inquire
      </Link>
    </nav>
  );
}
