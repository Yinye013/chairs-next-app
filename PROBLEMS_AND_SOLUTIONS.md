# Problems & Solutions

Bugs hit in this codebase, what actually caused them, and what fixed them.
Written down because several were **misdiagnosed first** — the wrong cause is
recorded alongside the right one, since recognising the wrong turn is usually
what saves the time.

---

## 1. Hero heading: bad LCP and 0.193 CLS

| | |
|---|---|
| **Symptom** | Lighthouse LCP slow; CLS 0.193, mostly `<main class="container">` shifting. |
| **Cause** | The `<h1>` contained `<Typewriter>`, which renders **empty** on the server and fills a character at a time after hydration. LCP could not resolve until enough text was typed, and every keystroke reflowed the centred heading. |
| **Fix** | Render the first phrase as real server-side text, hand over to the typewriter on mount. Reserve the inline box with an invisible copy of the longest phrase so width never changes. |
| **Result** | CLS 0.193 → 0.005. LCP 0.7s. The `<h1>` holds one box size across many type/delete cycles. |

### The trap: `aria-hidden` does not hide anything visually

The first attempt (`fdd07a6`) was **reverted** because the spacer looked broken:

```jsx
<span aria-hidden className="hidden md:inline">{LONGEST_WORD}</span>
```

`aria-hidden` only hides from **screen readers**. The element still painted —
rendering "everyday functionality." in the heading's default grey underneath the
green typewriter. Two texts stacked.

Adding Tailwind's `invisible` (`visibility: hidden`, which still reserves width)
was the entire fix. `display: none` would **not** work: it removes the box, and
the box is the point.

---

## 2. 160KB of Sanity preview tooling in the browser bundle

| | |
|---|---|
| **Symptom** | Homepage First Load JS 227 kB. A 168K chunk of Sanity code shipping to every visitor. |
| **Cause** | `sanity/lib/client.ts` imported `createClient` from **`next-sanity`**, which re-exports it wrapped in the live-preview stack (`@sanity/preview-kit`, `channels`, `comlink`, stega encoding). None of it is used — there is no draft mode here. |
| **Fix** | Import `createClient` from `@sanity/client` (already a direct dependency) and `groq` from the standalone `groq` package. Same client, same options, none of the payload. |
| **Result** | Homepage 227 → **170 kB**. Bestsellers 170 → **111 kB**. |

### The trap: the obvious suspect was wrong

The first theory was that `urlFor` in the client carousel dragged Sanity in, so
URL resolution was moved server-side. **That was wrong** — `/bestsellers` also
uses `urlFor` and never loaded the chunk.

What actually settled it was **building with `<FeaturedChairs />` commented out**
and watching the chunk disappear. Bisecting beat reasoning here.

The server-side URL resolution was kept anyway: passing a resolved string
instead of a Sanity `Image` object is a better client boundary. But it was not
the fix.

---

## 3. Stale build output — "the fix isn't working"

| | |
|---|---|
| **Symptom** | Carousel nav arrows removed from source, `npm run build` run, but the served HTML still contained `swiper-button-next`. |
| **Cause** | Two separate things stacked: (1) a **`next-server` process** kept serving an old build because `pkill -f "next start"` never matched it — the process is named `next-server`, not `next start`; (2) a stale **`node_modules/.cache`** made webpack reuse pre-edit output. |
| **Fix** | `rm -rf .next node_modules/.cache`, kill the server by **port PID**, rebuild. |
| **Lesson** | When a verified source change does not appear in output, suspect the toolchain before re-reading the code. `grep -c` counts *lines*, not occurrences — on minified single-line HTML it always returns 1. |

---

## 4. Killing the developer's dev server

| | |
|---|---|
| **Symptom** | The dev server on :3000 terminated mid-session with no error. |
| **Cause** | `pkill -9 -f "next-server\|next start"`, intended for a test server, matched it. `next dev` and `next start` produce processes with the **same name** (`next-server (vX.Y.Z)`) — no name-based pattern can tell them apart. |
| **Fix** | Test builds run on a separate port and are killed by that port's PID only: `PORT=3100 npm run start`, then `kill $(lsof -ti :3100 -sTCP:LISTEN)`. |
| **Related** | `npm run build` wipes `.next`, which a running dev server also reads — every build forces a slow cold recompile (observed: 70s) on its next request. Prefer `npm run scan`. |

