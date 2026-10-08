"use server";

import { redirect } from "next/navigation";
import { createServerClientInstance } from "@/lib/supabase/server";
import { checkUserIsAdmin } from "@/lib/auth/server";
import { getSafeRedirectPath } from "@/lib/auth/redirects";
import type { SignInResult } from "@/types/auth";

/**
 * Server Action: Authenticate an administrator via email and password.
 *
 * Implements:
 * - Generic error messages to prevent user enumeration
 * - Open redirect protection for post-login destinations
 * - Immediate server-side admin role verification
 */
export async function signInAction(
  prevState: SignInResult | null,
  formData: FormData
): Promise<SignInResult> {
  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");
  const nextRaw = formData.get("next");

  const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";
  const password = typeof passwordRaw === "string" ? passwordRaw : "";
  const safeNext = getSafeRedirectPath(
    typeof nextRaw === "string" ? nextRaw : undefined,
    "/admin/dashboard"
  );

  // 1. Basic validation
  if (!email || !password) {
    return {
      success: false,
      error: "Please enter both your email address and password.",
    };
  }

  try {
    const supabase = await createServerClientInstance();

    // 2. Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      // Do not reveal whether the email exists or password failed
      return {
        success: false,
        error: "Unable to sign in. Please check your email and password and try again.",
      };
    }

    // 3. Verify administrative authorization
    const { isAdmin } = await checkUserIsAdmin(data.user.id);

    if (!isAdmin) {
      // User is authenticated but does not possess an admin role
      return {
        success: true,
        redirectTo: "/admin/unauthorized",
      };
    }

    // 4. Authorized admin -> route to safe target
    return {
      success: true,
      redirectTo: safeNext,
    };
  } catch (err) {
    console.error("[signInAction] Unexpected exception during authentication:", err);
    return {
      success: false,
      error: "An unexpected error occurred during sign-in. Please try again.",
    };
  }
}

/**
 * Server Action: Invalidate the current session and sign out.
 */
export async function signOutAction(): Promise<void> {
  try {
    const supabase = await createServerClientInstance();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("[signOutAction] Sign out error:", err);
  }

  redirect("/admin/login");
}
