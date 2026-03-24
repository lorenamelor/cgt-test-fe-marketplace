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
   - Wrap repeated list rows (cards, cart lines) in `React.memo` when their props stay stable between parent re-renders.
   - **Why:** On Home and Cart the *page* often re-renders (totals, filters, hover, context) even when *each row’s data* did not change. Without `memo`, React still re-renders every row. With `memo`, unchanged rows are skipped after a quick prop check—less work on long lists and snappier interaction (INP), especially on slower devices.
   - **Use it when:** The list is long or each row is non-trivial (e.g. image + text + actions), and you can keep props stable (e.g. `useCallback` for handlers, narrow store selectors, immutable item data).
   - **Skip or fix first when:** The parent passes new objects, arrays, or inline functions every render—`memo` will not help until props are stable. Also skip `memo` on tiny one-off components; comparing props can cost more than re-rendering them once.
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
