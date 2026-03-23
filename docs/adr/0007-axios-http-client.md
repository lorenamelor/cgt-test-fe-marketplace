# ADR 0007: Use Axios as the HTTP client (vs. native `fetch`)

## Status

Accepted

## Context

The product service calls HTTP with a configurable base URL. We want a small layer that:

- Sets **base URL** and future **headers** (auth, correlation ids) in one place.
- Supports **interceptors** for logging, error shaping, etc., without editing every call.
- Works with **TypeScript** in services and with **MSW** (same request shape as in production).

## Decision

We use **Axios** through a single shared instance **`fetcher`** (`src/shared/services/fetcher.ts`), also exported as **`httpClient`** for existing imports:

- **`baseURL`** `/api` and **timeout** so MSW and future backends swap easily.
- **Request / response interceptors** map failures to a shared **`ApiError`** (`axiosErrorHandlers.ts`); UI uses **`getApiErrorMessage`** where needed.
- Services return typed data; components and React Query call those functions.

**Jest + MSW note:** the default XHR adapter can return an **empty response body** in tests. The shared **`fetcher`** therefore sets **`adapter: axiosFetchAdapter`** by default (`fetch` under the hood) so all calls keep interceptors and typed `AxiosError` / **`ApiError`** while response bodies are read reliably.

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
