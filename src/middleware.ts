import { NextResponse, type NextRequest } from "next/server";
import extractProfileServer from "./utils/auth/extract-profile-server";
import signOutServer from "./utils/auth/sign-out-server";

export async function middleware(request: NextRequest) {
  const profile = await extractProfileServer();
  const redirectUrl = request.nextUrl.clone();
  const isLoggedIn = Boolean(profile?._id);
  const userRole = profile?.role?.name;
  const isClubRole = Boolean(profile?.role?.name === "club");
  const isScoutRole = Boolean(profile?.role?.name === "scout");

  function reRouteAppropriately() {
    if (userRole === "club") {
      return "/dashboard/club";
    } else if (userRole === "scout") {
      return "/dashboard/scout";
    } else {
      signOutServer();
      return "/auth/sign-in";
    }
  }
  // STEP 1: CHECK IF SESSION EXISTS - tested
  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    // signOutServer();
    redirectUrl.pathname = "/auth/sign-in";
    return NextResponse.redirect(redirectUrl);
  }

  // SETP 2: IF SESSION EXISTS AND REQUEST IS AUTH ROUTE, REDIRECT TO RESPECTIVE DASHBOARDS
  if (isLoggedIn && request.nextUrl.pathname.startsWith("/auth")) {
    const redirectUrl = reRouteAppropriately();
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // STEP 3: IF AUTH USER ROLE (CLUB USER) DOES NOT MATCH DASHBOARD ROLE, REDIRECT TO APPROPRIATE PAGE
  if (
    isLoggedIn &&
    isClubRole &&
    request.nextUrl.pathname.startsWith("/dashboard/scout")
  ) {
    const redirectUrl = reRouteAppropriately();
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // STEP 3: IF AUTH USER ROLE (SCOUT USER) DOES NOT MATCH DASHBOARD ROLE, REDIRECT TO APPROPRIATE PAGE
  if (
    isLoggedIn &&
    isScoutRole &&
    request.nextUrl.pathname.startsWith("/dashboard/club")
  ) {
    const redirectUrl = reRouteAppropriately();
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }
  // FINAL STEP: ALLOW USER TO VISIT DESIRED ROUTE IF ALL THESE CHECKS FAILS
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
