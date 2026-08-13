import { prisma } from "@/lib/prisma"
import { Prisma } from "@/generated/prisma/client"

interface LogEventParams {
  userId?: string | null
  userEmail?: string | null
  event: string
  success: boolean
  ipAddress?: string | null
  userAgent?: string | null
  reference?: string | null
  metadata?: Record<string, unknown>
}

export async function logEvent({
  userId,
  userEmail,
  event,
  success,
  ipAddress,
  userAgent,
  reference,
  metadata,
}: LogEventParams) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: userId ?? undefined,
        userEmail: userEmail ?? undefined,
        event,
        success,
        ipAddress: ipAddress ?? undefined,
        userAgent: userAgent ?? undefined,
        reference: reference ?? undefined,
        metadata: metadata as Prisma.InputJsonValue | undefined,
      },
    })
  } catch (err) {
    console.error("Failed to write audit log:", event, err)
  }
}
