import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Privileged Service Role Supabase Client
 * STRICT SERVER-ONLY.
 *
 * Bypasses Row Level Security (RLS) for trusted server-side management.
 * NEVER import this into Client Components, browser bundles, or public endpoints.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error(
      "[Security Violation] createAdminClient cannot be invoked in a browser environment."
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing privileged Supabase service role credentials (SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY)."
    );
  }

  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
