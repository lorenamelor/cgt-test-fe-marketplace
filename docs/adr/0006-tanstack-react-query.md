# ADR 0006: Use TanStack React Query for server-derived data

## Status

Accepted

## Context

Product list and product detail load data over the network. Without a shared layer, each screen often repeats:

- Loading, error, and success with `useState` + `useEffect`.
- **Extra state** just to hold fetched payloads and to keep loading/error flags in sync—easy to get wrong (e.g. stale errors, double fetches, forgotten resets).
- **Duplicate requests** when the same data is needed in more than one place.
- **Stale UI** when returning to a screen that already loaded data.

We want caching, deduplication, and one place to set refetch rules (`staleTime`, `gcTime`) as the app grows. We also want **less hand-rolled async state**: one hook should expose status, cached data, and refetch without a parallel `useState` tree.

## Decision

We use **TanStack React Query** (`@tanstack/react-query`) for product data from the server:

- A shared **`QueryClient`** wraps the app (see `App` / providers).
- **Stable query keys** live under `src/config/query/` (e.g. products list, product by id) so invalidation stays clear.
- **`staleTime` / `gcTime`** are set on purpose to limit useless refetches on navigation while still allowing refresh when needed.
- **Status and data from the library:** `useQuery` exposes flags such as `isPending`, `isError`, and `isSuccess`, plus the **`data`** already tied to the cache—no separate `useState` for “the result” or for each phase. **`refetch`** is a single callable instead of re-running manual effect logic.
- **Simpler UI code:** screens branch on those flags and render `data` when ready; implementation stays smaller and easier to reason about than custom `useEffect` + multiple `setState` calls.

Components use `useQuery` (and related hooks) with the existing Axios product service.

## Alternatives considered

**`useEffect` + `useState` + manual `fetch` / Axios**

- Pros: No extra library; full control.
- Cons: Repeated boilerplate; easy to miss deduplication, cancellation, and cache behavior; harder to test the same way everywhere.

**SWR**

- Pros: Good for many fetch-and-cache cases; small API.
- Cons: We picked React Query for **first-class query keys**, devtools patterns, and alignment with TanStack tools already used here.

**React Query**

- Pros: Strong defaults for cache, deduplication, background refetch; clear split between **server state** and **client state** (cart stays in Zustand). Reduces **async UI complexity**: derived loading/error/success, cached `data`, and `refetch` replace a lot of bespoke state machines per screen.
- Cons: Learning curve; another dependency; easy to misuse if all UI state goes into queries.

## When not to use React Query

- **Pure UI state** (modals, toggles, form drafts before submit) — use React state or a small store.
- **Data already in memory** (props, Zustand) — no query needed.

## Trade-offs

- Server state is split: **React Query** for remote product data, **Zustand** for cart. That is on purpose: different lifecycles and persistence.

## References

- [TanStack Query – Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Query – Important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
