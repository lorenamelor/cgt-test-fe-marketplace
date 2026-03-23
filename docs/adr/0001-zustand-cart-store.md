# ADR 0001: Use Zustand for cart store

## Status

Accepted

## Context

The app needs client-side state for the shopping cart: items (product id + quantity), add/remove/update, and clear. This state is used in several places (header badge, cart page, product page, checkout). We want a simple solution that fits a small team and avoids extra re-renders.

## Decision

We use **Zustand** for the cart store (`src/shared/stores/cart`).

- The store holds `items: CartItem[]` and exposes: `addItem`, `removeItem`, `setQuantity`, `clearCart`.
- Components only subscribe to what they need (e.g. `useCartStore((s) => s.items)` or selectors) to limit re-renders.
- **Persistence:** We use Zustand’s **`persist`** middleware with **`localStorage`**, so we do not write our own sync (`useEffect`, JSON, hydration). The UI reads the same store that gets saved. We use **`partialize`** to save only `items`. Easy persistence was one reason we picked Zustand.

## Alternatives considered

**React Context + useReducer**

- Pros: Built-in, no extra package.
- Cons: Cart updates go through context and often cause wide re-renders unless we split contexts and optimize by hand.

**Zustand**

- Pros: Small API, little boilerplate, selective subscriptions; light; works outside React if needed; **official `persist` middleware** for `localStorage` without duplicating sync logic.
- Cons: Extra dependency; team needs agreed patterns for store shape and selectors; no built-in devtools (middleware can add them).

**Ad-hoc `localStorage` + React state (Context or other)**

- Pros: No middleware to learn.
- Cons: Easy to get out of sync with in-memory state; manual hydration, errors, and migrations; more code for the same result.

## References

- [Zustand – GitHub](https://github.com/pmndrs/zustand)
- [Zustand – Usage with selectors](https://github.com/pmndrs/zustand#using-zustand-with-selectors)
- [Zustand – Persisting store data (`persist`)](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md)
