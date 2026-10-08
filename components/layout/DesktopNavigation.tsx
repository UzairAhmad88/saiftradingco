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
              "hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]",
              active ? "text-[#F5F5F5] font-medium" : "text-[#A3A3A3]"
            )}
          >
            <span>{item.label}</span>
            {/* Subtle active accent indicator (accessible dual signal) */}
            {active && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B69B5E]"
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
          "px-5 py-2.5 border transition-all duration-200 select-none font-medium",
          "border-[#B69B5E]/60 text-[#B69B5E]",
          "hover:border-[#B69B5E] hover:bg-[#B69B5E]/10 active:bg-[#B69B5E]/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69B5E]"
        )}
      >
        Inquire
      </Link>
    </nav>
  );
}
