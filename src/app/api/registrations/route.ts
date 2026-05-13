import { ProductId, PRODUCTS } from "@/app/lib/products"
import { registrations } from "@/app/lib/registrations"

// This returns a user's entitlements
export async function POST(
  request: Request,
) {
  const body = await request.json()

  const { userId, productId } = body as {
    userId: string
    productId: ProductId
  }

  if (!userId || !productId) {
    return Response.json(
      { error: "userId and productId required" },
      { status: 400 }
    )
  }

  const product = PRODUCTS[productId]

  if (!product) {
    return Response.json(
      { error: "Invalid productId" },
      { status: 400 }
    )
  }

  const now = new Date()

  const expiresAt = new Date()
  expiresAt.setDate(now.getDate() + product.duration)

  const newRegistration = {
    id: crypto.randomUUID(),
    userId,
    productId,
    grantedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
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