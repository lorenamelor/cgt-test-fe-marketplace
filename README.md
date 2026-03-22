# Marketplace MVP

**Front-end** storefront MVP for a **3D marketplace–style** experience: browse products, manage a cart, and complete a **checkout-style** journey. Scope stays intentionally tight—credible UI/UX, client state, tests, and documented engineering choices—without a real payments backend or catalog service.

**APIs are mocked** with [MSW](https://mswjs.io/) in local development and in the test suite, so the project runs end-to-end with no live server. The same handlers keep dev and tests aligned on the HTTP contract.

**Capabilities:** **Home** (discovery and filters) → **Product** detail → **Cart** (multiple line items, quantity updates, remove) → **Checkout** and order **Complete**, with **consistent totals** from cart through summary.

---

## Table of contents

- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Tech stack & engineering decisions](#tech-stack--engineering-decisions)
- [Features implemented](#features-implemented)
- [Architecture & folder structure](#architecture--folder-structure)
- [Performance](#performance)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Design process & UI direction](#design-process--ui-direction)
- [Testing strategy](#testing-strategy)
- [Original brief](#original-brief)
- [Architecture Decision Records](#architecture-decision-records)
- [Create React App](#create-react-app)

---

## Getting started

**Requirements:** Node.js LTS and npm.

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Product APIs are mocked in development via **MSW** (see `src/mocks` and [`handlers.ts`](src/mocks/handlers.ts)).

**Production build**

```bash
npm run build
```

Output is written to `build/`.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server with fast refresh |
| `npm test` | Jest + Testing Library (interactive watch by default) |
| `npm run build` | Optimized production bundle |
| `npm run lint` | ESLint on `src/**/*.{js,jsx,ts,tsx}` |
| `npm run format` | Prettier write for common source formats |

---

## Tech stack & engineering decisions

<p align="left">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="React Query" src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38B2AC" />
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-443C4D?style=for-the-badge&logo=zustand&logoColor=white" />
  <br />
  <img alt="ESLint" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
  <img alt="Prettier" src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
  <img alt="Webpack" src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=white" />
  <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
</p>

Below, each choice is framed as **what problem it solves**, **what I picked**, and **what I consciously gave up**—the same structure as the ADRs, in condensed form. For full context and alternatives, follow the ADR links.

### TypeScript

- **Problem:** Cart lines, product IDs, and API DTOs are easy to get wrong with plain JavaScript; refactors break silently and tests become the only safety net.
- **Decision:** TypeScript across `src/` so shapes are explicit at boundaries (store, services, components).
- **Trade-off:** Slightly more ceremony than JS; worth it when the brief asks for refactors and new features on an existing codebase.

### TanStack React Query

- **Problem:** Product lists and detail views need loading/error/success states, cache coherence, and no duplicate in-flight requests when the same data is needed in multiple places.
- **Decision:** React Query with a shared `QueryClient` and stable query keys (`src/config/query/`).
- **Trade-off:** Another concept in the stack vs. raw `useEffect` + `fetch`; the library encodes patterns (stale times, retries) that would otherwise scatter across components.

### React Router v6

- **Problem:** A marketplace needs shareable URLs (`/products/:id`), predictable back/forward behavior, and layout composition (header + outlet).
- **Decision:** Declarative routes in `App.tsx` with a layout route for the shell.
- **Trade-off:** SPA routing still means no SSR out of the box—documented under [SEO](#seo).

### Zustand + `persist` (cart)

- **Problem:** Cart state is shared (header badge, cart page, product/checkout) and must survive refresh without hand-written `localStorage` sync that can drift from in-memory state.
- **Decision:** Single store with selectors for fine-grained subscriptions; **`persist`** middleware with `partialize` so only `items` hit storage (key `90s-shop:cart`).
- **Trade-off:** Extra dependency vs. Context + `useReducer`; selective subscriptions and official persistence won. **Full write-up:** [ADR 0001: Zustand cart store](docs/adr/0001-zustand-cart-store.md).

### Tailwind CSS

- **Problem:** Inconsistent spacing/colors and global CSS side effects slow UI iteration; the brief explicitly calls for improved layout and styles at scale.
- **Decision:** Tokens in `tailwind.config`, utilities in JSX, repeated patterns extracted into components (`Button`, `Card`, `ProductCard`). `clsx` + `tailwind-merge` avoid conflicting class strings.
- **Trade-off:** Verbose class lists in JSX vs. SCSS modules—mitigated by components. **Full write-up:** [ADR 0002: Tailwind as primary styling](docs/adr/0002-tailwind-css.md).

### Axios + MSW

- **Problem:** HTTP calls need one place for base URL/headers later; tests must not hit the real network.
- **Decision:** Axios-based service layer; MSW intercepts the same API surface in dev and Jest (`jest` `transformIgnorePatterns` adjusted for ESM deps).
- **Trade-off:** `fetch` is “free”; Axios + MSW is a deliberate choice for testability and future interceptors.

### Create React App (Webpack under the hood)

- **Problem:** The exercise started from CRA; ejecting would add maintenance noise without being asked.
- **Decision:** Stay on `react-scripts` and use what it provides (hashed assets, production minification) while optimizing inside the app (lazy routes, memoization, images).
- **Trade-off:** Less control than Vite/turbopack; acceptable for a time-boxed assessment.

### ESLint + Prettier

- **Problem:** Mixed formatting and noisy diffs in PRs.
- **Decision:** `eslint-config-prettier` / `eslint-plugin-prettier` so lint and format don’t fight.

**Also in use (no badge):** [react-helmet-async](https://github.com/staylor/react-helmet-async) (document head per route), [Testing Library](https://testing-library.com/) + Jest, [web-vitals](https://web.dev/vitals/). **Icons:** inline SVG instead of an icon font—smaller, tree-shakeable surface.

---

## Features implemented

- **Navigation:** Home, product detail, cart, checkout, and order-complete views; shared layout with live cart count.
- **Cart MVP:** Add from listing/detail, change quantity, remove lines; persistence via Zustand **`persist`** → **`localStorage`**. See [ADR 0001](docs/adr/0001-zustand-cart-store.md).
- **Totals:** Single derived source for line totals and order summary (store + formatting helpers).
- **UX:** Lazy-route and data loading states; empty cart state; focus rings on interactive elements ([ADR 0002](docs/adr/0002-tailwind-css.md) for design-system-style components).

---

## Architecture & folder structure

- **`src/pages`:** Route-level composition (thin); wires features and shared layout.
- **`src/features`:** Vertical slices (home, product, cart, checkout) with colocated UI.
- **`src/shared`:** Design-system-style components, hooks, services, stores used across features.

**Cross-cutting decisions**

| Topic | Decision | ADR |
|--------|-----------|-----|
| Where new JS downloads on first visit | Home **eager**; product, cart, checkout, complete **lazy** | [ADR 0003](docs/adr/0003-route-lazy-loading.md) |
| Cart state & persistence | Zustand store + `persist` | [ADR 0001](docs/adr/0001-zustand-cart-store.md) |
| Styling system | Tailwind + reusable components | [ADR 0002](docs/adr/0002-tailwind-css.md) |
| List/image/render baseline | Memo + lazy images + Web Vitals hook | [ADR 0004](docs/adr/0004-frontend-performance-baseline.md) |

**Error boundary** wraps the tree below `QueryClientProvider` so React errors don’t blank the whole app; the boundary is written so a production **error reporting** integration (e.g. Sentry) is a small additive change, not a rewrite.

---

> **Delivery focus:** The next three sections—**[Performance](#performance)**, **[SEO](#seo)**, and **[Accessibility](#accessibility)**—are deliberate highlights: each maps to concrete implementation choices (and ADRs where applicable), not polish added at the last minute.

## Performance

**Goal:** Respect Core Web Vitals thinking on a CRA SPA: less JS on the critical path, stable lists, and sane image loading.

| Lever | What we did | Why it matters | ADR |
|--------|-------------|----------------|-----|
| **Initial JS** | Route-level `React.lazy`; Home stays eager | Smaller parse/compile on first load; landing stays snappy | [ADR 0003](docs/adr/0003-route-lazy-loading.md) |
| **Re-renders** | `React.memo` on `ProductCard`, `CartItem` when props are stable | Fewer wasted renders in grids and cart lists | [ADR 0004](docs/adr/0004-frontend-performance-baseline.md) |
| **Images** | `loading="lazy"` off critical path; main product image eager | Protects **LCP** on PDP while saving bandwidth on grids | [ADR 0004](docs/adr/0004-frontend-performance-baseline.md) |
| **Measurement** | `web-vitals` loaded from `index.tsx` | Ready to pipe to analytics without restructuring | [ADR 0004](docs/adr/0004-frontend-performance-baseline.md) |

**Honest ceiling:** Without SSR/edge caching, TTFB and first HTML remain CRA-shaped; the ADRs document what we optimized *inside* that constraint.

---

## SEO

**Problem:** Search engines and social previews care about stable titles, descriptions, and crawl policy; a CRA SPA ships one `index.html` shell.

**Decisions**

1. **`react-helmet-async`** (`SeoHead`) sets per-route **`<title>`** and **meta description** so each URL has intentional metadata when JS runs.
2. **`noindex`** on transactional flows (e.g. checkout/complete) so those URLs don’t compete with commercial landing pages in the index.

**Trade-offs**

- **SPA reality:** Content still hydrates client-side; aggressive SEO (marketplace category pages, editorial content) would want **SSR/SSG** (Next.js, Remix, or a thin BFF)—out of scope for the starter repo but called out explicitly here.
- **No separate ADR:** This is a small, localized choice; the important part is **knowing the limit** of client-only SEO and naming the next step.

---

## Accessibility

**Problem:** Marketplaces are dense UIs (grids, icon buttons, filters); without intent, keyboard and screen-reader users get left behind.

**Decisions (examples in code)**

- **Regions & names:** `aria-label` on icon-only controls (cart, account), `aria-pressed` on tag filters, labeled sections for gallery and product info.
- **Keyboard:** Visible `focus-visible` rings on `Button` / links (Tailwind `focus:ring-*`)—see [ADR 0002](docs/adr/0002-tailwind-css.md) for the shared component layer.
- **Loading:** Lazy route fallback uses `role="status"` + `aria-live="polite"` + `aria-busy` so loading isn’t silent.
- **Decoration:** Stars and icons marked `aria-hidden` when text already conveys meaning.

**Trade-off:** Manual audits don’t scale forever; a production line would add **axe** in CI and a skip link—documented here as follow-up, not claimed as done.

**ADR link:** Lazy loading and fallback behavior tie to [ADR 0003](docs/adr/0003-route-lazy-loading.md) (when users wait for a chunk, we expose that state accessibly).

---

## Design process & UI direction

### Planning with Lovable (AI-assisted)

Before writing production UI, I **planned screens and layout flows** using **[Lovable](https://lovable.dev)** as an AI-assisted design and prototyping tool. The aim was to **compress exploration time** (layout variants, hierarchy, spacing) while staying close to **patterns users already know** from modern e-commerce: scannable grids, obvious primary actions, and a clear path from discovery to checkout.

**Lovable prototype (add your share URL):** [Open project on Lovable](https://lovable.dev)

*Replace the link above with your published Lovable project URL when you share this README.*

### Retro products, modern storefront

The **catalog leans 1990s** in theme, which lands as **retro** in tone. The **chrome around it is intentionally contemporary**: **rounded corners**, lots of **whitespace**, and a **clean** structure so **3D product imagery** stays the hero. The mix—nostalgic items inside a current, minimal shell—keeps the brand playful without feeling like a dated interface.

### Reducing friction

The UX favors **simplicity**: short decision paths per screen, predictable navigation (see [Features implemented](#features-implemented)), and familiar cart/checkout patterns so attention stays on products, not on learning a novel UI.

### Type, radii, and color

**Typography, border radii, and palette** support the same story: **soft, approachable surfaces**, **neutral bases** so renders and thumbnails read clearly, and a **single accent system** for actions and focus—implemented as Tailwind tokens and shared components ([Tech stack](#tech-stack--engineering-decisions), [ADR 0002](docs/adr/0002-tailwind-css.md)). For how that shows up for keyboard and screen-reader users, see [Accessibility](#accessibility).

---

## Testing strategy

**Problem:** The brief rewards both **correct behavior** and **maintainable tests**; brittle tests that depend on implementation details break on every refactor.

**Decisions**

1. **MSW** defines the HTTP contract once; the same handlers run in browser (dev) and Jest, so tests assert what users see after “network” responses, not mocked implementation details of `axios` internals.
2. **Testing Library** queries (`getByRole`, `findBy*`) keep assertions aligned with accessibility and real DOM output.
3. **Layers:** unit tests for pure functions (e.g. `formatCurrency`); component tests for isolated widgets; integration tests that render `App` or full pages with `MemoryRouter` + `QueryClientProvider` for navigation and cart flows.
4. **Shared test utilities** under `src/config/test/` to avoid copy-pasting providers and wrappers—test code is still code.

There is no dedicated ADR for testing; the approach follows the same principle as the ADRs: **explicit trade-offs** (MSW setup cost vs. flaky real-network tests; integration runtime vs. confidence). UI and flow expectations align with [Design process & UI direction](#design-process--ui-direction) and [Features implemented](#features-implemented).

---

## Original brief

> The goal of this task is to test your ability to test, refactor and implement new functionality on a given system. Note that this repository does not represent the actual code of CGTrader, but only acts as a testing ground.

**Tasks**

1. Implement MVP cart functionality  
2. Refactor implementation code and tests where you see fit  
3. Take UI and UX into consideration; improve layout and styles  
4. Make sure the test suite runs through all tests successfully  

**Notes:** Use git to track changes; submit a link or zip when finished.

---

## Architecture Decision Records

- [ADR 0001: Use Zustand for cart store](docs/adr/0001-zustand-cart-store.md)
- [ADR 0002: Use Tailwind CSS as primary styling approach](docs/adr/0002-tailwind-css.md)
- [ADR 0003: Route-level lazy loading with Home as eager entrypoint](docs/adr/0003-route-lazy-loading.md)
- [ADR 0004: Frontend performance baseline for marketplace flows](docs/adr/0004-frontend-performance-baseline.md)

---

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For more detail on CRA defaults, see the [CRA documentation](https://facebook.github.io/create-react-app/docs/getting-started).

---

*Built as a **frontend** technical submission for **CGTrader**. This repo is a self-contained exercise: it is **not** production CGTrader software, and mocked data stands in for a real marketplace API.*
