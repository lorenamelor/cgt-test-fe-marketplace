# ADR 0009: SEO in a CRA SPA with react-helmet-async

## Status

Accepted

## Context

The app is a **single-page app** built with Create React App. The first HTML is static; titles and meta update **after** JavaScript runs.

We still want:

- **Different `<title>` and meta description** per route (home, product, cart, checkout, complete) for bookmarks, accessibility, and sharing when tools run JS.
- Control over **indexing** for low-value or sensitive URLs (e.g. order complete).

## Decision

We use **`react-helmet-async`** with a small wrapper (`SeoHead`):

- **`HelmetProvider`** at the root wraps the router.
- Each page sets **`title`** and **`meta name="description"`** for that view (product pages can put the product name in the title).
- **Open Graph and Twitter Card** tags (`og:*`, `twitter:*`) for link previews, including **`og:url`** and optional **`og:image`** per product.
- **`link rel="canonical"`** with an absolute URL from a **`canonicalPath`** prop (transactional pages use a stable path without noisy query strings where it makes sense).
- **`noindex, nofollow`** via meta robots where we do not want search engines to focus on the page (e.g. order complete).

**Files in `public/`:** **`robots.txt`** and a small **`sitemap.xml`** point at the production host; keep them in sync with the real domain. The **sitemap** lists only stable **shell** routes (e.g. home, cart, checkout); **product URLs** should come from a **dynamic sitemap** once the catalog has a real API (see README future work).

We also use **semantic HTML** and a clear heading order (see project README — Accessibility and SEO).

## Alternatives considered

**Static `<title>` only in `public/index.html`**

- Pros: Very simple.
- Cons: One title for all routes — bad UX and weak for SEO tools.

**Manual `document.title` in `useEffect` per page**

- Pros: No extra library.
- Cons: Easy to forget meta tags; harder to update many tags; no built-in order for nested components.

**react-helmet-async**

- Pros: Async-safe; declarative head updates; works well with React 18.
- Cons: Still **client-side** — crawlers that do not run JS mostly see the shell.

## Limits (trade-off)

- **Strong SEO for a large changing catalog** usually needs **SSR or SSG** (e.g. Next.js, Remix) so HTML includes content on first response. This ADR does not claim SSR-level SEO; it describes **what we do in a CRA SPA**. See README for SSR, dynamic sitemaps, and `hreflang` later.

## References

- [react-helmet-async – GitHub](https://github.com/staylor/react-helmet-async)
