# ADR 0010: Feature-based architecture with a `shared` layer

## Status

Accepted

## Context

The storefront covers several journeys: discovery (home), product detail, cart, and checkout. If everything lives in one flat `components` folder, code grows messy:

- Hard to find **where to change** one flow without touching others.
- Risk of **circular imports** and oversized folders.
- Onboarding is slower when **domain** vs **generic UI** is unclear.

We need a layout that works for an MVP but stays clear for reviewers and new contributors.

## Decision

We organize `src/` like this:

- **`src/pages`:** Route-level pages — thin files that connect features, layout, and data hooks.
- **`src/features/<domain>`:** Vertical slices for **home**, **product**, **cart**, and **checkout** — components, hooks, helpers, and feature types together when it makes sense.
- **`src/shared`:** Shared pieces: **components** (Button, Input, Layout, SEO head), **stores** used app-wide (e.g. cart), **services** (HTTP client), **utils**, and **shared types**.
- **`src/config`:** App-wide settings: routes, query keys, test helpers (`customRender` with Router + `QueryClient`).

**Rule of thumb:** If only one feature needs it, it stays in that feature. If two or more need it, move it to `shared` (or split if the coupling was accidental).

## Alternatives considered

**Flat `src/components` + `src/hooks`**

- Pros: Simple when the app is tiny.
- Cons: Does not scale; unclear who owns what.

**Strict DDD / modules with barrels everywhere**

- Pros: Strong boundaries in very large apps.
- Cons: Too heavy for an MVP; more ceremony than we need.

**Feature folders + `shared` (chosen)**

- Pros: Easy to see **where to edit**; `shared` stays small and gets reviewed when it grows.
- Cons: Sometimes you must decide “feature vs. shared”; discipline needed so `shared` does not become a dump.

## Trade-offs

- Some short-term duplication inside features is OK instead of early abstraction in `shared`.
- Renaming or moving a module is normal when a second consumer appears.

## References

- Project README — Architecture & folder structure
- ADR 0001 (cart in `shared/stores` — example of cross-feature state)