Recorded as a standing rule in [CLAUDE.md](CLAUDE.md).

---

## 5. Carousels flinging freely on mobile

| | |
|---|---|
| **Symptom** | After nav arrows were removed, Featured Chairs and Testimonials scrolled "in a crazy fashion" on touch. "As Featured In" was fine. |
| **Cause** | Both had `autoplay={isMobile ? false : {...}}`, so on a phone they had **no autoplay and no arrows** — only free dragging. With fractional `slidesPerView: 1.15` plus `slidesOffsetBefore/After`, there was **no uniform snap grid** to land on, so a fling coasted and stopped mid-slide. "As Featured In" was unaffected because it has `loop: true` and autoplay always on. |
| **Fix** | Match the working carousel: `loop`, always-on autoplay, `speed: 2000`, whole-number `slidesPerView`, no touch overrides. |
| **Result** | Uniform snap grids on all three — featured/testimonials `0, 420, 839, 1259`; as-featured-in `0, 287, 573, 860` — each resting on a snap point. |

### The trap: testing touch with a mouse

An earlier attempt added `touchAngle`, `longSwipesRatio`, `threshold` and other
touch props. Those were guesses, because the "mobile" test was a **resized
window**, which reports `maxTouchPoints: 0` — Swiper was still receiving mouse
events. Real touch behaviour needs DevTools device mode.

### Follow-on: the gutter disappeared

Matching the working config meant dropping `slidesOffsetBefore/After={32}`,
which had been substituting for `.container`'s padding — the carousels sit in a
full-bleed `-ml-[50vw] w-screen` wrapper that deliberately escapes it. Cards then
ran edge to edge.

Fixed with `!px-[3.2rem]` on the Swiper. **Padding, not margin**: margin narrows
the track itself and clips slides mid-transition.

---

## 6. Sections rendering blank

| | |
|---|---|
| **Symptom** | `About`, `Features`, `CareTips`, `StoryTeaser` sometimes showed as empty space. |
| **Cause** | `useMultipleAnimations` set `opacity: 0` whenever a section left the viewport, and callers passed no `triggerOnce` — so the observer fired on **every** crossing. Fast scrolling could leave a section stuck invisible. |
| **Fix** | `triggerOnce: true` on the `useInView` calls; later, the hook was deleted entirely when `FadeInSection` moved to CSS transitions. |
| **Bonus** | Re-running a framer-motion animation on every scroll crossing was also main-thread work and forced reflow — both Lighthouse items. |

---

## 7. Navbar sheen repainting forever

| | |
|---|---|
| **Symptom** | Lighthouse: "non-composited animations, 2 elements". Desktop scroll felt laggy. |
| **Cause** | `.nav-glass::before` ran `animation: nav-sheen 9s infinite` on **`background-position`**, which cannot be composited. The fixed navbar repainted every frame for as long as the page was open. |
| **Fix** | Animate `transform: translate3d` on a 250%-wide pseudo-element inside `overflow: hidden`. Visually identical, runs on the GPU. Added a `prefers-reduced-motion` guard. |

---

## 8. The route loading bar was decorative

| | |
|---|---|
| **Symptom** | Toploader "looks, feels and acts really buggy". Clicking a nav link left the page frozen with no indicator at all. |
| **Cause** | Three separate defects. |

**(a) Wrong timing window.** The effect depended on `[pathname, searchParams]`,
which only change **after** navigation commits — so the bar animated for a page
that had already arrived, then held for a hardcoded 800ms. The real wait had no
indicator. It also fired on first mount, flashing on every fresh page load.

**Fix:** start on link click via a **capture-phase** listener on `document`
(capture runs before `<Link>`'s own bubble-phase handler, so it fires before the
router begins), clear when the committed URL changes. Plus `popstate` for
back/forward and a 10s safety valve.

**(b) Progress froze.** The old loop added `Math.random() * 10 + 5` every 50ms —
about 200%/second against a 90% cap. It hit the ceiling in under half a second
and then **stopped moving**, which is most of what read as "buggy".

