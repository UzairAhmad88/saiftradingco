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
      className="p-6 bg-[#F5F3EE] border border-[#E2DFD7] rounded-[4px] space-y-4 my-8 shadow-xs"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#4D6618] font-semibold">
        <ListOrdered className="w-4 h-4" />
        <span>Table of Contents</span>
      </div>

      <ol className="space-y-2.5 text-xs sm:text-sm text-[#050505]">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-start gap-2.5 group">
            <span className="font-mono text-xs text-[#777772] group-hover:text-[#4D6618] transition-colors shrink-0 pt-0.5">
              0{index + 1}
            </span>
            <Link
              href={`#${item.id}`}
              className="text-[#050505] hover:text-[#4D6618] hover:underline underline-offset-4 decoration-[#4D6618]/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#050505]"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
