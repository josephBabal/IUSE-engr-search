import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)
// const { auth } from "@/auth"

import {
  DEFAULT_LOGIN_REDIRECT, 
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes"


export default auth((req) => {
  console.log("-- ROUTE: ", req.nextUrl.pathname)
  const { nextUrl } = req;
  
  const isLoggedIn = !!req.auth //* !! turns to boolean

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  //* /api/auth/providers
  //* anyone can access this
  if (isApiAuthRoute) {
    return;
  }

  //* ex. /admin
  //* redirect to settings page if logged in
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  //* redirect to homepage if user not logged in 
  //* and on route that requires user to be logged in
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // //* redirect logged in user to homepage if on public route
  // if (isLoggedIn && isPublicRoute) {
  //   return Response.redirect(new URL("/home", nextUrl));
  // }

  //* do nothing, user on public route so everything is fine
  return;
});




// Optionally, don't invoke Middleware on some paths
//* every single route expect next static files and next images are going to invoke middleware
//* Invokes middleware everywhere, so we decide in middleware what to do with those routes
//* uses regular expression, invokes middleware every time when routes are used
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],

}

