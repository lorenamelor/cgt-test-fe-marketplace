import { Link } from 'react-router-dom';
import { CartPageSection } from '../../features/cart/components/cartPageSection';

export function Cart() {
  return (
    <div className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <span aria-hidden="true">←</span>
          Continue Shopping
        </Link>

        <main className="mt-6 md:mt-8">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Shopping Cart</h1>
          <CartPageSection />
        </main>
      </div>
    </div>
  );
}

export default Cart;
