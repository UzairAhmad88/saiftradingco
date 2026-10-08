import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUser, checkUserIsAdmin } from "@/lib/auth/server";
import { getSafeRedirectPath } from "@/lib/auth/redirects";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { constructMetadata } from "@/lib/seo/metadata";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Admin Sign In | Saif Trading Co",
  description: "Secure administrative portal authentication for Saif Trading Co.",
  canonical: "/admin/login",
  noIndex: true, // Never index administrative authentication routes
});

interface AdminLoginPageProps {
  searchParams: Promise<{
    next?: string;
  }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  // If an already-authenticated admin visits /admin/login, route to dashboard or unauthorized
  const user = await getAuthenticatedUser();
  if (user) {
    const { isAdmin } = await checkUserIsAdmin(user.id);
    if (isAdmin) {
      redirect("/admin/dashboard");
    } else {
      redirect("/admin/unauthorized");
    }
  }

  const { next: nextParam } = await searchParams;
  const safeNext = getSafeRedirectPath(nextParam, "/admin/dashboard");

  return (
    <main
      id="main-content"
      className="min-h-[85vh] w-full bg-[#050505] flex items-center justify-center py-16 px-4 sm:px-6"
    >
      <div className="w-full max-w-md space-y-8">
        {/* Brand & Editorial Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#101010] border border-[#2A2A2A] text-[10px] uppercase tracking-[0.25em] text-[#B69B5E] font-medium">
            <Shield className="w-3 h-3 text-[#B69B5E]" aria-hidden="true" />
            <span>Administration</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F5F5] font-normal tracking-tight">
            Admin Sign In
          </h1>

          <p className="text-xs sm:text-sm text-[#A3A3A3] font-light max-w-xs mx-auto leading-relaxed">
            Sign in to manage the gemstone catalogue and website content.
          </p>
        </div>

        {/* Login Surface Panel */}
        <div className="p-8 sm:p-10 bg-[#101010] border border-[#2A2A2A] shadow-2xl space-y-6">
          <AdminLoginForm safeNext={safeNext} />
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#737373] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E] p-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
