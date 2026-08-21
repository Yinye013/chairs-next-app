# Handoff — chairs-next-app

Context for picking this work up in a new session.

## Repo state

- **Path:** `/Users/Yinye/Documents/React/chairs-next-app`
- **Branch:** `master`, clean and in sync with origin. Latest: `8790abc`
- **Live:** https://the-chair-hub.vercel.app (deployed from `master`)
- **Studio (local):** `npm run studio` → `localhost:3333`. Not yet deployed to `*.sanity.studio`

## Commands

```bash
npm run dev              # dev server
npm run build            # production build
npm run start            # serve the production build
npm run scan             # tsc --noEmit — the ONLY checker; there are NO tests
npm run studio           # Sanity Studio locally
npm run studio:deploy    # publish Studio (needs `npx sanity login` first)
npm run migrate:products # re-seed Sanity from the static array (--dry-run first)
```

⚠️ **Verify smooth scroll and other client effects against `npm run build && npm run start`, never `npm run dev`.** Strict Mode double-invokes effects in dev and tears down the Lenis instance, which cost hours of false debugging.

---

## 1. Accessibility — DONE (92 → expect 100)

Both Lighthouse failures are fixed and pushed in `8790abc`. Both came from the testimonials rebuild.

| Failure | Fix |
|---|---|
| Prohibited ARIA attribute — `aria-label` on a bare `<div>` (a div has no implicit role, so screen readers ignore the label) | Added `role="img"` so the star row announces as one labelled image |
| Contrast 4.47:1, under the 4.5:1 AA minimum | `text-[#777]` → `text-[#6b6b6b]` (~5.3:1) in `Testimonials.tsx` ×2 and the bestsellers empty state |

Verified in built HTML: 6 star rows carry `role="img"` with their label; zero `#777` remain.

## 2. Performance — 66 → 80

Measured on an incognito production run. **Trust incognito numbers only** —
headless/background-loaded runs scored 26 on the same build.

| Metric | Before | Now | Subscore |
|---|---|---|---|
| FCP | — | **0.4 s** | +10 |
| **LCP** | typewriter `<h1>`, unresolved until typed | **0.7 s** | +25 |
| **CLS** | **0.193** | **0.005** | +25 |
| Speed Index | — | 1.5 s | +8 |
| **TBT** | — | **410 ms** | **+12 only** |

Accessibility 100 · Best Practices 100 · SEO 100.

The LCP and CLS wins came from the hero fix (#1) and the bundle work (#2, #3)
below. **TBT is now the only weak subscore** and effectively all of the
remaining 20 points.

### Ranked opportunities

1. ~~**Hero LCP/CLS**~~ — **DONE.** First phrase renders server-side (full
   heading is in `.next/server/app/index.html`, so LCP no longer waits on
   hydration or typing); an invisible copy of the longest phrase reserves the
   inline box. Measured: the `<h1>` holds a single box size across many
   type/delete cycles, desktop and mobile. CLS 0.193 → 0.005.

   The first attempt (`fdd07a6`) was reverted because the spacer carried
   `aria-hidden` but no `invisible` — `aria-hidden` only hides from screen
   readers, so it painted the phrase in the heading's default grey underneath
   the green typewriter. Adding Tailwind's `invisible` (`visibility: hidden`,
   which still reserves width) was the whole fix.

2. ~~**Lottie off the critical path**~~ — **DONE.** See the section below.

3. ~~**MUI**~~ — **DONE.** `@mui/material` and both `@emotion` packages are out
   of `package.json`; `BestsellersControls.tsx` uses plain inputs + Tailwind.
   Verified: no MUI in any built page.

4. ~~**`browserslist`**~~ — **ADDED, but it does not fix the 11 KiB item.**
   `package.json` now pins `>0.3%, last 2 versions, not dead, not op_mini all`
   (resolves to Chrome 109+, Firefox 121+, iOS Safari 16.6+, Edge 149+).

   ⚠️ **Measured effect: ~1.5 KB across the whole build** (2,225,120 →
   2,223,655 bytes), and the polyfill chunk is byte-identical either way.
   Lighthouse's "Legacy JavaScript — 11 KiB" refers to
   `polyfills-*.js`, which Next emits with a **`noModule`** attribute — it runs
   only in browsers without ES-module support (pre-2018) and is never
   downloaded or executed by a modern browser. It is a fixed Next.js bundle and
   `browserslist` does not control it. **This audit cannot be cleared from
   userland; do not spend more time on it.** The config is kept as a small real
   saving and as documentation of the support floor.

