import { Input } from '../../../../shared/components/input';

export function PaymentForm() {
  return (
    <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-8 md:py-8">
      <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>

      <div className="mt-6 space-y-5">
        <Input id="cardNumber" label="Card Number" type="text" placeholder="4242 4242 4242 4242" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input id="expiry" label="Expiry" type="text" placeholder="MM/YY" />
          <Input id="cvv" label="CVV" type="text" placeholder="123" />
        </div>
      </div>
    </section>
  );
}
