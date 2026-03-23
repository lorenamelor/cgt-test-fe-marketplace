## ADR 0002: Use Tailwind CSS as primary styling approach

### Status

Accepted

### Context

The app needs a single visual system (colors, type, spacing, states) reused across pages. The team works in React and needs to change layouts quickly.

Scattered CSS (global styles, mixed local styles) often duplicates code, is hard to refactor, and can break other parts when you change styles. As the project grows, we want styling that:

- Keeps design tokens in one place.
- Uses spacing, colors, and type in a consistent way.
- Scales without becoming hard to maintain.

### Decision

We use **Tailwind CSS** as the main way to style the UI.

- `tailwind.config` is the source of truth for tokens (colors, spacing, type, breakpoints, radii, shadows, etc.).
- We use Tailwind utility classes in React components where it makes sense, and keep custom global CSS small.
- We reuse patterns via shared UI components (e.g. `Button`, `Card`, `ProductCard`) that wrap Tailwind classes.
- We add Tailwind plugins only when they clearly help this project.

### Alternatives considered

**Plain CSS (global / SCSS)**

- Pros: No extra runtime; standard CSS.
- Cons: More boilerplate and naming; more duplicate styles; harder to share tokens; global CSS can cause surprise side effects.

**CSS Modules**

- Pros: Scoped class names reduce global clashes; styles stay next to components; familiar to teams used to component CSS.
- Cons: Still more boilerplate than utilities for simple layouts; duplicate values unless you add variables or a token layer; sharing a single design system across features needs explicit conventions (e.g. `:global`, shared partials, or CSS variables).

**UI library (e.g. Material UI, Chakra UI)**

- Pros: Ready components; quick baseline UI.
- Cons: Harder to match our brand and patterns; stronger tie to one library’s API; bigger refactors if we leave later.

### Consequences

- **Positive**
  - Faster UI work: many style changes happen in JSX with utilities.
  - Tokens in one place: easier global tweaks (e.g. primary color, spacing).
  - Smaller CSS in production: only utilities that are used are generated.

- **Negative**
  - JSX can get long with many classes; we reduce this with shared components.
  - Team must learn Tailwind naming and config; IDE autocomplete and PR review help.
