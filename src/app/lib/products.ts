import { Entitlements } from "./entitlements"

// A product has access to a specific list of entitlements
type Product = {
    name: string,
    id: string,

    duration: number,

    entitlements: Entitlements[]
}