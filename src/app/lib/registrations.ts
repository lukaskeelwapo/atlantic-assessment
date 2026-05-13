import { ProductId } from "./products"

// A registration represents a specific user's access to a specific product
export type Registration = {
    id: string,

    userId: string
    productId: ProductId

    grantedAt: string
    expiresAt?: string
}

// Would build out a database in something like GraphQL provided time
export const registrations: Registration[] = []