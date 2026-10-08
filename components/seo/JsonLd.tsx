import React from "react";

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Renders structured JSON-LD data with sanitization to prevent XSS script injection.
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  // Escape closing tags and characters to prevent HTML/XSS injection
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
