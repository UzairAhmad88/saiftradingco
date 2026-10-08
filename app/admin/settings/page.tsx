import React from "react";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Server,
  KeyRound,
  LogOut,
  Lock,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth/server";
import { signOutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Administrative Settings | Saif Trading Co",
  description: "Session configuration and administrative security overview.",
  canonical: "/admin/settings",
  noIndex: true,
});

export default async function AdminSettingsPage() {
  const adminContext = await requireAdmin();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="pb-5 border-b border-[#2A2A2A]">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69B5E] font-medium">
          System Administration
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal tracking-tight mt-1">
          Settings & Session Profile
        </h1>
        <p className="text-xs text-[#A3A3A3] mt-1 font-light">
          Review authenticated credentials, system configuration, and business reference data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Administrator Profile Card */}
        <div className="bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1C1C1C]">
            <KeyRound className="w-4 h-4 text-[#B69B5E]" aria-hidden="true" />
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F5] font-medium">
              Administrator Profile
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#0A0A0A] border border-[#1E1E1E] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#737373] font-mono block">
                  Authenticated Email
                </span>
                <span className="text-xs text-[#F5F5F5] font-mono">
                  {adminContext.email}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-mono text-[#B6D94C] bg-[#B6D94C]/10 border border-[#B6D94C]/30 px-2 py-0.5">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1E1E1E] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#737373] font-mono block">
                  Database Role
                </span>
                <span className="text-xs text-[#F5F5F5] font-mono uppercase">
                  {adminContext.role}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#B69B5E]">
                Full Catalogue Authorization
              </span>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1E1E1E]">
              <span className="text-[10px] uppercase tracking-wider text-[#737373] font-mono block">
                User Identifier (UUID)
              </span>
              <span className="text-[11px] text-[#A3A3A3] font-mono break-all">
                {adminContext.id}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1C1C1C]">
            <form action={signOutAction}>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-full text-xs border-[#2A2A2A] text-[#A3A3A3] hover:text-[#F5F5F5]"
              >
                <LogOut className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
                <span>End Session & Sign Out</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Security & System Architecture */}
        <div className="bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1C1C1C]">
            <Server className="w-4 h-4 text-[#B69B5E]" aria-hidden="true" />
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F5] font-medium">
              System & Security Architecture
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#0A0A0A] border border-[#1E1E1E] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#F5F5F5] text-[11px]">Next.js App Router</span>
                <span className="text-[#B6D94C] font-mono text-[10px]">v16.4 (SSR)</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Server-side authorization enforced via <code>requireAdmin()</code> guards.
              </p>
            </div>

            <div className="p-3 bg-[#0A0A0A] border border-[#1E1E1E] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#F5F5F5] text-[11px]">PostgreSQL RLS Security</span>
                <span className="text-[#B6D94C] font-mono text-[10px]">Active & Enforced</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Row-Level Security active on gemstones, categories, images, and inquiries.
              </p>
            </div>

            <div className="p-3 bg-[#0A0A0A] border border-[#1E1E1E] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#F5F5F5] text-[11px]">Storage Policies</span>
                <span className="text-[#B6D94C] font-mono text-[10px]">Protected Bucket</span>
              </div>
              <p className="text-[11px] text-[#737373]">
                Admin-only write and delete access on <code>gemstones</code> storage bucket.
              </p>
            </div>

            <div className="p-3 bg-[#0A0A0A] border border-[#1E1E1E] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#737373]">
                <Lock className="w-3.5 h-3.5" />
                <span>Service Role Keys</span>
              </div>
              <span className="text-[10px] font-mono text-[#B69B5E]">
                Restricted to Server Execution
              </span>
            </div>
          </div>
        </div>

        {/* Business Reference Information (Read-Only) */}
        <div className="lg:col-span-2 bg-[#101010] border border-[#2A2A2A] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1C1C1C]">
            <Building2 className="w-4 h-4 text-[#B69B5E]" aria-hidden="true" />
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F5] font-medium">
              Verified Business Reference Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-[#0A0A0A] border border-[#1E1E1E] space-y-1">
              <div className="flex items-center gap-1.5 text-[#B69B5E] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase">Registered Office</span>
              </div>
              <p className="text-[#F5F5F5] font-medium">Saif Trading Co</p>
              <p className="text-[#A3A3A3] text-[11px] leading-relaxed">
                417 Flat 4 Floor, Block B,<br />
                Focal Industrial Centre,<br />
                21 Man Lok Street, Hung Hom,<br />
                Kowloon, Hong Kong
              </p>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1E1E1E] space-y-1">
              <div className="flex items-center gap-1.5 text-[#B69B5E] mb-1">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase">Direct Lines</span>
              </div>
              <p className="font-mono text-[11px] text-[#F5F5F5]">+852 3525 1640</p>
              <p className="font-mono text-[11px] text-[#A3A3A3]">+852 9064 9593</p>
              <p className="font-mono text-[11px] text-[#A3A3A3]">+852 6903 7690</p>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1E1E1E] space-y-1">
              <div className="flex items-center gap-1.5 text-[#B69B5E] mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase">Official Email</span>
              </div>
              <p className="font-mono text-[11px] text-[#F5F5F5]">
                Saiftradingco@yahoo.com
              </p>
              <p className="text-[10px] text-[#737373] mt-2 leading-relaxed">
                Primary contact address configured across public quotation inquiries and transactional correspondence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
