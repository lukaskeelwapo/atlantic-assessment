import { Entitlements } from "@/app/lib/entitlements"
import { registrations } from "@/app/lib/registrations"

// This returns a user's entitlements
export async function POST(
  request: Request,
) {
  const body = await request.json()

  const { userId, productId } = body

  const now = new Date()

  const newRegistration = {
    id: crypto.randomUUID(),
    userId,
    productId,
    grantedAt: now.toISOString(),
  }

  registrations.push(newRegistration)

  return Response.json(
    {
      success: true,
      message: "Registration created successfully",
      registration: newRegistration,
    },
    { status: 201 }
  )
}