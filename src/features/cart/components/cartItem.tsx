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

export function CartItem({ product, quantity, onIncrement, onDecrement, onRemove }: CartItemProps) {
  return (
    <article className="flex items-center justify-between gap-6 rounded-3xl bg-white px-6 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 md:text-base">{product.name}</h3>
          <p className="mt-1 text-xs text-slate-400 md:text-sm">RetroGameVault</p>
          <p className="mt-1 text-sm font-semibold text-primary md:text-base">
            {formatCurrency(product.priceCents)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <QuantityStepper quantity={quantity} onDecrement={onDecrement} onIncrement={onIncrement} />

        <button
          type="button"
          aria-label="Remove item"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50"
          onClick={onRemove}
        >
          <TrashIcon className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </article>
  );
}
