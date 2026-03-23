# ADR 0003: Route-level lazy loading with Home as eager entrypoint

## Status

Accepted

## Context

The app uses React Router. Users usually start on Home, then go to Product, Cart, Checkout, and Complete.

We want a faster first load without hurting the first screen users see.

## Decision

We split code by route like this:

- `Home` (`/`) is **eager** (not lazy).
- `Product` (`/products/:productId`) is **lazy**.
- `Cart` (`/cart`) is **lazy**.
- `Checkout` (`/checkout`) is **lazy**.
- `Complete` (`/complete`) is **lazy**.

## Why Home is not lazy

Home is the first screen for most visits. Loading Home eagerly avoids an extra async step on first paint and reduces loading spinners on the first view.

In practice:

- faster first content;
- fewer loading states before users see products;
- less risk on the first step of the funnel.

## Why the other routes are lazy

Product, Cart, Checkout, and Complete load after the user navigates. Lazy loading keeps the first bundle smaller while Home still renders quickly.

For this flow, that trade-off is better than loading every route up front.

## Web Vitals impact

We expect:

- **LCP (Largest Contentful Paint):** eager `Home` lowers the chance of delaying the first meaningful content on `/`.
- **INP (Interaction to Next Paint):** a smaller first JS bundle means less main-thread work at startup, which can help early clicks and taps.

## Consequences

- **Positive**
  - Smaller first JavaScript load.
  - Focus on landing page performance.
  - Clear routing policy.

- **Negative**
  - Other routes may briefly show a fallback if the chunk is not cached yet.
  - Refactors must keep route boundaries and fallbacks consistent.
