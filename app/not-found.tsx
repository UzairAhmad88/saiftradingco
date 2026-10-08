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
      className="flex-1 flex items-center justify-center py-24 sm:py-32 focus:outline-none"
    >
      <Container size="narrow" className="text-center space-y-6">
        <span className="type-eyebrow text-[#B69B5E] block">
          404 · Notice
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F5F5] tracking-tight">
          Page Not Found
        </h1>

        <p className="type-body text-[#A3A3A3] max-w-md mx-auto font-light leading-relaxed">
          The gemstone specimen record or page you requested could not be located. It may have been archived or relocated.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#F5F5F5] text-[#050505] font-medium hover:bg-[#B69B5E] transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#2A2A2A] text-[#F5F5F5] hover:border-[#B69B5E] hover:text-[#B69B5E] transition-colors"
          >
            Explore Collections
          </Link>
        </div>
      </Container>
    </main>
  );
}
