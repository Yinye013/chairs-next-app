# CLAUDE.md

Guidance for working in this repo.

## What this is

`chairs-next-app` — a Next.js 14 (App Router) storefront for The Chair Shop.

- **Next 14.2** / React 18.3 / TypeScript
- **Tailwind** for styling, **MUI 6** only on the bestsellers controls
- **Zustand** for the cart, **react-query v4** for auth
- **Swiper 11** carousels, **framer-motion 10**, **Lenis** smooth scroll
- **Sanity** for the product catalog
- **Satoshi** self-hosted via `next/font/local` (`app/fonts/`)

## Commands

```bash
npm run dev              # dev server on :3000
npm run build            # production build (output: standalone)
npm run scan             # tsc --noEmit — the only checker; there are NO tests
npm run studio           # Sanity Studio locally
npm run studio:deploy    # deploy Studio to <project>.sanity.studio
npm run migrate:products # seed Sanity from the static array (--dry-run first)
```

There is **no test runner configured**. `npm run scan` plus a production build
is the full safety net, so run both before claiming something works.

## Where data comes from

Two backends, deliberately separate. Do not merge their clients.

| | Owns | Client |
|---|---|---|
| **Sanity** | Product catalog, images, marketing copy | `sanity/lib/client.ts` |
| **NestJS API** | Auth today; orders, payments, stock later | `app/utils/apiClient.ts` |

The join key between them is the product **`slug`**.

### Rules for Sanity reads

- **Every GROQ projection must alias `"id": slug.current`.** Sanity's `_id` is
  a UUID and must never reach a component — see the cart constraint below.
- All reads go through `sanityFetch()` in `sanity/lib/fetch.ts`, never
  `client.fetch` directly. Adding draft mode or webhook revalidation later is
  then a one-file change.
- Queries live in `sanity/lib/queries.ts`, not inline in components.
- Images render through `urlFor()` so the CDN resizes and serves WebP.

### ⚠️ The cart constraint

`useCartStore` (`app/store/store.ts`) hand-rolls `localStorage` persistence,
and a cart line's `id` is the **product slug** (`'classic-comfort'`), with
`imgPath` a resolved URL snapshot.

Changing either format orphans every existing visitor's cart — old rows keep
rendering but no longer match a product, so increment/remove silently break.
When touching products, carts, or the migration:

- Never rename an existing product slug.
- Never let `_id` substitute for `id`.
- Do not delete `public/assets/gridpics` or `public/assets/chairpics` — carts
  persisted before the Sanity migration still point at those local paths.

## Studio

Hosted **separately**, not embedded at `/studio`. Embedding conflicts with
`trailingSlash: true` in `next.config.js`, which Next 14 cannot override
per-route; dropping it would change every canonical URL on the site. Separate
hosting also keeps ~2MB of Studio JS out of the standalone build.

## Conventions

**Responsive.** Mobile-first. Base is `grid-cols-1` / `flex-col`; breakpoint
prefixes only add columns going up. Only `sm` / `md` / `lg` are used — no `xl`.
Every section is wrapped in `.container`.

**⚠️ `1rem` = 10px.** `html` is `font-size: 62.5%`, so `text-[1.6rem]` is 16px
*and Tailwind's own scale is affected too* — `w-4` is 10px, not 16px. Easy to
misjudge when eyeballing sizes.

**Media query hooks.** `app/hooks/useMediaQuery.ts` exports `useIsMobile` /
`useIsTablet` / `useIsDesktop`, built on `useSyncExternalStore` to avoid an SSR
hydration flash. Use them **only when markup or behaviour differs** — a
different component, a disabled listener. For pure styling, use Tailwind
classes; swapping them for JS costs a render and reintroduces the flash.

**Server vs client.** Default to Server Components. `'use client'` only where
there is state, an effect, or a browser API. MUI and Swiper force it.

**`useSearchParams` needs Suspense.** Next 14.2 opts a route out of static
prerendering unless it sits under a boundary — see `RouteLoadingBar`.

## Roadmap — backend

The NestJS API is auth-only today. Still to build there (not in Sanity, which
has no transactions and cannot hold secrets):

1. **Orders** — checkout currently clears the cart and toasts, persisting
   nothing. Needs `Order` + `OrderItem` with **price/title/image snapshots** so
   historical orders survive catalog edits.
2. **Payments** (Paystack) — secret keys server-side only; webhook must verify
   the HMAC signature against the **raw** body and be idempotent on retries.
3. **Server-side price authority** — `POST /orders` takes `{ slug, quantity }`
   and never a client-sent price; re-read the real price from Sanity.
4. **Stock** — decrement transactionally at purchase. Sanity's `stock` field is
   display-only.
5. **Reviews** gated on a delivered order (testimonials are hardcoded today).

Also outstanding on the frontend: `apiClient.ts` stores an auth token but
never attaches it to requests — there is no interceptor.
