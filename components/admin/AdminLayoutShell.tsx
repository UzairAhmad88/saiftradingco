"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SkipLink } from "@/components/ui/SkipLink";

export interface AdminLayoutShellProps {
  children: React.ReactNode;
  userEmail?: string;
  role?: string;
}

export function AdminLayoutShell({
  children,
  userEmail,
  role = "admin",
}: AdminLayoutShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex">
      <SkipLink targetId="admin-main" />

      {/* Sidebar for Desktop / Drawer for Mobile */}
      <AdminSidebar
        userEmail={userEmail}
        role={role}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          userEmail={userEmail}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main
          id="admin-main"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl 2xl:max-w-[1536px] mx-auto focus:outline-none"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
