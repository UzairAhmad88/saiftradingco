"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  Layers,
  Settings,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { signOutAction } from "@/lib/auth/actions";
import { cn } from "@/lib/utils/cn";

export interface AdminSidebarProps {
  userEmail?: string;
  role?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Gemstones",
    href: "/admin/gemstones",
    icon: Gem,
    exact: false,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Layers,
    exact: false,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    exact: true,
  },
];

export function AdminSidebar({
  userEmail,
  role = "admin",
  isOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-[#262626] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand & Close button */}
        <div>
          <div className="h-16 px-6 border-b border-[#262626] flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              onClick={onClose}
              className="flex flex-col group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
            >
              <span className="font-serif text-base tracking-[0.18em] uppercase text-[#F5F5F0] group-hover:text-[#9CCB63] transition-colors">
                Saif Trading Co
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#9CCB63] font-medium flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-[#9CCB63]" aria-hidden="true" />
                Admin Console
              </span>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors rounded-[4px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]",
                    isActive
                      ? "bg-[#171717] text-[#9CCB63] border-l-2 border-[#9CCB63] font-semibold"
                      : "text-[#9A9A94] hover:text-[#F5F5F0] hover:bg-[#141414]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-[#9CCB63]" : "text-[#737373]"
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom utility & Session Section */}
        <div className="p-4 border-t border-[#262626] space-y-4">
          {/* Public catalogue link */}
          <Link
            href="/collections"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-[11px] text-[#9A9A94] hover:text-[#9CCB63] hover:bg-[#141414] rounded-[4px] transition-colors border border-[#262626]"
          >
            <span className="uppercase tracking-wider">View Public Catalogue</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          {/* User badge & logout */}
          <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="text-[11px] text-[#F5F5F0] font-mono truncate" title={userEmail}>
                {userEmail || "admin@saiftrading.co"}
              </p>
              <span className="inline-block text-[9px] uppercase tracking-widest text-[#9CCB63] font-mono">
                {role}
              </span>
            </div>

            <form action={signOutAction}>
              <button
                type="submit"
                title="Sign out of Admin Console"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#9A9A94] hover:text-[#F5F5F0] hover:bg-[#171717] border border-[#262626] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
