/**
 * Open Redirect Protection Utility
 *
 * Validates untrusted user-supplied redirect parameters (next, returnTo, redirect).
 * Enforces that redirects only resolve to safe internal relative application paths.
 */
export function getSafeRedirectPath(
  target: string | null | undefined,
  defaultPath: string = "/admin/dashboard"
): string {
  if (!target || typeof target !== "string") {
    return defaultPath;
  }

  const trimmed = target.trim();

  // Must begin with a single slash (relative URL)
  if (!trimmed.startsWith("/")) {
    return defaultPath;
  }

  // Reject protocol-relative URLs (e.g., //evil.com or ///evil.com)
  if (trimmed.startsWith("//")) {
    return defaultPath;
  }

  // Reject Windows backslash bypasses (e.g., /\evil.com or \evil.com)
  if (trimmed.includes("\\")) {
    return defaultPath;
  }

  // Reject control characters or whitespace attacks
  if (/[\r\n\t]/.test(trimmed)) {
    return defaultPath;
  }

  // Reject explicit protocol schemes (e.g., javascript:, data:, https:)
  if (trimmed.includes(":") && trimmed.indexOf(":") < trimmed.indexOf("/")) {
    return defaultPath;
  }

  // Ensure it targets either the root or internal paths
  return trimmed;
}
