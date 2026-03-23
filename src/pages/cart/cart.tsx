import { useLocation } from 'react-router-dom';
import { BackLink } from '../../shared/components/backLink';
import { CartPageSection } from '../../features/cart/components/cartPageSection';
import { ClearCartButton } from '../../features/cart/components/clearCartButton';
import SeoHead from '../../shared/components/seoHead';
import { useCartStore } from '../../shared/stores/cart';

export function Cart() {
  const { pathname, search } = useLocation();
  const hasItems = useCartStore((s) => s.items.length > 0);

  return (
    <>
      <SeoHead
        title="90s Shop | Cart"
        description="Review selected 90s 3D assets, check quantities, and get ready to complete your order."
        canonicalPath={`${pathname}${search}`}
      />

      <div className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <BackLink to="/">Continue Shopping</BackLink>

          <section className="mt-6 md:mt-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="min-w-0 text-2xl font-semibold text-slate-900 md:text-3xl">
                Shopping Cart
              </h1>
              {hasItems && <ClearCartButton />}
            </div>
            <CartPageSection />
          </section>
        </div>
      </div>
    </>
  );
}

export default Cart;
