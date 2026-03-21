import { Input } from '../../../../shared/components/input';

export function ShippingForm() {
  return (
    <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-8 md:py-8">
      <h2 className="text-lg font-semibold text-slate-900">Shipping Information</h2>

      <div className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            autoComplete="given-name"
            required
            placeholder="John"
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            autoComplete="family-name"
            required
            placeholder="Doe"
          />
        </div>

        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          placeholder="john@example.com"
        />

        <Input
          id="address"
          label="Address"
          type="text"
          autoComplete="street-address"
          required
          placeholder="123 Main St"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="city"
            label="City"
            type="text"
            autoComplete="address-level2"
            required
            placeholder="New York"
          />
          <Input
            id="zipCode"
            label="Zip Code"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            placeholder="10001"
          />
        </div>
      </div>
    </section>
  );
}
