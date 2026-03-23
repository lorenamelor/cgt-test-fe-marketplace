# 90s Shop — Marketplace MVP (frontend)

**Frontend-only marketplace MVP:** **home** catalog, **product detail**, **cart** (multiple line items), **checkout**, and **confirmation**. There is no backend or real payments — **HTTP requests are simulated with [MSW](https://mswjs.io/)** (same contract in the browser and in Jest tests).

**Flow:** Home → Product → Cart → Checkout → Completion page (order number in the URL query).

**Production demo (Vercel):** [https://cgt-test-fe-marketplace-one.vercel.app/](https://cgt-test-fe-marketplace-one.vercel.app/)

---

## Table of contents

- [Overview and features](#overview-and-features)
- [How to run](#how-to-run)
- [Deploy on Vercel](#deploy-on-vercel)
- [Scripts](#scripts)
- [CRACO and bundle analysis](#craco-and-bundle-analysis)
- [Stack, choices, trade-offs, and tests](#stack-choices-trade-offs-and-tests)
- [Performance](#performance)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Architecture and folders](#architecture-and-folders)
- [Conventions, commits, and maintainability](#conventions-commits-and-maintainability)
- [Design, UX/UI, and Lovable prototyping](#design-uxui-and-lovable-prototyping)
- [Practices in this version: conventions and AI](#practices-in-this-version-conventions-and-ai)
- [Future improvements (real product)](#future-improvements-real-product)
- [Original brief](#original-brief)
- [ADRs (Architecture Decision Records)](#adrs-architecture-decision-records)
- [Create React App](#create-react-app)

---

## Overview and features

- **Navigation:** routes for home, product, cart, checkout, and confirmation; layout with cart count.
- **Cart:** add, change quantity, remove; persistence with Zustand **`persist`** → `localStorage` (`90s-shop:cart`).
- **Checkout:** React Hook Form (validation on submit); **order placement** via **`POST /api/orders`** (mocked by MSW). Submit uses **TanStack React Query** `useMutation` (`useCreateOrder`); the **`createOrder`** service uses the **native `fetch` API** so response bodies behave reliably under **MSW + JSDOM** in tests (catalog calls still use the shared **Axios** client — see [ADR 0007](docs/adr/0007-axios-http-client.md)). On success, the cart is cleared and the app navigates to **`/complete?order=…`**.
- **Confirmation:** order number from the URL query.
- **Error Boundary** so render errors do not take down the entire app.

---

## How to run

**Requirements:** Node.js (LTS) and npm.

```bash
npm install
npm start
```

Opens [http://localhost:3000](http://localhost:3000). MSW intercepts the API in development (`src/mocks`, [`handlers.ts`](src/mocks/handlers.ts)). Production build: see [Scripts](#scripts) (`npm run build` → `build/`). Published demo: [Vercel](https://cgt-test-fe-marketplace-one.vercel.app/).

---

## Deploy on Vercel

**Production URL:** [https://cgt-test-fe-marketplace-one.vercel.app/](https://cgt-test-fe-marketplace-one.vercel.app/)

Decision recorded in [ADR 0011](docs/adr/0011-vercel-deployment.md).

For this MVP (CRA + React Router), [Vercel](https://vercel.com) provides deploy with **low operational overhead**: HTTPS, CDN, and **CI/CD** tied to Git.

### Why Vercel for this project

- **Git → build → URL:** push to the production branch triggers install, `npm run build`, and publishing of artifacts.
- **Preview** deployments on branches/PRs (depending on integration).
- **CRA** detected with `build/` output by default.
- **History and rollback** in the dashboard.
- **Free tier** suitable for demos.

### Updating the site

1. **Commit** + **`git push`** to the production branch (e.g. `main`).
2. Vercel rebuilds and updates the deploy — **you do not need to upload the `build/` folder manually.**

### SPA and `vercel.json`

With **`BrowserRouter`**, refreshing on `/cart` or `/products/...` requires serving **`index.html`**. [`vercel.json`](vercel.json) defines the rewrite for the SPA.

### MSW in production

`initMocks()` in [`src/index.tsx`](src/index.tsx) runs before render in all environments; [`public/mockServiceWorker.js`](public/mockServiceWorker.js) is included in the deploy. With a **real API**, you should call `initMocks()` only in development.

---

## Scripts

| Command           | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| `npm start`       | Dev server (fast refresh)                                    |
| `npm test`        | Jest + Testing Library (watch by default)                  |
| `npm run test:ci` | Same suite, **single run** (used by the `pre-push` hook)     |
| `npm run build`   | Production bundle → `build/` folder                          |
| `npm run lint`    | ESLint on `src/**/*.{js,jsx,ts,tsx}`                         |
| `npm run format`  | Prettier (write) for configured formats                     |
| `npm run analyze` | Production build + interactive bundle report (see below)   |

---

## CRACO and bundle analysis

[Create React App](https://create-react-app.dev/) does not expose Webpack configuration by default. This project uses **[CRACO](https://craco.js.org/)** (`@craco/craco`) to **customize Webpack without `eject`**: `start`, `build`, and `test` scripts go through CRACO, which delegates to `react-scripts` with the extended config in [`craco.config.js`](craco.config.js).

**What CRACO enables here (and later):**

- **Today:** register **[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)** only when you want to inspect the bundle (environment variable `ANALYZE=true`, see `analyze` script).
- **Ahead:** the same `craco.config.js` can host other Webpack tweaks (e.g. `splitChunks`, import aliases, extra plugins) while keeping CRA upgradeable without copying the entire config into the repo.

### `npm run analyze`

- **How:** from the project root, run `npm run analyze` (uses `cross-env` on Windows and macOS/Linux).
- **What happens:** a production `craco build` runs; at the end the webpack-bundle-analyzer **interactive report** opens in the browser (treemap by module size). The process may keep running until you exit with **Ctrl+C**.
- **Why:** see **what weighs** in JavaScript (dependencies vs. app code), to inform **code splitting**, lazy routes, or library swaps.
- **Deploy / CI:** the normal **`npm run build` does not** include the analyzer; it runs only when you use `npm run analyze` (or `ANALYZE=true`) explicitly.

---

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

Each block summarizes **context → decision → trade-off**. Where an ADR exists, it is linked.

### TypeScript (strict)

- **Goal:** **consistent typing** for props, state, API responses, and helpers — fewer bugs from wrong data shapes and safer refactors.
- **Decision:** TypeScript in `src/` with explicit types at boundaries (store, services, components).
- **Trade-off:** more verbosity than plain JS.
- **ADR:** *no dedicated ADR* (cross-cutting baseline).

### TanStack React Query

- **Goal:** **server request state and cache** for products (loading, error, data) in one place, with **cache reuse** and **deduplication** instead of many `useEffect` + `useState` pairs per screen. **Mutations** are used for **checkout** (`useCreateOrder` wrapping `POST /api/orders`).
- **Decision:** global `QueryClient`, keys in `src/config/query/`, cache tuning as needed.
- **Trade-off:** learning curve vs. ad hoc `fetch`.
- **ADR:** [0006](docs/adr/0006-tanstack-react-query.md).

### React Router v6

- **Goal:** shareable URLs, browser history, and layout with outlet.
- **Decision:** declarative routes + layout.
- **Trade-off:** SPA without native SSR (see [SEO](#seo)).
- **ADR:** *no dedicated Router ADR*; route lazy loading in [0003](docs/adr/0003-route-lazy-loading.md).

### Zustand + `persist` (cart)

- **Goal:** shared cart state (header, product, cart, checkout) and persistence after refresh.
- **Decision:** store with **`persist`** and **`partialize`**. With **selectors** (`useCartStore((s) => s.items.length)`), each component **re-renders only when its subscribed slice changes** — components that do not use that state are not pulled in by unrelated updates.
- **Trade-off:** extra dependency vs. Context + `useReducer`.
- **ADR:** [0001](docs/adr/0001-zustand-cart-store.md).

### React Hook Form (checkout)

- **Goal:** long form without re-rendering the whole tree on every keystroke.
- **Decision:** `FormProvider` + validation on submit; submit handler triggers **`useCreateOrder`** with form values + cart line items.
- **Trade-off:** library API vs. manual state.
- **ADR:** [0008](docs/adr/0008-react-hook-form-checkout.md).

### Tailwind CSS

- **Goal:** consistent UI (tokens, breakpoints) and **lean final CSS**: JIT **only includes classes used** in analyzed code — not a huge stylesheet of unused utilities.
- **Decision:** `tailwind.config.js`, `cn` with `clsx` + `tailwind-merge`, shared components.
- **Trade-off:** long class strings in JSX vs. CSS modules.
- **ADR:** [0002](docs/adr/0002-tailwind-css.md).

### Axios + MSW (+ `fetch` for order POST)

- **Goal:** single HTTP client for catalog (base URL, future interceptors) and **tests without the network** using the same contract as in dev. **Order placement** uses **`fetch`** in `createOrder` so POST response bodies are reliable under **MSW + JSDOM**; catalog continues to use the shared Axios instance.
- **Decision:** instance in `src/shared/services/httpClient`; MSW in the browser and in Jest; `POST /api/orders` handler in [`handlers.ts`](src/mocks/handlers.ts).
- **Trade-off:** Axios bundle cost vs. native `fetch` for reads; one targeted `fetch` call for mutations.
- **ADR:** [0007](docs/adr/0007-axios-http-client.md), [0005](docs/adr/0005-msw-api-mocking.md).

### Create React App

- **Goal:** start from the exercise template without ejecting.
- **Decision:** `react-scripts` + app-level optimizations.
- **Trade-off:** less bundler control than Vite/Next.
- **ADR:** *no dedicated ADR*.

### ESLint + Prettier

- **Goal:** one style and readable PRs.
- **Decision:** Prettier integrated into the lint flow.
- **ADR:** *no dedicated ADR*.

**Also in use:** [react-helmet-async](https://github.com/staylor/react-helmet-async) — **ADR** [0009](docs/adr/0009-seo-react-helmet-async-spa.md). [web-vitals](https://web.dev/vitals/) — see [Performance](#performance). **Icons:** inline SVG.

### Testing strategy

1. **MSW** defines the HTTP contract once; browser and Jest share the same handlers — **ADR** [0005](docs/adr/0005-msw-api-mocking.md).
2. **Testing Library** with queries aligned to what the **user** sees (`getByRole`, `findBy*`).
3. **Layers:** pure functions; isolated components; integration with `MemoryRouter` + `QueryClientProvider` + `src/config/test/`.
4. Centralized **`customRender`** to avoid repeating providers.

---

## Performance

**Goal:** Core Web Vitals and a reasonable bundle in a CRA SPA: less JS on the first screen, stable lists, images with a clear strategy.

| Lever        | Implementation                                                | Why it matters | ADR   |
| ------------ | ------------------------------------------------------------- | -------------- | ----- |
| Initial JS   | `React.lazy` per route; Home eager                            | Less critical JS | [0003](docs/adr/0003-route-lazy-loading.md) |
| Re-renders   | `React.memo` on cards/list items where it helps               | Less work in lists | [0004](docs/adr/0004-frontend-performance-baseline.md) |
| Images       | `loading="lazy"` in grids; product hero eager                 | LCP and bandwidth | [0004](docs/adr/0004-frontend-performance-baseline.md) |
| Data         | React Query: **cache and state** for requests (avoids duplicate fetch/state) | UX and network | [0006](docs/adr/0006-tanstack-react-query.md) |
| Cart         | Zustand selectors                                             | Only subscribers re-render | [0001](docs/adr/0001-zustand-cart-store.md) |
| Measurement  | `web-vitals` at bootstrap (below)                             | Baseline for real metrics | [0004](docs/adr/0004-frontend-performance-baseline.md) |

**Ceiling:** without SSR/edge, the first HTML is still the CRA shell.

### Web Vitals — what it does and how to see it

The **web-vitals** library records metrics such as **LCP**, **CLS**, **FCP**, **TTFB** (and **FID** in the legacy API). In [`src/index.tsx`](src/index.tsx), when **`NODE_ENV === 'development'`**, those metrics are logged to **`console.log`** with the `[web-vitals]` prefix.

**How to check:** `npm start`, open the app, **DevTools → Console**, navigate and interact; lines appear with metric name and value. In **production** the callback is off by default — the typical next step is sending `metric` to your analytics (custom endpoint, Vercel Analytics, etc.).

---

## SEO

**Context:** in CRA, the initial HTML is a shell until JS runs; you can still improve sharing, titles, and signals for tools.

**Implemented in this project**

1. **`SeoHead` + react-helmet-async:** per-route `title` and meta **description**.
2. **Open Graph and Twitter Cards** (`og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, etc.) per page, with configurable image on the product page.
3. **`<link rel="canonical">`** per page (absolute URL from `canonicalPath`). The **Complete** page uses a fixed canonical `/complete` (no order query), aligned with **noindex**.
4. **`public/robots.txt`:** allows crawling and points to the **sitemap** (absolute demo deploy URL).
5. **`public/sitemap.xml`:** only **fixed** shell routes (home, cart, checkout). **Product URLs** are not listed — with a dynamic catalog, the right step is an **API-generated sitemap** (see [Future improvements](#future-improvements-real-product)); hand-maintained product IDs in XML go stale quickly and do not scale.
6. **Semantic HTML** and coherent headings; **alt** on product images where appropriate.

**Note:** If you change the production domain, update **`public/sitemap.xml`** and the **Sitemap** line in **`public/robots.txt`** to match your site.

**Trade-off:** crawlers without JS still mostly see the shell; strong SEO at scale usually needs **SSR/SSG** — see [Future improvements](#future-improvements-real-product).

---

## Accessibility

Store UIs are dense (grids, icons, filters). Approach in code:

- **`aria-label`** on icon-only controls; **`aria-pressed`** where state behaves like a toggle.
- **`focus-visible`** on shared buttons/links — **ADR** [0002](docs/adr/0002-tailwind-css.md).
- Lazy route fallback: **`role="status"`**, **`aria-live`**, **`aria-busy`** — **ADR** [0003](docs/adr/0003-route-lazy-loading.md).
- **`aria-hidden`** on redundant decoration when text already describes the content.

**Possible evolution:** global skip link, periodic manual audits — outside the minimal scope of this README.

---

## Architecture and folders

- **`src/pages`:** thin composition per route.
- **`src/features`:** home, product, cart, checkout (UI and domain logic colocated).
- **`src/shared`:** cross-cutting components, `httpClient`, stores, utils, shared types.
- **`src/config`:** query keys, test utilities (`customRender` with Router + `QueryClient`).

**Why features + shared?** Changes stay localized by flow; only truly cross-cutting code lives in `shared`.

| Topic              | Decision                                      | ADR   |
| ------------------ | --------------------------------------------- | ----- |
| Route lazy loading | Home eager; rest lazy + `Suspense`            | [0003](docs/adr/0003-route-lazy-loading.md) |
| Cart               | Zustand + `persist`                           | [0001](docs/adr/0001-zustand-cart-store.md) |
| Styling            | Tailwind + components                         | [0002](docs/adr/0002-tailwind-css.md)       |
| Lists / images / Vitals | memo, lazy images, web-vitals            | [0004](docs/adr/0004-frontend-performance-baseline.md) |
| Layout             | Features + `shared`                           | [0010](docs/adr/0010-feature-based-architecture.md) |

---

## Conventions, commits, and maintainability

This section brings together **Git discipline**, **automation**, and **architecture choices** aimed at **readable, consistent, easy-to-evolve code** — the same reasoning that supports *clean code*, clear reviews, and team scalability (human or with AI).

### Commits: [Conventional Commits](https://www.conventionalcommits.org/) + Commitlint

- **Format:** `type(optional scope): description` with the **type** in lowercase; the **description** uses the imperative (*add*, *fix*, *update*, not *added* / *fixes*); body and footer are optional (e.g. issue reference, `BREAKING CHANGE:`).
- **Commitlint** ([`commitlint.config.js`](commitlint.config.js)) uses **`@commitlint/config-conventional`**, which accepts **only** the types in the table below (messages outside that set fail the hook). This keeps history **aligned with automated changelogs** and easy to filter.

| Type | When to use | Example subject |
|------|-------------|-----------------|
| **`feat`** | New **user-visible** functionality or integration (typically *minor* in SemVer). | `feat(product): add related products` |
| **`fix`** | **Bug fix** or incorrect behavior (patch). | `fix(cart): correct total when removing last item` |
| **`docs`** | **Documentation only** (README, ADRs, relevant JSDoc, doc copy — no production logic). | `docs: describe commit types in README` |
| **`style`** | Code **formatting / style** without behavior change (whitespace, semicolons). *Not* UI CSS — source style here. | `style: apply prettier to cart tests` |
| **`refactor`** | **Restructure** code (rename, extract, move files) **without** fixing a bug or adding a feature. | `refactor(checkout): extract address validation` |
| **`perf`** | Measurable **performance** improvement (fewer re-renders, bundle, response time). | `perf(home): memoize product grid item` |
| **`test`** | Add, fix, or refactor **tests** (unit, integration, mocks) without changing production code. | `test(msw): cover 500 on products` |
| **`build`** | **Build** or packaging tooling: Webpack/CRACO, `package.json`, bundle dependency resolution. | `build: bump craco minor` |
| **`ci`** | **CI/CD** config (GitHub Actions, Vercel config only, pipeline scripts). | `ci: add lint job to workflow` |
| **`chore`** | **Maintenance** that does not fit elsewhere: internal tasks, devDependency bumps without direct feature/fix impact, script cleanup. | `chore: bump eslint version` |
| **`revert`** | **Revert** a previous commit (often with body `Reverts hash…`). | `revert: feat(cart): new store API` |

**Quick examples with scope:** `feat(cart): persist items in localStorage`, `fix(checkout): validate empty zip`, `docs(adr): record deploy decision`.

**Tip:** if unsure between `chore` and `fix`/`feat`, ask *“does this change user-visible behavior or fix a bug?”* — if yes, it is not `chore`.

**Validate manually (useful in CI or before opening a PR):**

```bash
echo "feat: example message" | npx commitlint
```

### Husky: commit message and checks before push

- **[Husky](https://typicode.github.io/husky/)** registers Git hooks in [`.husky/`](.husky/).
- The **[`commit-msg`](.husky/commit-msg)** hook runs Commitlint on the commit message — **you do not have to memorize the format** if Git warns you on failure.
- The **[`pre-push`](.husky/pre-push)** hook runs **`npm run lint`** and **`npm run test:ci`** (Jest **without** *watch* mode, via `CI=true` in the script) — push proceeds only if both pass.
- The **`prepare`** script in [`package.json`](package.json) (`husky`) runs after `npm install` so fresh clones **get hooks installed** without extra manual steps.
- **Note:** there is no `pre-commit` hook; you can add *lint-staged* on `pre-commit` to validate only changed files before each commit.

### ESLint + Prettier: style and common mistakes

- **ESLint** (`npm run lint`) with **react-app** config (+ Jest), aligned with the CRA ecosystem.
- **Prettier** (`npm run format`) with **eslint-config-prettier** / **eslint-plugin-prettier** for **one source of truth** between formatting and rules — less debate in PRs and cleaner diffs.
- Running **lint** (and formatting when appropriate) **before push** reduces noise and keeps code **predictable** for readers and refactors.

### Granularity, composition, and feature separation

- **`src/pages`:** thin layer that **composes** features and layout per route — avoids “god pages” with all logic.
- **`src/features/*`:** each flow (home, product, cart, checkout) holds UI and rules for that domain — **localized changes** and clear mental ownership.
- **`src/shared`:** only **truly cross-cutting** pieces (components, `httpClient`, stores, utils, shared types).
- **Composition:** small reusable components (cards, steppers, buttons) instead of monolithic blocks — easier tests, `memo` where it matters, linear reading.
- **ADR** [0010](docs/adr/0010-feature-based-architecture.md) documents this layout.

### TypeScript, contracts, and tests as a safety net

- **TypeScript** at boundaries (API, store, props) **documents intent** and enables confident refactors — a maintainability pillar.
- **MSW** with the **same handlers** in dev and Jest **fixes the HTTP contract** in one place ([ADR 0005](docs/adr/0005-msw-api-mocking.md)) — less drift between environments.
- **Testing Library** + **`customRender`** with shared providers avoids copying boilerplate and keeps tests **readable and stable**.

### ADRs and deploy (context for decisions)

- **[ADRs](docs/adr/)** record **context → decision → trade-off** (Query, Zustand, Tailwind, Vercel, etc.), which **scales knowledge** as the project grows or changes hands.
- **Vercel deploy** ([ADR 0011](docs/adr/0011-vercel-deployment.md)) keeps **CI/CD simple** and predictable; aligns with continuous delivery practices for this MVP.

### “Vercel React Best Practices” skill (AI and review)

The repo includes the skill **[`.agents/skills/vercel-react-best-practices/`](.agents/skills/vercel-react-best-practices/SKILL.md)** (Vercel engineering guidance for **React / performance**). Use it as a **checklist** when writing or reviewing code with AI assistants: re-renders, bundle, data patterns — it **complements** ESLint/Prettier (different rule sets) and reinforces **consistency** on performance and component architecture.

### Summary: day-to-day conventions

1. **Commits** in conventional format (the hook helps).
2. **`npm run lint`** and **`npm run format`** before integrating code.
3. **Put code in the right place** (feature vs. `shared`) and **compose** instead of inflating a single file.
4. **Document meaningful decisions** in an ADR when there is a trade-off.
5. Use **types + MSW + tests** so contracts do not regress silently.

---

## Design, UX/UI, and Lovable prototyping

With a **UX/UI** background, I use **[Lovable](https://lovable.dev)** to **explore layout and flow** (hero, search, tags, grid) in short cycles before locking tokens and components in the repo. The preview is a **reference for intent**; final code (TypeScript, features, tests, MSW) is where accessibility rigor, types, and the HTTP contract land.

**Preview:** [https://id-preview--6fba5f6d-406b-42c1-be21-a87c0e1549aa.lovable.app/](https://id-preview--6fba5f6d-406b-42c1-be21-a87c0e1549aa.lovable.app/)

---

## Practices in this version: conventions and AI

- **TypeScript strict, ESLint, Prettier, feature structure, ADRs, conventional commits (Commitlint + Husky)** — see [Conventions, commits, and maintainability](#conventions-commits-and-maintainability).
- **AI (Lovable, editor):** speeds exploration and boilerplate; **human review** on types, a11y, and business rules; tests and lint as a safety net; the **Vercel React Best Practices** skill in [`.agents/skills/vercel-react-best-practices/`](.agents/skills/vercel-react-best-practices/SKILL.md) supports performance-focused React reviews.

---

## Future improvements (real product)

Ideas beyond the MVP — **not** a roadmap commitment.

### SEO and HTML

- **SSR/SSG** (Next.js, Remix) for HTML with content in the first byte.
- **Dynamic sitemap** generated from the API when the catalog is large or multilingual.
- **`hreflang`** and metadata per language when adding **i18n**.

### Internationalization (i18n)

- Libraries like **react-i18next** / Lingui, locale routes, currency/date formatting.

### Data, API, and reliability

- **Real production API** (replace mocks): the browser talks to a real backend; align contracts with current MSW handlers or evolve them until mocks are removed.
- **MSW only in development and tests:** in this MVP `initMocks()` may also run in production (Vercel demo). In a real product, **do not** initialize MSW in production — conditional import or only under `NODE_ENV === 'development'` / test pipeline — so **MSW, handlers, and `mockServiceWorker.js` stop contributing to the bundle** and runtime (less JS, less risk of accidentally intercepting real traffic).
- Cart synced with an **authenticated** user; **Sentry** (or similar) on the Error Boundary; send **web-vitals** in production.

### Payments and compliance

- Real gateway (PCI with the provider); CSP and LGPD/GDPR review.

### Performance and scale

- CDN, `srcset`, list virtualization, pagination/infinite query on the API, optional PWA.

### Quality and DX

- **E2E** (Playwright/Cypress); **Storybook** for `shared`.

---

## Original brief

> The goal of this task is to test your ability to test, refactor, and implement new functionality in a given system. Note that this repository does not represent CGTrader’s real code — it is only a test field.

**Tasks**

1. Implement MVP cart functionality  
2. Refactor implementation and tests where appropriate  
3. Consider UI and UX; improve layout and styles  
4. Ensure the full test suite runs successfully  

**Notes:** use git to track changes.

---

## ADRs (Architecture Decision Records)

All records live in [`docs/adr/`](docs/adr/). Titles below match each document.

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

---

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). **CRACO** only replaces the direct `react-scripts` invocation in npm scripts; see [CRACO and bundle analysis](#craco-and-bundle-analysis). More detail in the [CRA docs](https://facebook.github.io/create-react-app/docs/getting-started).

---

*Built as a **frontend deliverable** for assessment (**CGTrader**). This repository is a self-contained exercise: it is **not** CGTrader production software; data and API are mocked in place of a real marketplace.*
