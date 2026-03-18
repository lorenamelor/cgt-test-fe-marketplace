## ADR 0002: Use Tailwind CSS as primary styling approach

### Status

Accepted

### Context

The application needs a consistent visual system (colors, typography, spacing, component states) that can be reused across multiple pages and components. The frontend team works primarily with React and needs to iterate quickly on interfaces, frequently prototyping and adjusting layouts.

Previous approaches based on scattered CSS (global styles, component-local styles without clear conventions, etc.) tend to create duplicated code, are harder to refactor, and increase the risk of side effects when changing styles. As the project grows, we want a styling solution that:

- Keeps design tokens centralized.
- Encourages consistent use of spacing, colors, and typography.
- Scales with the number of components and pages without becoming a maintenance burden.

### Decision

We use **Tailwind CSS** as the primary styling approach for the UI.

- We configure `tailwind.config` as the single source of truth for design tokens (colors, spacing, typography, breakpoints, radii, shadows, etc.).
- We use Tailwind utility classes directly in React components wherever practical, minimizing custom global CSS.
- We extract common patterns into reusable UI components (e.g. `Button`, `Card`, `ProductCard`) that encapsulate Tailwind classes and act as building blocks of the design system.
- We only add Tailwind plugins (typography, forms, etc.) when they provide clear value for this project.

### Alternatives considered

**Plain CSS (global CSS / CSS Modules / SCSS)**

- Pros: No additional runtime dependency; uses standard CSS with a familiar syntax.
- Cons: More boilerplate and manual class naming; higher risk of style duplication; harder to enforce a shared design system and consistent use of tokens; global CSS can lead to unexpected side effects.

**UI framework (e.g. Material UI, Chakra UI, etc.)**

- Pros: Ready‑made components and layout primitives; fast to get a basic, consistent UI up and running.
- Cons: Higher cost of customization to match our branding and interaction patterns; stronger dependency on an external framework’s design and API; potential “lock‑in” and more complex refactors if we outgrow the framework’s opinions.

### Consequences

- **Positive**
  - Faster UI development and iteration: many layout and style changes can be done directly in JSX using utilities.
  - Centralized, consistent design tokens that make it easier to adjust global look and feel (for example, changing primary colors or spacing scale).
  - Smaller CSS bundle in production because only the utilities actually used in the codebase are generated.

- **Negative**
  - Markup becomes more verbose due to multiple utility classes on elements; this is mitigated by extracting reusable components for common patterns.
  - There is a learning curve for the team to become fluent with Tailwind’s utility naming and configuration; this is mitigated by documentation, IDE autocomplete, and reviewing PRs with a focus on consistent token usage.

