import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../../shared/utils/formatCurrency';

type OrderSummaryProps = {
  subtotalCents: number;
  itemCount: number;
};

const SHIPPING_CENTS = 999;

export function OrderSummary({ subtotalCents, itemCount }: OrderSummaryProps) {
  const totalCents = subtotalCents + SHIPPING_CENTS;

  return (
    <aside className="h-fit rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-7 md:py-7">
      <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </dt>
          <dd className="font-medium text-slate-900">{formatCurrency(subtotalCents)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Shipping</dt>
          <dd className="font-medium text-slate-900">{formatCurrency(SHIPPING_CENTS)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <dt className="font-semibold text-slate-900">Total</dt>
        <dd className="text-base font-bold text-primary">{formatCurrency(totalCents)}</dd>
      </div>

      <Link
        to="/checkout"
        className="mt-5 flex h-14 w-full items-center justify-center rounded-xl bg-primary font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97]"
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}
