# ADR 0004: Frontend performance baseline for marketplace flows

## Status

Accepted

## Context

The storefront has a typical journey: users land on Home, browse products, open product details, and then proceed to cart and checkout.

To keep this flow responsive, we need lightweight and explicit baseline rules that can be maintained over time and validated with Web Vitals.

## Decision

We adopt the following frontend performance baseline:

1. **Route-level loading strategy**
   - Keep Home eager.
   - Keep Product, Cart, Checkout, and Complete lazy.
   - Route-level rationale is documented in ADR 0003.

2. **List-item render stability**
   - Use `React.memo` on repeated list cards/items where props are stable enough to benefit from memoization.
   - Current baseline applies to:
     - `ProductCard`
     - `CartItem`

3. **Image loading strategy for marketplace UI**
   - Use `loading="lazy"` for non-critical images that appear in lists/grids or below the fold.
   - Keep the Product page main image eager to avoid harming LCP on product detail views.

## Expected impact

- Better startup profile on Home due to smaller critical JavaScript.
- Fewer avoidable re-renders in product/cart lists.
- Lower network and decode pressure from offscreen images.
- More predictable Web Vitals behavior (especially LCP and INP) on real user devices.

## Trade-offs

- Memoization adds a small maintenance cost and should not be applied blindly to every component.
- Lazy image loading can delay image appearance if overused above the fold.
- Route lazy boundaries may still show fallback UI on cold chunk loads.

## Validation and monitoring

- Validate via field data and synthetic checks:
  - Core Web Vitals (LCP, INP, CLS)
  - Supporting diagnostics (TBT, JS transferred, long tasks)
- Revisit this baseline if conversion or navigation latency regresses in production.