5. **`priority` on the above-fold image / font `preload`** — now **low value**.
   FCP 0.4 s and LCP 0.7 s are already strong; there is little left to win here.

### What is actually left: TBT (410 ms)

All four diagnostics point at the same main-thread problem, and it is the same
root cause as the desktop scroll lag below — Lenis needs a free main thread
60×/s, and long tasks starve it. **Fixing TBT fixes both.**

- Minimize main-thread work — 3.0 s
- Avoid long main-thread tasks — 10 found
- Reduce unused JavaScript — ~50 KiB (check the Lighthouse treemap before
  guessing; likely Swiper / framer-motion surface area)
- Avoid non-composited animations — 2 elements animating properties that force
  layout instead of running on the compositor
- Forced reflow — likely `useMultipleAnimations` reading `getBoundingClientRect`
  during scroll (the same hook flagged in §6 for blanking sections)

### Mobile scrolls fine, desktop feels laggy — why

Observed on the deployed app: scrolling is smooth on phone, still janky on desktop.

`SmoothScrollProvider` passes `smoothWheel: true` and leaves `smoothTouch` at its
Lenis v1 default of **`false`**. So on mobile Lenis is mounted but never touches
the scroll — that is pure native momentum, which is why it feels perfect. Leave
it that way; the Lenis docs advise against `smoothTouch` because it fights the
OS. On desktop Lenis hijacks the wheel and interpolates every frame.

**The lag is not Lenis's fault — Lenis just exposes it.** `lerp` runs on every
frame and needs a free main thread 60×/s, so the 16.2s of script evaluation
above shows up as stutter. Native mobile scroll runs on the compositor and keeps
moving through busy JS, hiding the same jank. Same problem, two scroll engines.

Suspects, in order: the script-evaluation total; the hero `<Typewriter>`
re-rendering and shifting layout; lottie-react running its own RAF loop
alongside Lenis; `useMultipleAnimations` scroll/IO handlers across `About`,
`Features`, `CareTips`, `StoryTeaser`.

**Tuning `lerp` will not fix this** — a higher value only feels snappier while
the dropped frames remain. The fix is the ranked work above.

Realistic target is **~90**, not 100 — Swiper, framer-motion, Lenis and react-query all ship to the client by design.

### Carousels — arrows removed, configs unified

All three carousels (`Features` "As Featured In", `FeaturedChairsCarousel`,
`Testimonials`) now share the same behavioural config: `loop`, always-on
autoplay, `speed: 2000`, whole-number `slidesPerView`, and no touch overrides.

**Why this matters, not just cosmetics.** Removing the nav arrows initially
broke touch on mobile. The two product carousels had
`autoplay={isMobile ? false : ...}`, so on a phone they were left with *no*
autoplay and *no* arrows — only free dragging, with fractional
`slidesPerView: 1.15` plus `slidesOffsetBefore/After`, which produce **no
uniform snap grid**. A swipe coasted on momentum and settled mid-slide.
"As Featured In" was never affected because it has `loop: true` and autoplay
always on.

Matching its config gives all three a uniform snap grid — verified in a
production build: featured-chairs and testimonials both `0, 420, 839, 1259`,
as-featured-in `0, 287, 573, 860`, all resting on a snap point.

Both product carousels also dropped `useIsMobile` entirely (it became unused).

⚠️ **Gutter.** Both sit in a full-bleed `-ml-[50vw] w-screen` wrapper that
escapes `.container`'s 3.2rem padding; `slidesOffsetBefore/After={32}` used to
put it back. They now carry `!px-[3.2rem]` on the Swiper instead — padding, not
margin, since margin would narrow the track and clip slides mid-transition.

Two known, **pre-existing** desktop quirks, unchanged by this work: above
1200px the heading is inset further than the slides (`.container` is
`max-w-[120rem]` and centred, the full-bleed track is not), and the track starts
~6px left of the viewport because `100vw` includes the scrollbar — the same
cause as the 6px horizontal overflow on mobile.

### Lottie deferral — DONE (was wrongly recorded as reverted)

The 4 animation JSONs live in `public/animations/` and `ClientLottie.tsx` fetches
them at runtime. Verified on a production build: homepage 24 → 22 scripts, the
lottie chunks referenced by no prerendered page (loaded only when `ClientLottie`
mounts), and both `/about/` animations render.

