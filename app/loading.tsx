import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function GlobalLoading() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 py-16 sm:py-24 bg-[#E5F1D2] focus:outline-none"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <Container size="default" className="space-y-12">
        {/* Subtle Header Skeleton */}
        <div className="space-y-4 max-w-2xl">
          <Skeleton variant="text" className="w-28 h-3 bg-[#CFE7AA]/60" />
          <Skeleton variant="text" className="w-3/4 h-10 bg-[#CFE7AA]/70" />
          <Skeleton variant="text" className="w-full h-4 bg-[#CFE7AA]/50" />
        </div>

        {/* Subtle Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="border border-[#D4DEC5] bg-[#F7F7F1] p-6 space-y-4 rounded-[4px] shadow-sm">
            <Skeleton className="w-full aspect-[4/3] bg-[#CFE7AA]/40 rounded-[2px]" />
            <Skeleton variant="text" className="w-1/2 h-4 bg-[#CFE7AA]/60" />
            <Skeleton variant="text" className="w-3/4 h-6 bg-[#CFE7AA]/70" />
          </div>
          <div className="border border-[#D4DEC5] bg-[#F7F7F1] p-6 space-y-4 rounded-[4px] shadow-sm hidden md:block">
            <Skeleton className="w-full aspect-[4/3] bg-[#CFE7AA]/40 rounded-[2px]" />
            <Skeleton variant="text" className="w-1/2 h-4 bg-[#CFE7AA]/60" />
            <Skeleton variant="text" className="w-3/4 h-6 bg-[#CFE7AA]/70" />
          </div>
          <div className="border border-[#D4DEC5] bg-[#F7F7F1] p-6 space-y-4 rounded-[4px] shadow-sm hidden md:block">
            <Skeleton className="w-full aspect-[4/3] bg-[#CFE7AA]/40 rounded-[2px]" />
            <Skeleton variant="text" className="w-1/2 h-4 bg-[#CFE7AA]/60" />
            <Skeleton variant="text" className="w-3/4 h-6 bg-[#CFE7AA]/70" />
          </div>
        </div>
      </Container>
    </main>
  );
}
