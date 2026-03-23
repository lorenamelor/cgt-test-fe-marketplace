import { memo } from 'react';
import type { Product } from '../../../shared/types/product';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { QuantityStepper } from '../../../shared/components/quantityStepper';
import { ReactComponent as TrashIcon } from '../../../shared/assets/trash.svg';

type CartItemProps = {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

function CartItemComponent({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  return (
    <article className="flex min-w-0 flex-col rounded-3xl bg-white px-4 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-6 min-[900px]:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-semibold text-slate-900 min-[900px]:text-base">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500 min-[900px]:text-sm">RetroGameVault</p>
          <p className="mt-1 text-sm font-semibold text-primary min-[900px]:text-base">
            {formatCurrency(product.priceCents)}
          </p>
        </div>
      </div>

      <div
        className="my-4 border-t border-slate-100 min-[900px]:hidden"
        role="presentation"
        aria-hidden
      />

      <div className="flex min-w-0 w-full items-center justify-between gap-4 min-[900px]:w-auto min-[900px]:shrink-0 min-[900px]:justify-end min-[900px]:gap-6">
        <QuantityStepper quantity={quantity} onDecrement={onDecrement} onIncrement={onIncrement} />

        <button
          type="button"
          aria-label="Remove item"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:bg-slate-50"
          onClick={onRemove}
        >
          <TrashIcon className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}

export const CartItem = memo(CartItemComponent);
