# ADR 0007: Use Axios as the HTTP client (vs. native `fetch`)

## Status

Accepted

## Context

The product service calls HTTP with a configurable base URL. We want a small layer that:

- Sets **base URL** and future **headers** (auth, correlation ids) in one place.
- Supports **interceptors** for logging, error shaping, etc., without editing every call.
- Works with **TypeScript** in services and with **MSW** (same request shape as in production).

## Decision

We use **Axios** through one shared instance (see `src/shared/services/httpClient`):

- **`baseURL`** from env or config so MSW and future backends swap easily.
- Optional **interceptors** for errors or auth as the app grows.
- Services (e.g. product API) return typed data; components and React Query use those functions.

## Alternatives considered

**Native `fetch`**

- Pros: No extra bytes; works everywhere; no new dependency.
- Cons: Interceptors and defaults are manual; repeated boilerplate for JSON, errors, and cancellation.

**Axios**

- Pros: Widely used; config on the instance; interceptors; familiar to many teams; works with MSW unchanged.
- Cons: **Bundle size** vs. `fetch`; one more dependency to update.

**ky, ofetch, or similar**

- Pros: Smaller than Axios; nicer defaults than raw `fetch`.
- Cons: Less common in large codebases; different interceptors — we preferred Axios for clarity and MSW in tests.

## Trade-offs

- We accept a small dependency for **one HTTP entry point** and simpler growth toward real auth and error reporting.

## References

- [Axios – Documentation](https://axios-http.com/docs/intro)
