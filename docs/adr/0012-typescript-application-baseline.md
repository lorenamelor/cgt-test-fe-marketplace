# ADR 0012: Use TypeScript as the application language (baseline)

## Status

Accepted

## Context

The marketplace UI is implemented in React. We want a single, explicit contract for data shapes (API responses, store state, component props) and for refactors to stay safe as the codebase grows. The goal of this ADR is mainly to **document the baseline**: why the whole `src/` tree is TypeScript and how we use it, not to compare every alternative in depth.

## Decision

- All application code under `src/` is **TypeScript**, with **`strict`** compiler options enabled via the CRA/TypeScript setup.
- Types are emphasized at **boundaries**: services and API layers, Zustand stores, shared utilities, and public props of components. Internals can rely on inference where it stays clear.
- The codebase avoids `any` for production paths; unknown shapes are narrowed or typed explicitly.

## Consequences

- **Positive:** Easier onboarding and reviews (intent is visible in types); fewer runtime surprises from wrong object shapes; better editor support.
- **Negative:** Slightly more ceremony than plain JavaScript; contributors need basic TypeScript fluency.

## References

- [TypeScript – strict mode](https://www.typescriptlang.org/tsconfig#strict)
