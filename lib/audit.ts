import { prisma } from "@/lib/prisma"
import { logger } from "@/lib/logger"
import crypto from "crypto"

export async function audit(
  userId: string | undefined,
  action: string,
  target?: string,
  meta?: any,
  request?: Request,
) {
  try {
    let ipHash: string | undefined

    if (request) {
      const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "127.0.0.1"
      ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32)
    }

    await prisma.auditLog.create({
      data: {
        userId,
        actorType: userId ? "user" : "system",
        action,
        target,
        meta: meta ? JSON.stringify(meta) : "{}",
        ipHash,
      },
    })

    logger.info("Audit log created", { userId, action, target })
  } catch (error) {
    logger.error("Failed to create audit log", { error, userId, action })
  }
}

// Common audit actions
export const AuditActions = {
  // Authentication
  SIGNIN: "SIGNIN",
  SIGNOUT: "SIGNOUT",
  SIGNUP: "SIGNUP",

  // Bio Pages
  CREATED_PAGE: "CREATED_PAGE",
  UPDATED_PAGE: "UPDATED_PAGE",
  DELETED_PAGE: "DELETED_PAGE",
  PUBLISHED_PAGE: "PUBLISHED_PAGE",

  // Blocks
  CREATED_BLOCK: "CREATED_BLOCK",
  UPDATED_BLOCK: "UPDATED_BLOCK",
  DELETED_BLOCK: "DELETED_BLOCK",

  // Integrations
  CONNECTED_INTEGRATION: "CONNECTED_INTEGRATION",
  DISCONNECTED_INTEGRATION: "DISCONNECTED_INTEGRATION",

  // Actions & Triggers
  CREATED_ACTION: "CREATED_ACTION",
  UPDATED_ACTION: "UPDATED_ACTION",
  DELETED_ACTION: "DELETED_ACTION",
  CREATED_TRIGGER: "CREATED_TRIGGER",
  UPDATED_TRIGGER: "UPDATED_TRIGGER",
  DELETED_TRIGGER: "DELETED_TRIGGER",

  // Subscription
  SUBSCRIPTION_CREATED: "SUBSCRIPTION_CREATED",
  SUBSCRIPTION_UPDATED: "SUBSCRIPTION_UPDATED",
  SUBSCRIPTION_CANCELLED: "SUBSCRIPTION_CANCELLED",
} as const
