# 90s Shop: 3D asset marketplace MVP

This project is an MVP of a 3D asset marketplace (content for CG, games, and visualization): browse the catalog, open product detail, manage a multi-line cart, go through checkout, and finish on a confirmation page. Catalog data is mocked; there is no real backend or payment integration.

Production demo: [cgt-test-fe-marketplace-one.vercel.app](https://cgt-test-fe-marketplace-one.vercel.app/)

---

## Table of contents

- [Overview and features](#overview-and-features)
- [Setup](#setup)
- [Stack, choices, trade-offs, and tests](#stack-choices-trade-offs-and-tests)
- [Performance](#performance)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Architecture and folders](#architecture-and-folders)
- [Consistency and maintainability](#consistency-and-maintainability)
- [Design, UX/UI, and Lovable](#design-uxui-and-lovable)
- [Deploy on Vercel](#deploy-on-vercel)
- [Future improvements (real product)](#future-improvements-real-product)
- [ADRs (Architecture Decision Records)](#adrs-architecture-decision-records)
- [Create React App and CRACO](#create-react-app-and-craco)

---

<a id="overview-and-features"></a>

## Overview and features

- **Catalog and navigation:** routes for home, product list/detail, cart, checkout, and confirmation; the layout shows cart state in the header.
- **Cart:** add lines, change quantities, and remove; state is stored in the browser with Zustand `persist` (`localStorage`, key `90s-shop:cart`).
- **Checkout:** form with React Hook Form and validation on submit; no real order API; mocked data focuses on catalog reads (GET), aligned with the original brief.
- **Completion:** final step of the flow (for example reference or order number in the URL query).
- **Error handling:** error boundary on render failures, with a message or error UI instead of failing with no feedback.

---

<a id="setup"></a>

## Setup

Requirements: Node.js (LTS) and npm.

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
```

Creates the `build/` folder with the optimized bundle.

### Tests

- **`npm test`:** Jest and Testing Library (watch mode by default).
- **`npm run test:ci`:** same suite, single run (used by the `pre-push` hook).

### Lint and format

- **`npm run lint`:** ESLint on `src/**/*.{js,jsx,ts,tsx}`.
- **`npm run format`:** Prettier (write) for the configured file types.

### Bundle analysis

- **`npm run analyze`:** see [Performance](#performance).

---

<a id="stack-choices-trade-offs-and-tests"></a>

## Stack, choices, trade-offs, and tests

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

Technologies

- **TypeScript (strict) in `src/`:** [ADR 0012](docs/adr/0012-typescript-application-baseline.md).
- **React 18 + React Router v6:** [ADR 0003](docs/adr/0003-route-lazy-loading.md) (lazy loading).
- **TanStack React Query:** [ADR 0006](docs/adr/0006-tanstack-react-query.md).
- **Zustand + persist (cart):** [ADR 0001](docs/adr/0001-zustand-cart-store.md).
- **React Hook Form (checkout):** [ADR 0008](docs/adr/0008-react-hook-form-checkout.md).
- **Tailwind CSS:** [ADR 0002](docs/adr/0002-tailwind-css.md).
- **Axios:** [ADR 0007](docs/adr/0007-axios-http-client.md).
- **MSW:** [ADR 0005](docs/adr/0005-msw-api-mocking.md); handlers in `src/mocks` (e.g. [`handlers.ts`](src/mocks/handlers.ts)) to align the catalog HTTP contract in development and in the test suite, without real network.
- **react-helmet-async:** [ADR 0009](docs/adr/0009-seo-react-helmet-async-spa.md).
- **web-vitals:** [Performance](#performance) and [ADR 0004](docs/adr/0004-frontend-performance-baseline.md).
- **ESLint + Prettier:** style and consistency.
- **Tests:** Jest and Testing Library for UI tests; `customRender` in `src/config/test/` wires Router, QueryClient, and other providers so you do not repeat boilerplate.

---

## Performance

The focus is the experience on the first visit: load what matters quickly, avoid shipping extra JavaScript up front, and keep metrics (Core Web Vitals) reasonable for an MVP.

**MSW in production builds:** If the app starts the Mock Service Worker on the deployed demo, that adds startup and interception overhead compared to a build that only talks to a real API. That setup is for environments without a backend; in a real product, keep MSW **development-only** and point the client at the real server. See [ADR 0005](docs/adr/0005-msw-api-mocking.md) (section “Production and performance”).

With Create React App the app is a SPA: the server sends minimal HTML and content appears after JavaScript runs. That makes deploy easy; in exchange, the first HTML has little text for search engines or very slow connections. The alternative is SSR (the server sends HTML with content already in it), but that adds complexity; we do not use SSR here. Evolutions in [Future improvements](#future-improvements-real-product).

### Lazy-loaded routes

The home page loads eagerly so users see the catalog without waiting for other parts of the app. Other routes use `React.lazy` + `Suspense`, so product, cart, or checkout code is only downloaded when needed. That means less JS on the initial load; on the first visit to each lazy route there may be a short loading state until the chunk arrives. [ADR 0003](docs/adr/0003-route-lazy-loading.md).

### Catalog and cache (React Query)

React Query handles catalog data requests: cache by key, clear states (loading / error / success), and less duplicated `fetch` and scattered `useEffect`+`useState`. When you return to a screen, data can come from the cache depending on configuration. [ADR 0006](docs/adr/0006-tanstack-react-query.md).

### Lists, images, and cart

`React.memo` where it helps in lists; in the grid images load lazily; on the product page the **main image (large, at the top)** loads early so LCP is not delayed; in the cart, Zustand selectors limit re-renders. [ADR 0004](docs/adr/0004-frontend-performance-baseline.md), [ADR 0001](docs/adr/0001-zustand-cart-store.md).

### Web Vitals (development)

`web-vitals` measures LCP, CLS, FCP, TTFB (and FID on the older API). In development, in [`src/index.tsx`](src/index.tsx), values are logged to the console with the `[web-vitals]` prefix. In production, sending them to analytics is usually the next step. [ADR 0004](docs/adr/0004-frontend-performance-baseline.md).

### Bundle analysis

`npm run analyze` runs a production build and opens [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) (treemap); Ctrl+C to exit. The normal build does not include the analyzer. Configuration via CRACO: [Create React App and CRACO](#create-react-app-and-craco).

---

## SEO

On CRA, the initial HTML is mostly a shell until JavaScript runs; you can still care about titles, descriptions, social sharing, and static files that guide search engines.

- Title (`<title>`) and meta description per route, via react-helmet-async, so each page has its own summary in results and previews.
- Sharing metadata (Open Graph, Twitter Cards): title, description, URL, and image where it makes sense (e.g. product with configurable image).
- **Canonical URL (`<link rel="canonical">`):** tells search engines “this is the main URL for this page” when the same screen can open with slightly different addresses (for example with query parameters). On the order completion page, each order can have its own URL (`/complete?order=…`); a fixed canonical (only the `/complete` path, without copying the query) avoids Google treating each variant as a separate page. You can optionally combine with `noindex` on that route so “thank you” pages are **not** indexed, which real stores often want.
- `public/robots.txt` allows crawling and points to the sitemap; `public/sitemap.xml` lists fixed shell routes (listing every product dynamically in hand-written XML does not scale; see improvements).
- Semantic HTML (landmarks, heading hierarchy) and alt text on product images when it describes useful content.

If you change the production domain, update `public/sitemap.xml` and the sitemap entry in `public/robots.txt`. Crawlers without JavaScript still mostly see the shell; strong SEO at scale usually involves SSR or statically generated pages. ADR: [0009](docs/adr/0009-seo-react-helmet-async-spa.md).

---

<a id="accessibility"></a>

## Accessibility

The goal is for the shop to work with keyboard, screen readers, and different screen sizes, without relying only on color or the mouse. In general: accessible names on controls (especially icon-only buttons), states that can be announced (loading, errors), visible focus when tabbing, and readable contrast between text and background so users with low vision or poor lighting are not excluded. Implementation details (focus-visible, lazy route fallbacks, specific ARIA patterns) live in the code and in the Tailwind and lazy-loading ADRs ([0002](docs/adr/0002-tailwind-css.md), [0003](docs/adr/0003-route-lazy-loading.md)).

---

<a id="architecture-and-folders"></a>

## Architecture and folders

The tree groups code by responsibility so changes to one flow (e.g. checkout) stay in one place:

- **`src/pages`:** thin composition per route (wires layout and features).
- **`src/features`:** home, product, cart, checkout: UI and rules for that domain together.
- **`src/shared`:** cross-cutting pieces (reusable components, `httpClient`, shared stores, utils, common types).
- **`src/config`:** query keys, test helpers (`customRender` with Router and `QueryClient`).

Decisions like lazy loading, cart persistence, or the performance baseline are not “folders” by themselves: they are documented in the stack ADRs and the performance section ([0010](docs/adr/0010-feature-based-architecture.md) for the features + `shared` idea).

---

<a id="consistency-and-maintainability"></a>

## Consistency and maintainability

Git discipline, automation, and coding habits so the project stays readable in reviews and refactors.

### Commits: [Conventional Commits](https://www.conventionalcommits.org/) + Commitlint

Format: `type(optional scope): description`, with the type in lowercase.

[`commitlint.config.js`](commitlint.config.js) uses `@commitlint/config-conventional`: only the types in the table below pass the hook.

| Type | When to use | Example |
|------|-------------|---------|
| feat | Visible feature or integration (minor in SemVer) | `feat(product): add related products` |
| fix | Bug fix (patch) | `fix(cart): correct total when removing last item` |
| docs | Documentation only | `docs: describe commit types in README` |
| style | Formatting/code without behavior change (not UI CSS) | `style: apply prettier to cart tests` |
| refactor | Restructure without fix or new feature | `refactor(checkout): extract address validation` |
| perf | Measurable performance improvement | `perf(home): memoize product grid item` |
| test | Tests only | `test(msw): cover 500 on products` |
| build | Build/packaging tooling | `build: bump craco minor` |
| ci | CI/CD pipelines and config | `ci: add lint job to workflow` |
| chore | Maintenance that does not fit another type | `chore: bump eslint version` |
| revert | Revert a commit | `revert: feat(cart): new store API` |

### Husky

[Husky](https://typicode.github.io/husky/) connects Git to automatic tasks: before accepting a commit message it runs Commitlint; before push it runs lint and tests in CI mode. After installing dependencies, the project reinstalls hooks so new clones stay aligned.

### ESLint + Prettier

Lint aligned with the Create React App ecosystem; formatting with Prettier so style is not debated in every PR.

### ADRs and types

Records in [`docs/adr/`](docs/adr/) for decisions with trade-offs. TypeScript at boundaries, MSW, and tests reduce silent contract regressions.

### Vercel React best-practices skill

The repo includes a [skill](.agents/skills/vercel-react-best-practices/SKILL.md) (instruction file for assistants in Cursor and similar tools) with Vercel team guidance on React and performance: what to avoid with re-renders, data and bundle patterns, and other topics. It does not replace ESLint; it is a guide when you write or review code with AI or when you want a human checklist beyond automatic rules. Cursor users can reference that skill in a chat so the model follows those priorities in suggestions or review.

---

<a id="design-uxui-and-lovable"></a>

## Design, UX/UI, and Lovable

[Lovable](https://lovable.dev) was used to move faster on layout and flow (visual hero, search, product grid, etc.) before consolidating tokens and components in the repo. The final code still reflects explicit design, UX, and UI choices. Preview: [Lovable (preview)](https://id-preview--6fba5f6d-406b-42c1-be21-a87c0e1549aa.lovable.app/).

---

<a id="deploy-on-vercel"></a>

## Deploy on Vercel

Production URL: [https://cgt-test-fe-marketplace-one.vercel.app/](https://cgt-test-fe-marketplace-one.vercel.app/)

[Vercel](https://vercel.com) is connected to the Git repo: push to the production branch triggers install, `npm run build` (output in `build/`), and publish with HTTPS and CDN; previews on branches/PRs depend on your integration. Motivation and details in [ADR 0011](docs/adr/0011-vercel-deployment.md). To update: `git push` to the production branch; you do not need to upload `build/` by hand.

With React Router in browser mode (`BrowserRouter`), URLs like `/cart` or `/products/:id` are handled on the client after the app loads. If the user refreshes on that URL, the server is asked for that literal path; without an extra rule, static hosting may return 404 because no file has that name. Every SPA route must return `index.html` so JavaScript boots and the router can take over. [`vercel.json`](vercel.json) defines that rule (rewrite) on Vercel.

`initMocks()` in [`src/index.tsx`](src/index.tsx) runs before render in all environments and [`mockServiceWorker.js`](public/mockServiceWorker.js) is included in the deploy. In a product with a real API, you would limit MSW to development and tests.

---

<a id="future-improvements-real-product"></a>

## Future improvements (real product)

Ideas beyond the MVP, no roadmap commitment.

### SEO, HTML, and rendering

- **SSR:** the server sends HTML that already includes page text and structure (not only an “empty” shell that JS fills later). Improves what users and many crawlers see immediately; needs a Node (or similar) server, cache, and more deploy work (Next.js, Remix, etc.).
- **SSG:** pages generated **once** at build time as static HTML. Good for content that rarely changes (help, landing); less suited to catalogs that change in real time.
- **Large sitemap:** with thousands of products, `sitemap.xml` should be generated by the API (or a pipeline), not edited by hand.
- **Multiple languages:** metadata per language and `hreflang` so Google ties the same page across `pt`, `en`, etc.

### Internationalization

Libraries like react-i18next or Lingui, routes or prefixes per locale, currency and date formatting.

### Data, API, and reliability

Real production API; align or evolve contracts vs. MSW and remove mocks where it makes sense. Do not boot MSW in production for a real product (dev/test only). Cart tied to user session; error tooling (e.g. Sentry) in the error boundary; send web-vitals in production.

### Payments and compliance

Payment gateway with the provider’s security requirements; browser security policy (CSP); compliance with data protection and privacy laws for your target market (personal data handling, consent, audits; legal detail is for your team and counsel).

### Performance and scale

Includes, among others:

- CDN for static assets
- `srcset` / responsive images
- Virtualization for very long lists
- Pagination or infinite query on the API
- Optional PWA
- SSR or SSG (as above) when initial HTML is the bottleneck for SEO or perceived speed

### Quality and DX

E2E (Playwright/Cypress); Storybook for `shared`.

---

## ADRs (Architecture Decision Records)

All in [`docs/adr/`](docs/adr/).

- [ADR 0001: Use Zustand for cart store](docs/adr/0001-zustand-cart-store.md)
- [ADR 0002: Use Tailwind CSS as primary styling approach](docs/adr/0002-tailwind-css.md)
- [ADR 0003: Route-level lazy loading with Home as eager entrypoint](docs/adr/0003-route-lazy-loading.md)
- [ADR 0004: Frontend performance baseline for marketplace flows](docs/adr/0004-frontend-performance-baseline.md)
- [ADR 0005: Use MSW for API mocking (development + Jest)](docs/adr/0005-msw-api-mocking.md)
- [ADR 0006: Use TanStack React Query for server-derived data](docs/adr/0006-tanstack-react-query.md)
- [ADR 0007: Use Axios as the HTTP client (vs. native `fetch`)](docs/adr/0007-axios-http-client.md)
- [ADR 0008: Use React Hook Form for checkout](docs/adr/0008-react-hook-form-checkout.md)
- [ADR 0009: SEO in a CRA SPA with react-helmet-async](docs/adr/0009-seo-react-helmet-async-spa.md)
- [ADR 0010: Feature-based architecture with a `shared` layer](docs/adr/0010-feature-based-architecture.md)
- [ADR 0011: Host the MVP on Vercel](docs/adr/0011-vercel-deployment.md)
- [ADR 0012: Use TypeScript as the application language (baseline)](docs/adr/0012-typescript-application-baseline.md)

---

<a id="create-react-app-and-craco"></a>

## Create React App and CRACO

The project is based on [Create React App](https://github.com/facebook/create-react-app) (`react-scripts`). CRA does not expose Webpack config by default; this repo uses [CRACO](https://craco.js.org/) (`@craco/craco`) to extend Webpack without `eject`. The `start`, `build`, and `test` scripts go through [`craco.config.js`](craco.config.js), which delegates to `react-scripts`. That lets you plug in webpack-bundle-analyzer only when `ANALYZE=true` (`npm run analyze`), without changing the normal build. CRA docs: [getting started](https://facebook.github.io/create-react-app/docs/getting-started).

---

Built as a frontend deliverable for assessment (CGTrader). This repo is a self-contained exercise: it is not CGTrader production software; catalog data and API are mocked for development and testing instead of a real marketplace.
