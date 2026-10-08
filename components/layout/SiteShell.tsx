"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import { cn } from "@/lib/utils/cn";

export interface SiteShellProps {
  children: React.ReactNode;
  transparentHeader?: boolean;
  className?: string;
}

export function SiteShell({
  children,
  transparentHeader = false,
  className,
}: SiteShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#F5F5F5] antialiased">
      <SkipLink targetId="main-content" />
      <Header transparentAtTop={transparentHeader} />
      <div className={cn("flex-1 flex flex-col", className)}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
