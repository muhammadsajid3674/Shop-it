import { NextResponse } from "next/server";

export function middleware(request) {
   const { pathname } = request.nextUrl;
   const authToken = "next-auth.session-token";
   if (request.cookies.get(authToken)) {
      if (!pathname.startsWith("/login") && !pathname.startsWith("/signup")) {
         return NextResponse.next();
      } else {
         return NextResponse.redirect(new URL("/home", request.url));
      }
   } else {
      if (pathname.startsWith("/home")) {
         return NextResponse.redirect(new URL("/login", request.url));
      } else {
         return NextResponse.next();
      }
   }
}
