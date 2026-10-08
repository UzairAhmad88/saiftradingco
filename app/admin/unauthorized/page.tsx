import type { Metadata } from "next";
import Link from "next/link";
import { signOutAction } from "@/lib/auth/actions";
import { constructMetadata } from "@/lib/seo/metadata";
import { ShieldAlert, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = constructMetadata({
  title: "Access Restricted | Saif Trading Co",
  description: "Access to the Saif Trading Co administrative portal is restricted.",
  canonical: "/admin/unauthorized",
  noIndex: true,
});

export default function AdminUnauthorizedPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-[80vh] w-full bg-[#050505] flex items-center justify-center py-16 px-4 focus:outline-none"
    >
      <div className="w-full max-w-md p-8 sm:p-10 bg-[#101010] border border-[#2A2A2A] text-center space-y-6">
        <div className="w-12 h-12 mx-auto bg-[#1A1010] border border-[#DC2626]/40 flex items-center justify-center">
          <ShieldAlert className="w-6 h-6 text-[#DC2626]" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#DC2626] block font-medium">
            Authorization Required
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#F5F5F5] font-normal tracking-tight">
            Access Restricted
          </h1>
          <p className="text-xs sm:text-sm text-[#A3A3A3] font-light leading-relaxed max-w-xs mx-auto">
            You do not have permission to access the Saif Trading Co administration area. Contact the system administrator if you believe this is an error.
          </p>
        </div>

        <div className="pt-4 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#B69B5E] text-[#050505] text-xs font-medium uppercase tracking-wider hover:bg-[#C8AE6F] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Return to Website</span>
          </Link>

          <form action={signOutAction} className="w-full sm:w-auto">
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto border-[#2A2A2A] text-xs uppercase tracking-wider text-[#A3A3A3] hover:text-[#F5F5F5]"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              <span>Sign Out</span>
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
