"use client"

import { useState } from "react"
import { Product } from "./lib/products"
import { Registration } from "./lib/registrations"

// This is where users can see their products, and subscribe or unsubscribe
export default function Home() {

  const [userId, setUserId] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])

  // load the users data
  async function loadUserData() {
    if (!userId) return

    const [productsRes, regRes] = await Promise.all([
      fetch("/api/products"),
      fetch(`/api/registrations?userId=${userId}`),
    ])

    const productsData = await productsRes.json()
    const registrationsData = await regRes.json()

    setProducts(Object.values(productsData))
    setRegistrations(registrationsData.registrations)
  }

  // subscribe to a new product
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

    await loadUserData()
  }

    function getRegistration(productId: string) {
      return registrations.find(
        (r) => r.productId === productId
      )
    }

  // unsubscribe from a product
  async function unsubscribe(productId: string) {

    const registrationId = getRegistration(productId)

    await fetch(`/api/registrations/${registrationId}/revoke`, {
      method: "POST",
    })

    await loadUserData()
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Subscriptions</h1>

      {/* USER INPUT */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
          style={{ padding: 8, border: "1px solid #ccc" }}
        />

        <button onClick={loadUserData} style={{ marginLeft: 8 }}>
          Load
        </button>
      </div>

      {/* PRODUCTS LIST */}
      <div>
        <h2>Products</h2>

        {products.map((product) => {
          const reg = getRegistration(product.id)
          const isSubscribed = !!reg

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
                {isSubscribed ? (
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
  );
}