import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Redirect section root paths to their first subpage
  if (pathname === "/inicio") {
    return NextResponse.redirect(new URL("/inicio/presentacion", request.url))
  }
  if (pathname === "/sobre-mi") {
    return NextResponse.redirect(new URL("/sobre-mi/conocimientos", request.url))
  }
  if (pathname === "/proyectos") {
    return NextResponse.redirect(new URL("/proyectos/destacados", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/inicio", "/sobre-mi", "/proyectos"],
}

