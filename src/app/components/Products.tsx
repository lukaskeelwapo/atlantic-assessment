"use client"

import { PRODUCTS } from "@/app/lib/products"

type Props = {
  userId: string
  entitlements: string[]
  onChange: () => Promise<void>
}

export default function Products({
  userId,
  entitlements,
  onChange,
}: Props) {
  const productList = Object.values(PRODUCTS)

  const hasEntitlement = (productId: string) => {
    const product = PRODUCTS[productId as keyof typeof PRODUCTS]

    return product.entitlements.some((e) =>
      entitlements.includes(e)
    )
  }

  async function subscribe(productId: string) {
    await fetch("/api/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
      }),
    })

    await onChange()
  }

  async function unsubscribe(registrationId: string) {
    await fetch(
      `/api/registrations/${registrationId}/revoke`,
      {
        method: "POST",
      }
    )

    await onChange()
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h2>Products</h2>

      <div>
        {productList.map((product) => {
          const isActive = hasEntitlement(product.id)

          return (
            <div
              key={product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                border: "1px solid #ddd",
                marginTop: 8,
              }}
            >
              <div>
                <strong>{product.name}</strong>
              </div>

              <div>
                {isActive ? (
                  <button
                    onClick={() =>
                      unsubscribe(product.id)
                    }
                    style={{
                      border: "1px solid red",
                      color: "red",
                      padding: "6px 10px",
                    }}
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      subscribe(product.id)
                    }
                    style={{
                      border: "1px solid green",
                      color: "green",
                      padding: "6px 10px",
                    }}
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}