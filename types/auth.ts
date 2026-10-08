import type { User } from "@supabase/supabase-js";
import type { AdminRoleType } from "@/types/database";

export type AdminRole = AdminRoleType;

/**
 * Verified Administrative User Context.
 * Guaranteed to have a valid server-verified administrative role.
 */
export interface AdminUserContext {
  id: string;
  email: string;
  role: AdminRole;
  user: User;
}

/**
 * Result payload from server sign-in action.
 */
export interface SignInResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

/**
 * Result payload from server sign-out action.
 */
export interface SignOutResult {
  success: boolean;
  error?: string;
}
