"use client"

import { useState } from "react"

// This is where users can see their products, and subscribe or unsubscribe
export default function Home() {

  const [entitlements, setEntitlements] =
    useState<string[]>([])

  async function loadEntitlements() {
    const response = await fetch(
      "/api/entitlements/u1"
    )

    const data = await response.json()

    setEntitlements(data.entitlements)
  }

  return (
    <div>
      <button
        onClick={loadEntitlements}
        className="border px-4 py-2"
      >
        Load Entitlements
      </button>
      <ul className="mt-4">
        {entitlements.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
