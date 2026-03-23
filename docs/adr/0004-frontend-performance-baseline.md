# ADR 0004: Frontend performance baseline for marketplace flows

## Status

Accepted

## Context

The main user path is: Home → browse → product detail → cart → checkout.

To keep this path fast, we follow simple rules we can check with Web Vitals.

## Decision

1. **Route loading**
   - Home: eager.
   - Product, Cart, Checkout, Complete: lazy.
   - Details: ADR 0003.

2. **List items**
   - Use `React.memo` on repeated list cards/items when props are stable enough.
   - **Why it helps here:** Home and cart parents often re-render for reasons that do not change every row (e.g. cart totals, filters, hover or layout state, context updates). Without memo, React still walks and reconciles every list child; with memo, rows whose props are shallow-equal skip that subtree. That cuts work proportional to list size and improves responsiveness (INP) on mid-tier devices.
   - **When it is justified:** Many identical-shaped children, render cost that is not trivial (image + text + links), and props that stay referentially stable for unchanged items (stable handlers via `useCallback` / store selectors, or data passed from immutable snapshots).
   - **When it is not enough:** If the parent passes new object/array/function references every render, memo never bails out—fix prop stability first. Do not memo leaf components that are cheap and rarely list-mounted; the comparison cost can outweigh the win.
   - Today: `ProductCard`, `CartItem`.

3. **Images**
   - Use `loading="lazy"` for images in lists/grids or below the fold.
   - Keep the main product image eager so LCP on the product page stays good.

4. **Social / link previews**
   - Open Graph and Twitter tags come from `SeoHead` (see ADR 0009).
   - **Default share image** is `/90s-shop.png` (see `SeoHead` / `DEFAULT_OG_IMAGE_PATH`) on generic routes so crawlers do not fetch a huge random hero image.
   - **Product pages** use the same `imageUrl` as the product card so previews match list UI and we do not ship giant originals twice.
   - **`og:url` and `og:image`** use absolute URLs from `window.location.origin` when Helmet runs — fine for this SPA; crawlers use the deployed host.

## Expected impact

- Smaller critical JS on Home.
- Fewer useless re-renders in product/cart lists.
- Less network and decode work for offscreen images.
- More stable Web Vitals (especially LCP and INP) on real devices.
- Cheaper, more predictable link previews for crawlers (default OG image bounded; product pages reuse listing images).

## Trade-offs

- Memoization needs care; do not wrap every component.
- Lazy images can appear late if used above the fold by mistake.
- Lazy routes may still show fallback UI on a cold chunk load.
- Link unfurling is not the same as the user’s browser; bounded OG images help crawlers but do not replace optimizing images on the live page.

## Validation and monitoring

- Check with real and lab data:
  - Core Web Vitals (LCP, INP, CLS)
  - Extra checks (TBT, JS size, long tasks)
- Revisit if conversion or navigation gets worse in production.