The earlier "no `useEffect` fires" symptom was a visibility gate racing
`FadeInSection`, which holds its subtree at `opacity: 0` until scrolled into
view — an observer there waits on an element that never becomes visible. The
current component deliberately does **not** gate on visibility; see the comment
at the top of `ClientLottie.tsx`.

---

## 3. Sanity CMS — DONE and working

**Project ID `73w2jeo6`, dataset `production`.** 18 products migrated with images.

### Architecture

| System | Owns |
|---|---|
| **Sanity** | Product catalog, images, marketing copy |
| **NestJS API** (`NEXT_PUBLIC_API_URL`) | Auth today; orders/payments/stock later |

**Join key is the product `slug`.** Clients are deliberately separate — do not merge `sanity/lib/client.ts` with `app/utils/apiClient.ts`.

### Key files

```
sanity/env.ts              # reads NEXT_PUBLIC_* and falls back to SANITY_STUDIO_*
sanity/lib/client.ts       # read client, useCdn, published perspective
sanity/lib/fetch.ts        # sanityFetch() — ALL reads go through this
sanity/lib/queries.ts      # all GROQ
sanity/lib/image.ts        # urlFor()
sanity/schemaTypes/        # product + category
sanity.config.ts           # Studio app config
sanity.cli.ts              # CLI config (project id inline — see note)
app/services/products.ts   # getProducts / getFeaturedProducts / getProductBySlug
scripts/migrate-products.ts
```

### Rules

- **Every GROQ projection must alias `"id": slug.current`.** Sanity's `_id` is a UUID; the cart persists `id` in `localStorage`, so leaking a UUID orphans every existing cart.
- Never rename an existing product slug (same reason). Slugs were migrated verbatim, including the awkward `chair-4-2`.
- **Do not delete `public/assets/gridpics` or `chairpics`** — carts saved before the migration still reference those local paths.
- All reads route through `sanityFetch()`, so adding draft mode or webhook revalidation is a one-file change.

### Two env prefixes

Next inlines `NEXT_PUBLIC_*`; the Sanity CLI only reads `SANITY_STUDIO_*`. `.env.local` carries both. `sanity.cli.ts` hardcodes the project id because the CLI reads that file *before* loading any `.env` — both values are public (the id ships in the client bundle and appears in every CDN image URL).

### Content workflow in production

1. Edit in Studio (local, or deployed) → **Publish**
2. Appears on the live site within **~60s** (`revalidate: 60` in `sanity/lib/fetch.ts`)
3. No rebuild, no redeploy

For instant publishing, add a Sanity webhook → `/api/revalidate` route. The seam exists: `sanityFetch` already tags reads with `['product']`.

### Studio deploy (outstanding)

`npm run studio:deploy` fails with "You must login first". Run `npx sanity login` **in your own terminal** (needs a real TTY). Note `@sanity/cli` ships without `vendor/macos/term-size` on this machine, which garbles interactive prompts — `npx sanity login --provider google` skips the menu. Deploying Studio is optional; local Studio already works.

---

## 4. Backend features to build (NestJS, `the-chairs-hub-api`)

The API is **auth-only** today (`/auth/register`, `/auth/login`). Sanity cannot own any of the below — it has no transactions and cannot hold secrets.

### Priority order

1. **Orders.** Checkout currently clears the cart and toasts, persisting nothing. Needs `Order` + `OrderItem` with **price/title/image snapshots**, so historical orders survive catalog edits. Endpoints: `POST /orders` (takes `{ slug, quantity }[]`, **no prices**), `GET /orders`, `GET /orders/:id` (403 if not the owner).

2. **Server-side price authority.** `POST /orders` must never trust a client-sent price. Re-fetch authoritative prices from Sanity server-side via GROQ before charging.

3. **Payments (Paystack — prices are in NGN).** Secret keys server-side only. The webhook must verify the `x-paystack-signature` HMAC against the **raw** body (NestJS parses JSON by default — configure a raw-body parser for that route), be **idempotent** on retries, and re-verify the amount. Only the webhook may mark an order paid.

4. **Stock.** Decrement transactionally inside the same DB transaction that marks the order paid (`WHERE stock >= quantity` or `SELECT … FOR UPDATE`). Sanity's `stock` field is display-only — it has no row locking, so two people can buy the last chair.

