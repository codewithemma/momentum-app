import { auth } from "@/server/auth";
import { NextResponse } from "next/server";

const LOGIN_ROUTE = "/login";
const ONBOARDING_ROUTE = "/onboarding";

const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/leads",
  "/pipeline",
  "/settings",
];

export default auth((req) => {
  const { pathname, origin, search } = req.nextUrl;

  const isAuthenticated = !!req.auth;
  const isOnboarded = req.auth?.user?.isOnboarded === true;

  const isLoginRoute = pathname === LOGIN_ROUTE;
  const isOnboardingRoute =
    pathname === ONBOARDING_ROUTE ||
    pathname.startsWith(`${ONBOARDING_ROUTE}/`);

  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  /**
   * 1. Authenticated users shouldn't visit /login.
   *
   * Send them to the correct place based on onboarding state.
   */
  if (isAuthenticated && isLoginRoute) {
    return NextResponse.redirect(
      new URL(isOnboarded ? "/dashboard" : ONBOARDING_ROUTE, origin),
    );
  }

  /**
   * 2. Unauthenticated users cannot access protected routes
   *    or onboarding.
   */
  if (!isAuthenticated && (isProtectedRoute || isOnboardingRoute)) {
    const callbackUrl = encodeURIComponent(`${origin}${pathname}${search}`);

    return NextResponse.redirect(
      new URL(`${LOGIN_ROUTE}?callbackUrl=${callbackUrl}`, origin),
    );
  }

  /**
   * 3. Authenticated users who haven't completed onboarding
   *    cannot access the main app.
   */
  if (isAuthenticated && !isOnboarded && isProtectedRoute) {
    return NextResponse.redirect(new URL(ONBOARDING_ROUTE, origin));
  }

  /**
   * 4. Authenticated users who HAVE completed onboarding
   *    shouldn't see onboarding again.
   */
  if (isAuthenticated && isOnboarded && isOnboardingRoute) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
