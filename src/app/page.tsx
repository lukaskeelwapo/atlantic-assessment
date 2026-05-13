"use client"

import { useState } from "react"

// This is where users can see their products, and subscribe or unsubscribe
export default function Home() {

  const [userId, setUserId] = useState("")
  const [productId, setProductId] = useState("digital")
  const [entitlements, setEntitlements] = useState<string[]>([])

  // load the entitlements for a given user
  async function loadEntitlements() {
    if (!userId) return

    const response = await fetch(
      `/api/entitlements/${userId}`
    )

    const data = await response.json()

    console.log(data)

    setEntitlements(data.entitlements)
  }


  // subscribe to a new product
  async function subscribe() {
  if (!userId || !productId) return

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

    // refresh UI after subscribe
    await loadEntitlements()
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Entitlements Viewer</h1>

      <div style={{ marginTop: 12 }}>
        <input
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          placeholder="Enter user ID (e.g. u1)"
          style={{
            border: "1px solid #ccc",
            padding: 8,
            marginRight: 8,
          }}
        />

        <button
          onClick={loadEntitlements}
          style={{
            border: "1px solid black",
            padding: "8px 12px",
          }}
        >
          Load
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <select
          value={productId}
          onChange={(e) =>
            setProductId(e.target.value)
          }
          style={{
            border: "1px solid #ccc",
            padding: 8,
            marginRight: 8,
          }}
        >
          <option value="digital">Digital</option>
          <option value="print">Print</option>
          <option value="premium">Premium</option>
        </select>

        <button
          onClick={subscribe}
          style={{
            border: "1px solid black",
            padding: "8px 12px",
          }}
        >
          Subscribe
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2>Entitlements</h2>

        {entitlements.length === 0 ? (
          <p>No entitlements loaded</p>
        ) : (
          <ul>
            {entitlements.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}