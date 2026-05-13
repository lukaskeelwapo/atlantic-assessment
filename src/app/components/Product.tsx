"use client"

import { Product as ProductType } from "@/app/lib/products"
import { Registration } from "@/app/lib/registrations"

type Props = {
  product: ProductType
  registration?: Registration
  onSubscribe: (productId: string) => void
  onUnsubscribe: (registrationId: string) => void
}

export function Product({
  product,
  registration,
  onSubscribe,
  onUnsubscribe,
}: Props) {
  const isSubscribed = !!registration

  return (
    <div
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
        {isSubscribed ? (
          <button
            onClick={() =>
              onUnsubscribe(registration!.id)
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
              onSubscribe(product.id)
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
}