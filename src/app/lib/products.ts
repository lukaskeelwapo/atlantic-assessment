import { Entitlements } from "./entitlements"

// A product has access to a specific list of entitlements
type Product = {
    name: string,
    id: string,

    // how long till expires
    duration: number,

    entitlements: Entitlements[]
}

export const PRODUCTS = {
  digital: {
    id: "digital",
    name: "Digital",
    duration: 30,
    entitlements: ["READ_CONTENT"],
  },

  print: {
    id: "print",
    name: "Print",
    duration: 30,
    entitlements: [
      "READ_CONTENT",
      "PRINT_MAGAZINE",
    ],
  },

  premium: {
    id: "premium",
    name: "Premium",
    duration: 30,
    entitlements: [
      "READ_CONTENT",
      "PRINT_MAGAZINE",
      "NO_ADS",
    ],
  },
}

export type ProductId = keyof typeof PRODUCTS