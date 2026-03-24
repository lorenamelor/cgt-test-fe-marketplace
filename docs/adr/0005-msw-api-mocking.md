# ADR 0005: Use MSW for API mocking (development + Jest)

## Status

Accepted

## Context

The MVP has no real backend. The app still calls HTTP endpoints (Axios for catalog, **`fetch` for `POST /api/orders`** — see ADR 0007) as if a server existed. We need:

- The **same API shape** in local dev and in tests.
- Tests that check **what the user sees** after a response, not fragile mocks of `axios` or `fetch` in every file.
- A path to a real API later: change `baseURL`, turn off the browser worker; handlers can stay as fixtures or contract tests.

## Decision

We use **[Mock Service Worker (MSW)](https://mswjs.io/)** to intercept HTTP:

- **Browser (dev):** a service worker runs handlers from `src/mocks` so the app uses the real client code with fake responses.
- **Jest:** `setupTests` starts MSW’s `server` with the same handlers so tests use the same routes and payloads.

Product and order handlers (e.g. `GET /api/products`, `GET /api/products/:id`, related products, **`POST /api/orders`** returning `{ orderNumber }` or validation errors) sit next to shared mock data so dev and CI match.

## Alternatives considered

**Mock `axios` or `fetch` per test (`jest.mock`)**

- Pros: No worker; many teams know this pattern.
- Cons: Duplicated response shapes; dev and tests drift apart; tests depend on module internals.

**Inline `fetch` mocks in each suite**

- Pros: Little tooling.
- Cons: Same duplication and drift; harder to reuse realistic data.

**MSW**

- Pros: One place for the HTTP contract; real request path; same handlers in browser and Node; tests feel closer to integration tests.
- Cons: ESM + Jest may need **`transformIgnorePatterns`** (or similar); setup takes longer than a one-off `jest.mock`.

## Trade-offs

- MSW needs setup (worker in `public/`, server lifecycle in tests). The upside is **stable contracts** and fewer hand-written mocks.
- When a real API exists, handlers may become **contract tests** or go away; mocking at the **network layer** still makes sense.

### Production and performance

In this codebase the MSW worker may also start in **production** (for example a demo deploy without a backend). That does **not** reflect a real product setup: in true production MSW should stay **off** and the app should call the real API. Service worker startup and the interception layer tend to **hurt loading metrics** versus a build that does not register MSW; treat that as acceptable only for demos or an MVP without an API.

## References

- [MSW – Documentation](https://mswjs.io/docs/)
- [MSW – Jest integration](https://mswjs.io/docs/integrations/node)
