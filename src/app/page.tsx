"use client"

import { useState } from "react"
import { Product as ProductType } from "./lib/products"
import { Registration } from "./lib/registrations"
import { Product } from "./components/Product"
import { Entitlements } from "./lib/entitlements"

// This is where users can see their products, and subscribe or unsubscribe
export default function Home() {

  const [userId, setUserId] = useState("")
  const [products, setProducts] = useState<ProductType[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [entitlements, setEntitlements] = useState<Entitlements[]>([])

  // load the users data
  async function loadUserData() {
    if (!userId) return

    const [productsRes, regRes, entitlementsRes] = await Promise.all([
      fetch("/api/products"),
      fetch(`/api/registrations?userId=${userId}`),
      fetch(`api/entitlements/${userId}`)
    ])

    const productsData = await productsRes.json()
    const registrationsData = await regRes.json()
    const entitlementsData = await entitlementsRes.json()

    setProducts(Object.values(productsData))
    setRegistrations(registrationsData.registrations)
    console.log(entitlementsData.entitlements)
    setEntitlements(entitlementsData.entitlements)
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

    const registrationId = getRegistration(productId)?.id

    await fetch(`/api/registrations/${registrationId}/revoke`, {
      method: "POST",
    })

    await loadUserData()
  }

  function clearUserData() {
    setProducts([])
    setRegistrations([])
  }

  return (
    <div style={{ padding: 24 }}>
      {/* USER INPUT */}
      {products.length === 0 && <div style={{ marginBottom: 20 }}>
        <input
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          placeholder="Enter user ID"
          style={{
            padding: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={loadUserData}
          style={{ marginLeft: 8 }}
        >
          Log In
        </button>
      </div>}

      {/* PRODUCTS */}
      {products.length > 0 && <div>
        <h2>Products</h2>

        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            registration={getRegistration(
              product.id
            )}
            onSubscribe={subscribe}
            onUnsubscribe={unsubscribe}
          />
        ))}

        <h2>Entitlements</h2>

        <ul className="m-4">
          {entitlements.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>

        <button onClick={clearUserData}> Log Out </button>
      </div> 
      
      }
    </div>
  )
}