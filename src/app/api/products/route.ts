
import { PRODUCTS } from "@/app/lib/products"

// So front end can access full list of products
export async function GET(
  request: Request,
) {
  return Response.json(PRODUCTS)
}