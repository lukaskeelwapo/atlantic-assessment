import { Entitlements } from "@/app/lib/entitlements"
import { REGISTRATIONS } from "@/app/lib/registrations"

// This returns a user's entitlements
export async function POST(
  request: Request,
) {
  const body = await request.json()

  const { userId, productId } = body

  const newRegistration = {
    id: "RANDOM",

    userId: userId,
    productId: productId,

    grantedAt: "NOW"
  }

  REGISTRATIONS.push(newRegistration)

  return Response.json({
    userId,
    entitlements: Object.values(Entitlements),
  })
}