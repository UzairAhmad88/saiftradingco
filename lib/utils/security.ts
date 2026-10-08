/**
 * Security and Input Sanitization Utilities
 *
 * Provides defensive helpers for sanitizing untrusted inputs against:
 * - PostgREST syntax injection in .or() filters
 * - Unsafe URL schemes (javascript:, vbscript:, data:)
 * - HTML tag injection in plain text fields
 */

/**
 * Sanitizes an untrusted search string for safe interpolation into PostgREST .or() filters.
 *
 * PostgREST .or() strings use commas `,` and parentheses `()` as grammatical delimiters.
 * If an attacker supplies `search=xyz,status.eq.hidden`, an unescaped .or() filter would parse
 * the comma as a new condition.
 *
 * This function strips commas, parentheses, double quotes, and backslashes, collapses whitespace,
 * and bounds the maximum length to prevent query expansion.
 */
export function sanitizePostgrestSearch(input: string, maxLength: number = 80): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Remove PostgREST delimiter characters and quotes
  const cleaned = input
    .replace(/[,()"\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

  return cleaned;
}

/**
 * Validates that an untrusted URL uses an explicitly permitted safe protocol (default: https://).
 * Rejects javascript:, data:, file:, and protocol-relative URLs (//).
 */
export function isSafeHttpsUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  const trimmed = url.trim();

  // Must start strictly with https://
  if (!trimmed.startsWith("https://")) {
    return false;
  }

  // Reject whitespace, control characters, or embedded scripts
  if (/[\s\r\n\t]/.test(trimmed)) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Strips HTML tags and potential script content from a string to ensure plain text safety.
 */
export function stripHtml(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  return input.replace(/<[^>]*>/g, "").trim();
}
