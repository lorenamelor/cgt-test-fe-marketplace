import { Link } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';

export type CartButtonProps = {
  count?: number;
};

export function CartButton({ count = 0 }: CartButtonProps) {
  return (
    <Link
      to="/cart"
      aria-label="Open cart"
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm hover:bg-slate-200"
    >
      <CartIcon />

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[0.625rem] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

