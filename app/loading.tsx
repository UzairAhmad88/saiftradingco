import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function GlobalLoading() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 py-16 sm:py-24 focus:outline-none"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <Container size="default" className="space-y-12">
        {/* Subtle Header Skeleton */}
        <div className="space-y-4 max-w-2xl">
          <Skeleton variant="text" className="w-28 h-3 bg-[#171717]" />
          <Skeleton variant="text" className="w-3/4 h-10 bg-[#171717]" />
          <Skeleton variant="text" className="w-full h-4 bg-[#171717]" />
        </div>

        {/* Subtle Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="border border-[#2A2A2A] bg-[#101010] p-6 space-y-4">
            <Skeleton className="w-full aspect-[4/3] bg-[#171717]" />
            <Skeleton variant="text" className="w-1/2 h-4 bg-[#171717]" />
            <Skeleton variant="text" className="w-3/4 h-6 bg-[#171717]" />
          </div>
          <div className="border border-[#2A2A2A] bg-[#101010] p-6 space-y-4 hidden md:block">
            <Skeleton className="w-full aspect-[4/3] bg-[#171717]" />
            <Skeleton variant="text" className="w-1/2 h-4 bg-[#171717]" />
            <Skeleton variant="text" className="w-3/4 h-6 bg-[#171717]" />
          </div>
          <div className="border border-[#2A2A2A] bg-[#101010] p-6 space-y-4 hidden md:block">
            <Skeleton className="w-full aspect-[4/3] bg-[#171717]" />
            <Skeleton variant="text" className="w-1/2 h-4 bg-[#171717]" />
            <Skeleton variant="text" className="w-3/4 h-6 bg-[#171717]" />
          </div>
        </div>
      </Container>
    </main>
  );
}
