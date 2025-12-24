import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

function generateRequestId(): string {
  return crypto.randomUUID()
}

export async function middleware(request: NextRequest) {
  // Generate request ID if not present
  const requestId = request.headers.get("x-request-id") ?? generateRequestId()

  // Update Supabase session
  const response = await updateSession(request)

  // Add request ID to response headers
  response.headers.set("x-request-id", requestId)

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  const isDev = process.env.NODE_ENV !== "production"
  const csp = [
    "default-src 'self';",
    `script-src 'self' ${isDev ? "'unsafe-eval' 'unsafe-inline' blob:" : ""};`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
    "img-src 'self' data: blob: https:;",
    `connect-src 'self' https: ${isDev ? "ws:" : ""};`,
    "font-src 'self' https://fonts.gstatic.com data:;",
    "frame-ancestors 'none';",
    "base-uri 'self';",
  ].join(" ")

  response.headers.set("Content-Security-Policy", csp)

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
