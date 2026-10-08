import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createServerClientInstance } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data/gemstones-db";
import type { AdminUserContext, AdminRole } from "@/types/auth";
import type { User } from "@supabase/supabase-js";

/**
 * Retrieves the current authenticated Supabase user from the server session.
 * Returns null if no active session exists or if Supabase is unconfigured.
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createServerClientInstance();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (err) {
    console.warn("[getAuthenticatedUser] Failed to retrieve session user:", err);
    return null;
  }
}

/**
 * Checks whether a given user UUID has an authorized admin role.
 * Queries the database-backed `profiles` and `admin_roles` tables.
 * Never trusts user_metadata or client-provided parameters.
 */
export async function checkUserIsAdmin(
  userId: string
): Promise<{ isAdmin: boolean; role: AdminRole | null }> {
  if (!isSupabaseConfigured()) {
    return { isAdmin: false, role: null };
  }

  try {
    const supabase = await createServerClientInstance();

    // 1. Query the primary profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (profile?.role === "admin" || profile?.role === "super_admin") {
      return { isAdmin: true, role: profile.role as AdminRole };
    }

    // 2. Query legacy admin_roles table for backwards compatibility
    const { data: adminRole } = await supabase
      .from("admin_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (adminRole?.role === "admin" || adminRole?.role === "super_admin") {
      return { isAdmin: true, role: adminRole.role as AdminRole };
    }

    return { isAdmin: false, role: null };
  } catch (err) {
    console.error("[checkUserIsAdmin] Error verifying administrative role:", err);
    return { isAdmin: false, role: null };
  }
}

/**
 * Server-side guard: Requires an authenticated user.
 * Redirects unauthenticated requests to /admin/login.
 */
export async function requireAuthenticatedUser(
  currentPath?: string
): Promise<User> {
  const user = await getAuthenticatedUser();

  if (!user) {
    const redirectUrl = currentPath
      ? `/admin/login?next=${encodeURIComponent(currentPath)}`
      : "/admin/login";
    redirect(redirectUrl);
  }

  return user;
}

/**
 * Server-side guard: Requires an authenticated user WITH verified admin privileges.
 *
 * Flow:
 * 1. Unauthenticated -> Redirects to /admin/login
 * 2. Authenticated but non-admin -> Redirects to /admin/unauthorized
 * 3. Authenticated admin -> Returns AdminUserContext
 */
export async function requireAdmin(): Promise<AdminUserContext> {
  const user = await getAuthenticatedUser();

  if (!user) {
    // Attempt to determine the current path from request headers
    let currentPath = "/admin/dashboard";
    try {
      const headerList = await headers();
      const nextUrl = headerList.get("x-invoke-path") || headerList.get("x-url");
      if (nextUrl && nextUrl.startsWith("/admin")) {
        currentPath = nextUrl;
      }
    } catch {
      // Fallback to default
    }

    redirect(`/admin/login?next=${encodeURIComponent(currentPath)}`);
  }

  const { isAdmin, role } = await checkUserIsAdmin(user.id);

  if (!isAdmin || !role) {
    // Authenticated user lacks administrative credentials
    redirect("/admin/unauthorized");
  }

  return {
    id: user.id,
    email: user.email || "",
    role,
    user,
  };
}
