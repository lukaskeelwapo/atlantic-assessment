This is a minimal [Next.js](https://nextjs.org) project modeling how user subscriptions map to product access and derived entitlements.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Structure
We have 3 concepts - 

Entitlements - what a user can access
Product - a user subscribes to these to get particular entitlements
Regisrations - connect a user with their products. Tracks subscriptions.

The data flow is User Action → Registration → Product → Entitlements (derived)

## Structure
We have the following routes -

GET /api/products
GET /api/entitlements/:userId
GET /api/registrations?userId=...
POST /api/registrations
POST /api/registrations/:id/revoke

## Lifecycle
We track the lifecycle of a user's subcriptions through the grantedAt and expiresAt values of a registration.