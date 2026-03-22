import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { BackLink } from '../../shared/components/backLink';
import { ShippingForm } from '../../features/checkout/components/shippingForm';
import { PaymentForm } from '../../features/checkout/components/paymentForm';
import { CheckoutSummary } from '../../features/checkout/components/checkoutSummary';
import SeoHead from '../../shared/components/seoHead';
import type { CheckoutFormValues } from '../../features/checkout/types/checkoutFormValues';
import { generateOrderNumber } from '../../features/checkout/helpers/generateOrderNumber';
import { useCartStore } from '../../shared/stores/cart';

const CHECKOUT_FORM_ID = 'checkout-form';

export function Checkout() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const clearCart = useCartStore((s) => s.clearCart);
  const methods = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (_data: CheckoutFormValues) => {
    const orderNumber = generateOrderNumber();
    clearCart();
    navigate(`/complete?order=${orderNumber}`);
  };

  return (
    <>
      <SeoHead
        title="90s Shop | Checkout"
        description="Secure your order and complete checkout for high-quality 90s-themed 3D assets."
        canonicalPath={`${pathname}${search}`}
      />

      <div className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <BackLink to="/cart">Back to Cart</BackLink>

          <section className="mt-6 md:mt-8">
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Checkout</h1>

            <FormProvider {...methods}>
              <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start md:gap-8">
                <form
                  id={CHECKOUT_FORM_ID}
                  className="space-y-6"
                  onSubmit={methods.handleSubmit(onSubmit)}
                  noValidate
                >
                  <ShippingForm />
                  <PaymentForm />
                </form>

                <CheckoutSummary checkoutFormId={CHECKOUT_FORM_ID} />
              </div>
            </FormProvider>
          </section>
        </div>
      </div>
    </>
  );
}

export default Checkout;
