import { BackLink } from '../../shared/components/backLink';
import { ShippingForm } from '../../features/checkout/components/shippingForm';
import { PaymentForm } from '../../features/checkout/components/paymentForm';
import { CheckoutSummary } from '../../features/checkout/components/checkoutSummary';
import SeoHead from '../../shared/components/seoHead';

export function Checkout() {
  return (
    <>
      <SeoHead
        title="90s Shop | Checkout"
        description="Secure your order and complete checkout for high-quality 90s-themed 3D assets."
      />

      <div className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <BackLink to="/cart">Back to Cart</BackLink>

          <section className="mt-6 md:mt-8">
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Checkout</h1>

            <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start md:gap-8">
              <div className="space-y-6">
                <ShippingForm />
                <PaymentForm />
              </div>

              <CheckoutSummary />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Checkout;
