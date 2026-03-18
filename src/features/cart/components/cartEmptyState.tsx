import { Link } from 'react-router-dom';

export function CartEmptyState() {
  return (
    <div className="mt-16 flex min-h-[320px] flex-col items-center justify-center">
      <p className="text-sm text-slate-500">Your cart is empty</p>
      <Link
        to="/"
        className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
      >
        Browse Products
      </Link>
    </div>
  );
}
