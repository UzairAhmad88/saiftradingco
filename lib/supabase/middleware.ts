import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeRedirectPath } from "@/lib/auth/redirects";

/**
 * Middleware session handler for Supabase SSR in Next.js App Router.
 * Refreshes auth cookies and guards /admin routes against unauthenticated requests.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const pathname = request.nextUrl.pathname;

  // Pass through if Supabase is unconfigured (development/fallback mode)
  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // Refresh auth session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Guard administrative routes
    const isProtectedAdminRoute =
      pathname.startsWith("/admin") &&
      pathname !== "/admin/login" &&
      pathname !== "/admin/unauthorized";

    if (isProtectedAdminRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      const safeNext = getSafeRedirectPath(pathname, "/admin/dashboard");
      url.searchParams.set("next", safeNext);
      return NextResponse.redirect(url);
    }
  } catch (err) {
    console.error("[Middleware] Session update error:", err);
  }

  return supabaseResponse;
}
