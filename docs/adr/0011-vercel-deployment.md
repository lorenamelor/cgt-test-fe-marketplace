# ADR 0011: Host the MVP on Vercel

## Status

Accepted

## Context

The storefront is a **Create React App** production build: static files in `build/` after `npm run build`, with **client-side routing** (`BrowserRouter`). We need:

- A **public HTTPS URL** for demos, handoff, and review without running our own servers.
- **Little ops work** for an MVP (no VMs, manual TLS, or custom CDN setup).
- **Deploy from Git** so we do not upload builds by hand.
- Correct behavior when users **open or refresh** deep links (e.g. `/cart`, `/products/:id`) — the host must serve `index.html` for those paths.

## Decision

We deploy to **[Vercel](https://vercel.com)**:

- **Git:** linking the repo runs **builds on push** to production (and optional **preview deploys** for branches/PRs).
- **Build:** `npm run build`, output **`build/`** — matches CRA and Vercel defaults.
- **SPA routing:** root [`vercel.json`](../../vercel.json) **rewrites** all paths to `/index.html` so the React app loads and React Router can read the URL (no 404 on refresh for non-root routes).

The production URL is in the README.

## Alternatives considered

**Netlify**

- Pros: Similar workflow, Git deploys, SPA fallback; strong for static sites.
- Cons: Same idea; we picked Vercel for **team familiarity** and a **single vendor** common in React/Next.js work.

**GitHub Pages**

- Pros: Free and simple for static sites.
- Cons: **No built-in SPA fallback** without extra setup (e.g. `404.html` hack or Actions); fewer **PR previews** than Vercel/Netlify.

**Cloudflare Pages, S3 + CloudFront, or similar**

- Pros: Full control at scale.
- Cons: More pieces (buckets, policies, cache, SPA rules) than we need for a **short MVP demo**.

**Self-hosted Node or Docker**

- Pros: Full control.
- Cons: Patching, scaling, and TLS for a **static** app — too much for this scope.

**Vercel (chosen)**

- Pros: Fast **push → live URL**; HTTPS and CDN by default; preview URLs; history and rollback in the UI; hobby tier works for demos.
- Cons: Vendor tie-in; edge features are platform-specific; **not** a backend — our API stays mocked (MSW) until we add a real service.

## Trade-offs

- We accept **depending on Vercel** for **speed and no server to run** for a static CRA build.
- **SEO and SSR** limits of the SPA do not change with the host; see ADR 0009 and README “future improvements” for SSR/SSG.

## References

- [Vercel – Documentation](https://vercel.com/docs)
- [Vercel – Create React App](https://vercel.com/docs/frameworks/create-react-app)
- Project README — Deploy na Vercel
