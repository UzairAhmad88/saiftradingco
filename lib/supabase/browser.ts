import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Creates a browser-compatible Supabase client for client-side interactions.
 * Safe for use in Client Components. Respects Row Level Security (RLS).
 */
const FALLBACK_SUPABASE_URL = "https://zafmpwmvcfrmaloscnkj.supabase.co";
const FALLBACK_SUPABASE_KEY = "sb_publishable_g6lUAcT2dE_Yo5m2uo--SA_jXC1DET1";

export function createBrowserClientInstance() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    FALLBACK_SUPABASE_KEY;

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}

// Preserve existing function name for backward compatibility
export const createClient = createBrowserClientInstance;
