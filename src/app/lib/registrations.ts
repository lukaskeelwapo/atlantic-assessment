// A registration represents a specific user's access to a specific product
type Registration = {
    id: string,

    userId: string
    productId: string

    grantedAt: string
    expiresAt?: string
}

// Would build out a database in something like GraphQL provided time
export const REGISTRATIONS = [
    {
        id: "1",

        userId: "lukas",
        productId: "no_ads",

        grantedAt: "NOW"
    }
]