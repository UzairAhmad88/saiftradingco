import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ArticleLoading() {
  return (
    <div className="w-full bg-[#050505] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <Skeleton className="h-4 w-40 bg-[#181818]" />
        <Skeleton className="h-12 w-3/4 bg-[#202020]" />
        <Skeleton className="h-20 w-full bg-[#151515]" />
        <div className="aspect-[16/9] w-full bg-[#101010] border border-[#222]" />
        <div className="space-y-4 pt-8">
          <Skeleton className="h-4 w-full bg-[#181818]" />
          <Skeleton className="h-4 w-5/6 bg-[#181818]" />
          <Skeleton className="h-4 w-4/5 bg-[#181818]" />
        </div>
      </div>
    </div>
  );
}
