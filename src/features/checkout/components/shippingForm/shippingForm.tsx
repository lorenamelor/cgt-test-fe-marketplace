import { Input } from '../../../../shared/components/input';

export function ShippingForm() {
  return (
    <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-8 md:py-8">
      <h2 className="text-lg font-semibold text-slate-900">Shipping Information</h2>

      <div className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="firstName" label="First Name" type="text" placeholder="John" />
          <Input id="lastName" label="Last Name" type="text" placeholder="Doe" />
        </div>

        <Input id="email" label="Email" type="email" placeholder="john@example.com" />

        <Input id="address" label="Address" type="text" placeholder="123 Main St" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="city" label="City" type="text" placeholder="New York" />
          <Input id="zipCode" label="Zip Code" type="text" placeholder="10001" />
        </div>
      </div>
    </section>
  );
}
