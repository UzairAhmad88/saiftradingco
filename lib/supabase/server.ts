import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

/**
 * Creates a server-side Supabase client with cookie-based session management.
 * Strictly for Server Components, Server Actions, and Route Handlers.
 * Enforces Row Level Security (RLS) under the current user's session context.
 */
export async function createServerClientInstance() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "";

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // In Server Components, cookie mutation is disallowed.
          // This catch block prevents runtime crashes when sessions refresh.
        }
      },
    },
  });
}

// Preserve existing function signature for backward compatibility
export const createClient = createServerClientInstance;
