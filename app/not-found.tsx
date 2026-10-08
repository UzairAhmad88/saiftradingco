import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Page Not Found | Saif Trading Co",
  description: "The requested gemstone specimen record or page could not be located.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 flex items-center justify-center py-24 sm:py-32 bg-[#050505] text-[#F5F3EE] focus:outline-none"
    >
      <Container size="narrow" className="text-center space-y-6">
        <span className="type-eyebrow text-[#B6D94C] block">
          404 · Notice
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F3EE] tracking-tight">
          Page Not Found
        </h1>

        <p className="type-body text-[#A5A5A0] max-w-md mx-auto font-light leading-relaxed">
          The gemstone specimen record or page you requested could not be located. It may have been archived or relocated.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#B6D94C] text-[#050505] font-semibold rounded-[2px] hover:bg-[#A3C73A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          >
            Return Home
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#242424] rounded-[2px] text-[#F5F3EE] hover:border-[#B6D94C] hover:text-[#B6D94C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
          >
            Explore Collections
          </Link>
        </div>
      </Container>
    </main>
  );
}