5. **Reviews** gated on a delivered order containing that `productSlug` (testimonials are hardcoded today).

6. Optional: server-side cart for cross-device sync (currently `localStorage`).

### Frontend gap

`app/utils/apiClient.ts` stores an auth token but **never attaches it to requests** — there is no interceptor. Confirm the expected header format and whether a refresh-on-401 flow exists.

---

## 5. Where the owner tracks orders (research — nothing built yet)

**Sanity Studio is the catalog editor, not the admin panel.** `sanity/schemaTypes/`
holds only `product` and `category`. There is no order document, and checkout
persists nothing — it clears the cart and toasts. Today the owner cannot see a
single order anywhere.

Studio answers *"what do we sell?"*. Nothing yet answers *"what did people buy?"*

### Why orders must not live in Sanity

- **No transactions.** Two buyers take the last chair and both succeed. Stock
  decrement needs row locking (`SELECT … FOR UPDATE`); Sanity has none.
- **No secrets.** Paystack secret keys and webhook HMAC verification cannot sit
  in a CMS.
- **Write tokens are dangerous.** Writing orders to Sanity needs a token with
  write access to the whole catalog. A leak edits products, not just orders.
- **Wrong consistency model.** Sanity is CDN-cached with a 60s revalidate
  window (`sanity/lib/fetch.ts`). Orders must be immediately consistent and
  queried relationally — by user, status, date range.
- **Price history breaks.** Orders need price/title/image *snapshots*. An order
  that merely *references* a product silently changes meaning on catalog edit.

### Options for the admin surface

| # | Option | Verdict |
|---|---|---|
| 1 | **`/admin/orders` in this Next app**, backed by NestJS, role-gated on an `admin` JWT claim | **Recommended.** Reuses existing auth, styling, deploy. Blocked on the `apiClient.ts` interceptor gap (§4). |
| 2 | **Paystack dashboard** as a stopgap | Free, useful day one. Set transaction `metadata` (order id, line items) so it shows there. But it is a payments log — cannot show unpaid/unfulfilled orders or mark anything shipped. |
| 3 | **Mirror read-only order summaries into Sanity** after the webhook confirms payment, so Studio gets one "Recent Orders" screen | Nice-to-have, not step one. Adds a write token, a sync failure mode, duplicated state. Only worth it if a single login genuinely matters to the owner. Postgres stays source of truth. |

### What order tracking actually requires

Independent of where the UI lives:

- **Status field**: `pending → paid → fulfilled → shipped → delivered`, plus
  `cancelled` / `refunded`. **Only the Paystack webhook may set `paid`**; the
  owner sets the rest manually from the admin UI.
- **Snapshots on `OrderItem`** (price, title, image, slug) so a past order still
  renders correctly after a catalog edit.
- **Customer contact + delivery address**, captured at checkout. Not collected
  today.
- **Transactional email** on order placed and on status change.

Two audiences read the same table: the **owner** needs a list view with status
controls; the **customer** needs `/account/orders` plus those emails. "Order
tracking" usually means the second one.

### Sequencing

Nothing here requires a Sanity change.

1. Fix the `apiClient.ts` interceptor — everything else is blocked on it (§4).
2. `Order` + `OrderItem` in NestJS with snapshots and status; wire real checkout.
3. Paystack + verified webhook. Owner uses the Paystack dashboard in the interim.
4. `/admin/orders` in this app, role-gated.
5. Customer-facing `/account/orders` and emails.
6. Optional: the Sanity mirror, only if one login turns out to matter.

---

## 6. Other outstanding items

- **Vercel Node.js version → 24.x** (Settings → Build and Deployment). Node 20 is deprecated; builds fail after 2026-10-01. Verified safe: built on 24.19.0 with byte-identical output. `.nvmrc` (24) and `engines: >=20.9.0` are committed.
- `useMultipleAnimations` sets `opacity: 0` whenever a section leaves the viewport, and callers pass no `threshold`/`triggerOnce` — sections can render blank. Removed from Testimonials, still used by `About`, `Features`, `CareTips`, `StoryTeaser`.
- `productsArr` remains in `app/utils/testFile.ts` as a rollback path and as the migration script's source. Safe to delete once confident.
- `.gridding` in `globals.css` is dead CSS.
- **Browser caveat:** `backdrop-filter: url()` with SVG filters (the liquid-glass navbar) works in Chrome/Edge only. Firefox and Safari degrade to blur + saturate — still glass, no refraction.
