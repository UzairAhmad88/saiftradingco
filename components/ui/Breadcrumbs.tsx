import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
      <ol
        className="flex items-center flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[#737373]"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            href="/"
            itemProp="item"
            className="text-[#A3A3A3] hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          return (
            <li
              key={item.label}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              <ChevronRight
                className="w-3 h-3 text-[#3A3A3A] shrink-0"
                aria-hidden="true"
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  className="text-[#A3A3A3] hover:text-[#B69B5E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B69B5E]"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  itemProp="name"
                  aria-current={isLast ? "page" : undefined}
                  className="text-[#F5F5F5] font-medium"
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
