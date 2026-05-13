
import { Entitlements } from "@/app/lib/entitlements"

// This returns a user's entitlements
export async function GET(
  request: Request,
  context: {
    params: Promise<{ userId: string }>
  }
) {
  const { userId } = await context.params

  // get list of user's entitlements, filtering out expired ones

  return Response.json({
    userId,
    entitlements: Object.values(Entitlements),
  })
}