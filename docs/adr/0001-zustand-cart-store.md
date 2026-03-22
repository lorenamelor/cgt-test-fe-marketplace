# ADR 0001: Use Zustand for cart store

## Status

Accepted

## Context

The application needs client-side state for the shopping cart: list of items (product id + quantity), add/remove/update actions, and the ability to clear the cart. This state is shared across multiple parts of the UI (header badge, cart page, product page “Add to cart”, checkout). We need a predictable, maintainable solution that fits a small team and avoids unnecessary re-renders.

## Decision

We use **Zustand** as the state library for the cart store (`src/shared/stores/cart`).

- The store holds `items: CartItem[]` and exposes actions: `addItem`, `removeItem`, `setQuantity`, `clearCart`.
- Components subscribe only to the slices they need (e.g. `useCartStore((s) => s.items)` or selectors) to keep re-renders minimal.
- **Persistence:** The cart uses Zustand’s **`persist`** middleware with **`localStorage`**, so we did not hand-roll sync (`useEffect`, JSON, hydration). The same store the UI reads is what gets saved; we **`partialize`** to persist only `items`. That ease of persistence was an intentional part of choosing Zustand.

## Alternatives considered

**React Context + useReducer**

- Pros: No extra dependency, built-in.
- Cons: Cart updates would propagate via context and tend to cause broad re-renders unless we split contexts and manually optimize.

**Zustand**

- Pros: Small API, minimal boilerplate, selective subscriptions to limit re-renders; lightweight; works outside React if needed; **official `persist` middleware** for `localStorage` / custom storage without duplicating sync logic.
- Cons: Extra dependency; team convention needed for store shape and selectors; no built-in devtools (middleware can be added).

**Ad-hoc `localStorage` + React state (Context or otherwise)**

- Pros: No middleware to learn.
- Cons: Easy to drift from in-memory state; manual hydration, error handling, and migrations; more code and tests to maintain for the same outcome.

## References

- [Zustand – GitHub](https://github.com/pmndrs/zustand)
- [Zustand – Usage with selectors](https://github.com/pmndrs/zustand#using-zustand-with-selectors)
- [Zustand – Persisting store data (`persist`)](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md)
