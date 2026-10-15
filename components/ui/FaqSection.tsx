"use client";

import { useState } from "react";
import { VERIFIED_FAQS, type FaqItem } from "@/lib/data/faq-data";
import { getFaqPageSchema } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  items?: FaqItem[];
  theme?: "dark" | "light";
  className?: string;
}

export function FaqSection({
  items = VERIFIED_FAQS,
  theme = "dark",
  className = "",
}: FaqSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqSchema = getFaqPageSchema(items);

  const isDark = theme === "dark";

  return (
    <>
      <JsonLd data={faqSchema} />
      <section
        aria-labelledby="faq-section-heading"
        className={`py-16 sm:py-24 border-t ${
          isDark
            ? "border-[#242424] bg-[#050505] text-[#F5F3EE]"
            : "border-[#E2DFD7] bg-[#F5F3EE] text-[#050505]"
        } ${className}`}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 border text-[10px] sm:text-[11px] uppercase tracking-[0.22em] rounded-[2px] ${
                isDark
                  ? "border-[#242424] bg-[#121212] text-[#B6D94C]"
                  : "border-[#D6D2C4] bg-[#FAF9F5] text-[#4D6618]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isDark ? "bg-[#B6D94C]" : "bg-[#4D6618]"
                }`}
                aria-hidden="true"
              />
              <span className="font-medium">Direct Trade Questions · Hong Kong</span>
            </div>
            <h2
              id="faq-section-heading"
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight ${
                isDark ? "text-[#F5F3EE]" : "text-[#050505]"
              }`}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? "text-[#A5A5A0]" : "text-[#555550]"
              }`}
            >
              Verified facts regarding our rough gemstone specializations, Hong Kong commercial base, laboratory documentation, and direct inquiry process.
            </p>
          </div>

          <div className="max-w-4xl space-y-4">
            {items.map((faq, index) => {
              const isOpen = openIndices.includes(index);
              return (
                <div
                  key={faq.question}
                  className={`border rounded-[3px] transition-colors duration-200 ${
                    isDark
                      ? "border-[#242424] bg-[#0C0C0C]"
                      : "border-[#E2DFD7] bg-[#FAF9F5]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B6D94C]"
                  >
                    <span
                      className={`font-serif text-lg sm:text-xl font-normal leading-snug ${
                        isDark ? "text-[#F5F3EE]" : "text-[#050505]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#B6D94C]" : "text-[#A5A5A0]"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1">
                      <p
                        className={`text-sm sm:text-base leading-relaxed font-light ${
                          isDark ? "text-[#A5A5A0]" : "text-[#555550]"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
