
import { Entitlements } from "@/app/lib/entitlements"
import { PRODUCTS } from "@/app/lib/products"
import { registrations } from "@/app/lib/registrations"

// This returns a user's entitlements
export async function GET(
  request: Request,
  context: {
    params: Promise<{ userId: string }>
  }
) {
  const { userId } = await context.params

  const now = new Date()

  console.log(registrations);

  // filter out registrations by user id and what has expired
  const userRegistrations = registrations.filter((rgst) => {
    if (rgst.userId !== userId) return false

    if (
      rgst.expiresAt &&
      new Date(rgst.expiresAt) < now
    ) {
      return false
    }

    return true
  })

  const entitlements = userRegistrations.flatMap(
    (rgst) => {
      const product =
        PRODUCTS[rgst.productId]

      return product?.entitlements ?? []
    }
  )

  // de-dupe
  const uniqueEntitlements = [
    ...new Set(entitlements),
  ]

  return Response.json({
    userId,
    entitlements: uniqueEntitlements,
  })
}