**Fix:** a decelerating curve on `requestAnimationFrame`, asymptotic to 90%.

**(c) It was 10px tall and animated `width`.** `h-2` is 10px here (see the rem
note below), and animating `width` forces layout every tick.

**Fix:** `h-[0.3rem]` and `transform: scaleX()` with `origin-left`.

**Known limitation:** this only observes link clicks and back/forward. Next 14's
App Router exposes no router events, so a programmatic `router.push()` is not
covered — the bestsellers pagination uses `router.replace()` and relies on
`isPending` dimming instead.

---

## 9. Mobile menu had no close animation

| | |
|---|---|
| **Symptom** | The menu animated open but snapped shut. |
| **Cause** | `{open && createPortal(...)}` — when `open` flipped false React removed the node **in the same commit**. Nothing was left to animate. The entry keyframes only described arrival. |
| **Fix** | Split intent from presence: `open` drives intent, `mounted` drives DOM presence. Closing flips `open` false but keeps `mounted` true for 220ms so exit keyframes (`menu-fade-out`, `menu-sink`) can play, then unmounts. |

Two details that are easy to miss:

- The item **stagger is cancelled on exit** (`animation-delay: 0ms !important`).
  A reverse stagger makes dismissal feel sluggish.
- The body scroll lock keys off `mounted`, not `open` — releasing it when `open`
  flips snaps the scrollbar back while the overlay is still fading.

`MENU_EXIT_MS` in the component must stay in sync with the CSS durations.

---

## 10. Soft 404s on the product detail route

| | |
|---|---|
| **Symptom** | `/bestsellers/not-a-real-chair/` returned **HTTP 200** with 404 content. Google indexes those as live pages. |
| **Cause** | With the default `dynamicParams: true`, `notFound()` inside a prerendered route still serves 200. |
| **Fix** | `export const dynamicParams = false;` |
| **Tradeoff** | A product published in Sanity after the last build now 404s until the next deploy, instead of rendering on demand. This **conflicts with the "publish → live in ~60s" CMS workflow** and is worth revisiting if the catalog starts changing often. |

---

## 11. Cart: N toasts for one action

| | |
|---|---|
| **Symptom** | Adding 3 units from the detail page fired 3 toasts. |
| **Cause** | `store.addItem` toasts internally and had no bulk form, so the button looped it. |
| **Fix** | `addItem(product, quantity?)` — one state write, one localStorage write, one toast, with quantity-aware wording. Guarded with `Math.max(1, Math.floor(quantity))` so a zero, negative or fractional value can never reach localStorage. |
| **Compatibility** | The argument is optional, so `ProductCard`'s existing single-item call is unchanged. |

---

## 12. Buttons nested inside links

| | |
|---|---|
| **Symptom** | Making product cards clickable. |
| **Cause (avoided)** | Wrapping the whole card in `<Link>` would nest the "Add to cart" `<button>` inside an `<a>` — invalid HTML that breaks keyboard activation. |
| **Fix** | Link the image and title only; the button stays outside. |
| **Also** | Card headings changed `<h1>` → `<h2>`. The listing page already has an `h1`; six more in a grid is an accessibility regression. |

---

## Recurring lessons

**`1rem` = 10px here.** `html` is `font-size: 62.5%`, which rescales **Tailwind's
own scale too** — `h-2` is 10px, `w-4` is 10px. This directly caused the
oversized loading bar.

**Verify against a production build, not `next dev`.** Strict Mode double-invokes
effects and tore down the Lenis instance, costing hours of false debugging.

**Distrust the measurement before the code.** A Lighthouse run scoring 50 was
localhost serving 10 MB of unoptimized images on a cold cache — not a
regression. `public/assets/chairpics` alone is 168 MB.

**Lighthouse's savings estimates can be unactionable.** "Legacy JavaScript —
11 KiB" refers to `polyfills-*.js`, which Next emits with a **`noModule`**
attribute: no modern browser downloads or runs it. Adding `browserslist` saved
~1.5 KB, not 11 KiB, and the polyfill chunk was byte-identical. Some audits
cannot be cleared from userland.

**Bisect instead of reasoning when output contradicts source.** Commenting a
component out and rebuilding found the Sanity leak in one step after theory had
pointed at the wrong file.
