import { registrations } from "@/app/lib/registrations"

// This unsubscribes a user from a product by updates the expiresAt value of the registration
export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params

  const now = new Date()

  const registration = registrations.find(
    (r) => r.id === id
  )

  if (!registration) {
    return Response.json(
      { error: "Registration not found" },
      { status: 404 }
    )
  }

  registration.expiresAt = now.toISOString()

  return Response.json({
    success: true,
    message: "Registration revoked successfully",
    registration,
  })
}