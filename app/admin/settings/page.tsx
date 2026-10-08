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
      <div className="pb-5 border-b border-[#262626]">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9CCB63] font-medium">
          System Administration
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F0] font-normal tracking-tight mt-1">
          Settings & Session Profile
        </h1>
        <p className="text-xs text-[#9A9A94] mt-1 font-light">
          Review authenticated credentials, system configuration, and business reference data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Administrator Profile Card */}
        <div className="bg-[#111111] border border-[#262626] rounded-[4px] p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1F1F1F]">
            <KeyRound className="w-4 h-4 text-[#9CCB63]" aria-hidden="true" />
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F0] font-medium">
              Administrator Profile
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9A9A94] font-mono block">
                  Authenticated Email
                </span>
                <span className="text-xs text-[#F5F5F0] font-mono">
                  {adminContext.email}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-mono text-[#9CCB63] bg-[#9CCB63]/10 border border-[#9CCB63]/30 px-2 py-0.5 rounded-[4px]">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9A9A94] font-mono block">
                  Database Role
                </span>
                <span className="text-xs text-[#F5F5F0] font-mono uppercase">
                  {adminContext.role}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#9CCB63]">
                Full Catalogue Authorization
              </span>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px]">
              <span className="text-[10px] uppercase tracking-wider text-[#9A9A94] font-mono block">
                User Identifier (UUID)
              </span>
              <span className="text-[11px] text-[#9A9A94] font-mono break-all">
                {adminContext.id}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1F1F1F]">
            <form action={signOutAction}>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="w-full text-xs border-[#262626] text-[#9A9A94] hover:text-[#F5F5F0] hover:border-[#9CCB63]/40"
              >
                <LogOut className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
                <span>End Session & Sign Out</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Security & System Architecture */}
        <div className="bg-[#111111] border border-[#262626] rounded-[4px] p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1F1F1F]">
            <Server className="w-4 h-4 text-[#9CCB63]" aria-hidden="true" />
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F0] font-medium">
              System & Security Architecture
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#F5F5F0] text-[11px]">Next.js App Router</span>
                <span className="text-[#9CCB63] font-mono text-[10px]">v16.4 (SSR)</span>
              </div>
              <p className="text-[11px] text-[#9A9A94]">
                Server-side authorization enforced via <code>requireAdmin()</code> guards.
              </p>
            </div>

            <div className="p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#F5F5F0] text-[11px]">PostgreSQL RLS Security</span>
                <span className="text-[#9CCB63] font-mono text-[10px]">Active & Enforced</span>
              </div>
              <p className="text-[11px] text-[#9A9A94]">
                Row-Level Security active on gemstones, categories, images, and inquiries.
              </p>
            </div>

            <div className="p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#F5F5F0] text-[11px]">Storage Policies</span>
                <span className="text-[#9CCB63] font-mono text-[10px]">Protected Bucket</span>
              </div>
              <p className="text-[11px] text-[#9A9A94]">
                Admin-only write and delete access on <code>gemstones</code> storage bucket.
              </p>
            </div>

            <div className="p-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#9A9A94]">
                <Lock className="w-3.5 h-3.5" />
                <span>Service Role Keys</span>
              </div>
              <span className="text-[10px] font-mono text-[#9CCB63]">
                Restricted to Server Execution
              </span>
            </div>
          </div>
        </div>

        {/* Business Reference Information (Read-Only) */}
        <div className="lg:col-span-2 bg-[#111111] border border-[#262626] rounded-[4px] p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1F1F1F]">
            <Building2 className="w-4 h-4 text-[#9CCB63]" aria-hidden="true" />
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F0] font-medium">
              Verified Business Reference Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
              <div className="flex items-center gap-1.5 text-[#9CCB63] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase">Registered Office</span>
              </div>
              <p className="text-[#F5F5F0] font-medium">Saif Trading Co</p>
              <p className="text-[#9A9A94] text-[11px] leading-relaxed">
                417 Flat 4 Floor, Block B,<br />
                Focal Industrial Centre,<br />
                21 Man Lok Street, Hung Hom,<br />
                Kowloon, Hong Kong
              </p>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
              <div className="flex items-center gap-1.5 text-[#9CCB63] mb-1">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase">Direct Lines</span>
              </div>
              <p className="font-mono text-[11px] text-[#F5F5F0]">+852 3525 1640</p>
              <p className="font-mono text-[11px] text-[#9A9A94]">+852 9064 9593</p>
              <p className="font-mono text-[11px] text-[#9A9A94]">+852 6903 7690</p>
            </div>

            <div className="p-3.5 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[4px] space-y-1">
              <div className="flex items-center gap-1.5 text-[#9CCB63] mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase">Official Email</span>
              </div>
              <p className="font-mono text-[11px] text-[#F5F5F0]">
                Saiftradingco@yahoo.com
              </p>
              <p className="text-[10px] text-[#9A9A94] mt-2 leading-relaxed">
                Primary contact address configured across public quotation inquiries and transactional correspondence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
