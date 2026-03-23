# ADR 0008: Use React Hook Form for checkout

## Status

Accepted

## Context

Checkout has several fields (shipping and payment). A simple approach — **fully controlled** inputs with React state on every keystroke — leads to:

- **Many re-renders** of large parts of the page (summary, layout) on each change.
- Verbose code (`value` + `onChange` per field) and harder validation.

We want **validation on submit** (with room for field rules later) without hurting how fast the form feels.

## Decision

We use **React Hook Form** on the checkout page:

- **`useForm`** with **`FormProvider`** so nested fields can use `useFormContext` where it helps.
- **`mode: 'onSubmit'`** so validation runs when the user tries to finish the purchase, not on every keypress unless we change that later.
- Default values set once; the submit handler builds a **`CreateOrderPayload`** (form values + **cart line items** from Zustand) and calls **`useCreateOrder`**, a **TanStack React Query** `useMutation` that invokes **`createOrder`** via the shared Axios **`fetcher`** (`POST /api/orders`, mocked by MSW). On success: **clear the cart**, **navigate** to `/complete?order=…` with the returned **order number**; on failure, **`getApiErrorMessage`** maps **`ApiError`** from response interceptors to UI text.

## Alternatives considered

**Fully controlled inputs + `useState` per field or one big object**

- Pros: No form library; very explicit.
- Cons: Re-render cost on long forms; easy to write inconsistent validation.

**Formik**

- Pros: Popular; good for complex forms.
- Cons: Heavier re-render model for large forms; React Hook Form’s **uncontrolled-by-default** model fits our checkout size and performance goal.

**React Hook Form**

- Pros: Fewer re-renders by registering inputs; small API for submit-first flows; works well with TypeScript (`CheckoutFormValues`).
- Cons: Different mental model from fully controlled inputs; custom components must follow RHF patterns.

## Trade-offs

- Cart stays in **Zustand**; checkout **field values** stay in RHF until submit. That keeps cart logic separate from short-lived form state.
- **Mutation state** (pending, error) lives in React Query on the checkout page, separate from RHF’s field state — avoids mixing async order placement with input registration.

## References

- [React Hook Form – Get started](https://react-hook-form.com/get-started)
