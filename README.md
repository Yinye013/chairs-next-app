# TheChairShop

A chair e-commerce storefront built with Next.js 14 (App Router). Browse a catalog of chairs, add them to a persistent cart, create an account, and check out.

**Live demo:** _add deployed URL here_

## Features

- Product catalog with search and pagination ([`/bestsellers`](app/(platform)/(landing)/bestsellers/page.tsx))
- Cart with quantity management, persisted across sessions ([`app/store/store.ts`](app/store/store.ts))
- Email/password authentication (sign up, log in, log out) against a companion REST API
- Responsive marketing pages (home, about, contact) with scroll-triggered animations and Lottie illustrations
- Smooth scrolling via [Lenis](https://lenis.dev)

## Tech stack

| | |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router), React 18, TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com), [MUI](https://mui.com) |
| State | [Zustand](https://zustand-demo.pmnd.rs) |
| Data fetching | [TanStack Query](https://tanstack.com/query), [Axios](https://axios-http.com) |
| Animation | [Framer Motion](https://www.framer.com/motion), [Lottie](https://airbnb.io/lottie), [Lenis](https://lenis.dev) |
| Forms | [React Hook Form](https://react-hook-form.com) |

The backend is a separate Node/Express API (not part of this repo) that handles registration, login, and issues an access token.

## Getting started

### Prerequisites

- Node.js 18.18+ (App Router requirement)
- npm

### Setup

```bash
npm install
```

Create a `.env.local` in the project root with the URL of the auth API:

```bash
NEXT_PUBLIC_API_URL=https://your-api-host.example.com
```

The app calls `POST {NEXT_PUBLIC_API_URL}/auth/register` and `POST {NEXT_PUBLIC_API_URL}/auth/login`. Without this variable set, sign-up and login requests will fail.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run scan` | Type-check with `tsc --noEmit` |

## Project structure

```
app/
├── (platform)/            # Route group: shared navbar/footer layout
│   ├── (auth)/             # /login, /sign-up, /forgotpassword
│   ├── (landing)/          # /about, /bestsellers, /hit-us-up
│   └── _components/        # Navbar, Footer, ProductCard, etc.
├── cart/, checkout/        # Cart and checkout pages
├── components/             # Shared client components (toasts, Lottie, smooth scroll, ...)
├── hooks/                  # Auth, cart, and animation hooks
├── store/                  # Zustand stores (cart, products)
├── utils/                  # Product catalog data, API client
└── layout.tsx              # Root layout
```

Where possible, pages are server components; interactive pieces (forms, carousels, the cart) are isolated into `'use client'` components so only what needs JavaScript ships it.

## Deployment

Deploy on [Vercel](https://vercel.com/new) or any Node hosting that supports Next.js. Set `NEXT_PUBLIC_API_URL` in the deployment environment before building.
