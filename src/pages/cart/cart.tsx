import { BackLink } from '../../shared/components/backLink';
import { CartPageSection } from '../../features/cart/components/cartPageSection';

export function Cart() {
  return (
    <div className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <BackLink to="/">Continue Shopping</BackLink>

        <main className="mt-6 md:mt-8">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Shopping Cart</h1>
          <CartPageSection />
        </main>
      </div>
    </div>
  );
}

export default Cart;
