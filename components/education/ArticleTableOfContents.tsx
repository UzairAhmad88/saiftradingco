import React from "react";
import Link from "next/link";
import type { TableOfContentsItem } from "@/lib/data/education-data";
import { ListOrdered } from "lucide-react";

export interface ArticleTableOfContentsProps {
  items: TableOfContentsItem[];
}

export function ArticleTableOfContents({ items }: ArticleTableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="p-6 bg-[#0A0A0A] border border-[#222] space-y-4 my-8"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B69B5E]">
        <ListOrdered className="w-4 h-4" />
        <span>Table of Contents</span>
      </div>

      <ol className="space-y-2.5 text-xs sm:text-sm text-[#A3A3A3]">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-start gap-2.5 group">
            <span className="font-mono text-xs text-[#737373] group-hover:text-[#B69B5E] transition-colors shrink-0 pt-0.5">
              0{index + 1}
            </span>
            <Link
              href={`#${item.id}`}
              className="hover:text-[#F5F5F5] hover:underline underline-offset-4 decoration-[#B69B5E]/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
