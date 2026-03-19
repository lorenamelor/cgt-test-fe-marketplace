import { Link } from 'react-router-dom';
import { ShippingForm } from '../../features/checkout/components/shippingForm';
import { PaymentForm } from '../../features/checkout/components/paymentForm';
import { CheckoutSummary } from '../../features/checkout/components/checkoutSummary';

export function Checkout() {
  return (
    <div className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <span aria-hidden="true">←</span>
          Back to Cart
        </Link>

        <main className="mt-6 md:mt-8">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Checkout</h1>

          <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start md:gap-8">
            <div className="space-y-6">
              <ShippingForm />
              <PaymentForm />
            </div>

            <CheckoutSummary />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Checkout;
