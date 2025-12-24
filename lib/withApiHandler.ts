import type { z, ZodSchema } from "zod"
import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { logger } from "@/lib/logger"
import crypto from "crypto"

interface ApiContext<T = any> {
  req: NextRequest
  user?: any
  body: T
  requestId: string
  prisma: typeof prisma
}

interface ApiOptions<T extends ZodSchema> {
  schema?: T
  role?: "ADMIN" | "USER" | "ANY"
}

export function withApiHandler<T extends ZodSchema>(
  opts: ApiOptions<T> = {},
  handler: (ctx: ApiContext<z.infer<T>>) => Promise<any>,
) {
  return async (req: NextRequest) => {
    const requestId = req.headers.get("x-request-id") ?? crypto.randomUUID()
    const method = req.method ?? "GET"
    const route = new URL(req.url).pathname
    const startTime = Date.now()

    let user: any = undefined
    let ipHash: string | undefined

    try {
      // Hash IP for privacy
      const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "127.0.0.1"
      ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32)

      // Set logger context
      logger.setContext({ requestId, route, method, ipHash })

      // Get user session
      const session = await getServerSession()
      user = session?.user

      // Role-based access control
      if (opts.role === "ADMIN" && user?.role !== "ADMIN") {
        logger.warn("Access denied: Admin role required", { userId: user?.id })
        return NextResponse.json(
          { ok: false, code: "FORBIDDEN", message: "Admin access required", requestId },
          { status: 403 },
        )
      }

      if (opts.role === "USER" && !user) {
        logger.warn("Access denied: Authentication required")
        return NextResponse.json(
          { ok: false, code: "UNAUTHORIZED", message: "Authentication required", requestId },
          { status: 401 },
        )
      }

      // Parse and validate request body
      let body: any = {}
      if (method !== "GET") {
        try {
          const rawBody = await req.text()
          body = rawBody ? JSON.parse(rawBody) : {}
        } catch (e) {
          throw { status: 400, code: "INVALID_JSON", publicMessage: "Invalid JSON in request body" }
        }
      }

      if (opts.schema) {
        try {
          body = opts.schema.parse(body)
        } catch (e: any) {
          logger.warn("Validation failed", { errors: e.errors })
          throw {
            status: 400,
            code: "VALIDATION_ERROR",
            publicMessage: "Invalid request data",
            details: e.errors,
          }
        }
      }

      // Execute handler
      logger.info("API request started", { userId: user?.id })
      const result = await handler({ req, user, body, requestId, prisma })

      const duration = Date.now() - startTime
      logger.info("API request completed", { userId: user?.id, duration })

      return NextResponse.json({ ok: true, data: result, requestId })
    } catch (err: any) {
      const duration = Date.now() - startTime
      const status = err?.status ?? 500
      const code = err?.code ?? (status === 429 ? "RATE_LIMIT" : "INTERNAL_ERROR")
      const message =
        process.env.NODE_ENV === "production"
          ? (err?.publicMessage ?? "Something went wrong")
          : (err?.message ?? "Internal server error")

      logger.error("API request failed", {
        userId: user?.id,
        duration,
        status,
        code,
        error: err?.message,
        stack: err?.stack?.slice(0, 1000),
      })

      // Log error to database
      try {
        await prisma.errorLog.create({
          data: {
            requestId,
            userId: user?.id,
            route,
            method,
            status,
            code,
            message: err?.message ?? message,
            stack: err?.stack?.slice(0, 4000) ?? null,
            context: JSON.stringify({
              url: req.url,
              userAgent: req.headers.get("user-agent"),
              duration,
            }),
            ipHash,
          },
        })
      } catch (dbErr) {
        logger.error("Failed to log error to database", { error: dbErr })
      }

      return NextResponse.json({ ok: false, code, message, requestId }, { status })
    }
  }
}
