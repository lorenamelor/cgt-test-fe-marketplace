# ADR 0003: Route-level lazy loading with Home as eager entrypoint

## Status

Accepted

## Context

The application uses React Router with a storefront flow where users usually start at Home and then navigate to Product, Cart, Checkout, and Complete.

We want to improve initial load performance without adding unnecessary friction in the most critical first interaction.

## Decision

We apply route-level code splitting with this policy:

- `Home` (`/`) is **eager** (not lazy).
- `Product` (`/products/:productId`) is **lazy**.
- `Cart` (`/cart`) is **lazy**.
- `Checkout` (`/checkout`) is **lazy**.
- `Complete` (`/complete`) is **lazy**.

## Why Home is not lazy

Home is the landing page and first meaningful screen for most sessions. Keeping Home eager avoids an extra async boundary on first paint and reduces the chance of a fallback state during the initial interaction.

In practical terms, this improves perceived performance where it matters most:

- faster first content impression;
- fewer loading transitions before users see products;
- lower risk of conversion impact on the first step of the funnel.

## Why the other routes are lazy

Product, Cart, Checkout, and Complete are navigated after user interaction. Loading them lazily keeps the initial bundle smaller while preserving a responsive first render on Home.

This is a better trade-off for this flow than making all routes eager.

## Web Vitals impact

The chosen split strategy is expected to impact Core Web Vitals as follows:

- **LCP (Largest Contentful Paint)**: keeping `Home` eager reduces the chance of delaying first meaningful content on the landing route.
- **INP (Interaction to Next Paint)**: a smaller initial JavaScript bundle lowers main-thread pressure during startup, which can improve early interaction responsiveness.

## Consequences

- **Positive**
  - Smaller initial JavaScript payload.
  - Better startup performance focus on landing page.
  - Clear and predictable routing performance policy.

- **Negative**
  - Secondary route transition may show a short fallback if chunk is not cached.
  - Requires keeping route boundaries and fallbacks consistent during refactors.

