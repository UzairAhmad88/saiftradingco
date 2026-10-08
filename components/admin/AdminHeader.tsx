"use client";

import React from "react";
import Link from "next/link";
import { Menu, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title?: string;
  userEmail?: string;
}

export function AdminHeader({
  onToggleSidebar,
  title,
  userEmail,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A9A94] hidden sm:inline-block">
            Administrative Management
          </span>
          <h1 className="text-sm sm:text-base font-serif text-[#F5F5F0] font-normal leading-tight">
            {title || "Overview"}
          </h1>
        </div>
      </div>

      {/* Right: Quick actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {userEmail && (
          <span className="hidden md:inline-block text-[11px] font-mono text-[#9A9A94] truncate max-w-[180px]">
            {userEmail}
          </span>
        )}

        <Link
          href="/collections"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#9A9A94] hover:text-[#9CCB63] border border-[#262626] rounded-[4px] hover:border-[#9CCB63]/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9CCB63]"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </Link>

        <Link href="/admin/gemstones/new">
          <Button
            size="sm"
            variant="luxury"
            className="text-[11px] py-1.5 px-3 sm:px-4"
          >
            <Plus className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
            <span className="hidden xs:inline">Add Gemstone</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
