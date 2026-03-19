import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../../shared/stores/cart';
import { products } from '../../../../shared/mocks';
import { formatCurrency } from '../../../../shared/utils/formatCurrency';
import { Button } from '../../../../shared/components/button';
import { SummaryItem } from '../summaryItem';
import { PriceSummary } from '../priceSummary';

const SHIPPING_CENTS = 999;
const TAX_RATE = 0.08;

function generateOrderNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${result.slice(0, 3)}-${result.slice(3)}`;
}

export function CheckoutSummary() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotalCents = items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return total;
    return total + product.priceCents * item.quantity;
  }, 0);

  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + SHIPPING_CENTS + taxCents;

  const handleCompletePurchase = () => {
    const orderNumber = generateOrderNumber();
    clearCart();
    navigate(`/complete?order=${orderNumber}`);
  };

  return (
    <aside className="h-fit rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-8 md:py-8">
      <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

      <ul className="mt-5 space-y-4">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <SummaryItem
              key={item.productId}
              name={product.name}
              imageUrl={product.imageUrl}
              quantity={item.quantity}
              totalCents={product.priceCents * item.quantity}
            />
          );
        })}
      </ul>

      <PriceSummary>
        <PriceSummary.Row label="Subtotal" value={formatCurrency(subtotalCents)} />
        <PriceSummary.Row label="Shipping" value={formatCurrency(SHIPPING_CENTS)} />
        <PriceSummary.Row label="Tax" value={formatCurrency(taxCents)} />
      </PriceSummary>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="font-semibold text-slate-900">Total</span>
        <span className="text-lg font-bold text-primary">{formatCurrency(totalCents)}</span>
      </div>

      <Button className="mt-5" onClick={handleCompletePurchase}>
        Complete Purchase
      </Button>
    </aside>
  );
}
