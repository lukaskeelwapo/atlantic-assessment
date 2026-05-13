export async function GET(
  request: Request,
  context: {
    params: Promise<{ userId: string }>
  }
) {
  return Response.json({
    entitlements: [
      "READ_CONTENT",
      "NO_ADS",
    ],
  })
}