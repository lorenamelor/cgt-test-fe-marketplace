# ADR 0006: Use TanStack React Query for server-derived data

## Status

Accepted

## Context

Product list and product detail load data from the API. Doing that only with `useState`, `useEffect`, and Axios tends to repeat the same problems on every screen:

- **Boilerplate:** loading, error, and success flags plus the fetched payload, all kept in sync by hand—easy to leave stale errors, double-fetch, or forget to reset.
- **Duplicate work:** the same endpoint may be called from more than one place with no shared cache.
- **Stale screens:** navigating back to a page that already loaded data often refetches or shows empty state until effects run again.

We need a single pattern for **server state**: cache, deduplication, and predictable refetch rules. Client-only concerns (UI toggles, cart) stay elsewhere (see ADR 0001).

## Decision

We use **TanStack React Query** (`@tanstack/react-query`) for **remote catalog data** (`useQuery` on product list, detail, and related products). Any future **server write** (e.g. placing an order via API) should use **`useMutation`** so **pending / error** stay with the request instead of duplicating that logic in effects or scattered `useState`.

| Topic | What we do |
| --- | --- |
| **Setup** | One shared **`QueryClient`** at the app root (see `App` / providers). |
| **Keys** | Central definitions under `src/config/query/` so list vs detail vs invalidation stay obvious. |
| **Freshness** | **`staleTime`** and **`gcTime`** set intentionally so navigation does not spam refetches, but data can still refresh when we need it. |
| **Reads** | **`useQuery`** exposes **`isPending` / `isError` / `isSuccess`**, cached **`data`**, and **`refetch`**—screens branch on those flags instead of hand-rolling loading/error/success state per page. |
| **Writes** | Prefer **`useMutation`** for POST/PUT/PATCH to the API; keep React Hook Form (or similar) for field values only, not for mimicking network status. |

**Integration:** queries call the existing Axios product helpers; React Query wraps those calls—it does not replace the service layer.

**Why this library:** strong defaults for cache and deduplication, first-class **query keys**, and a clear line between **server state** (React Query) and **client state** (e.g. Zustand cart). That keeps async UI code smaller and easier to follow than custom `useEffect` chains per route.

## Alternatives considered

**Manual `useEffect` + `useState` + Axios**

- **Pros:** No extra dependency; total control.
- **Cons:** Repeated patterns; easy to get wrong; no built-in deduplication or shared cache across components.

**SWR**

- **Pros:** Lightweight; good for fetch-and-cache flows.
- **Cons:** We preferred React Query for query-key conventions, devtools, and consistency with other TanStack usage in the project.

## When not to use React Query

- **UI-only state** (modals, toggles, draft form fields before submit) — React state or a small store.
- **Data you already have** (props, Zustand) — no network round-trip, no query.

## Trade-offs

- Team must learn React Query concepts (keys, stale vs garbage-collected data, mutations).
- Misuse risk: putting *all* state in queries blurs server vs client concerns—cart and ephemeral UI stay out of React Query on purpose.

## References

- [TanStack Query – Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Query – Important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
