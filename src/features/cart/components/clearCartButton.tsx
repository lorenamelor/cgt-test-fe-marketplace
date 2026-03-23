import { useCartStore } from '../../../shared/stores/cart';
import { ReactComponent as TrashIcon } from '../../../shared/assets/trash.svg';

export function ClearCartButton() {
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <button
      type="button"
      onClick={clearCart}
      className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-red-400 transition hover:opacity-80"
    >
      <TrashIcon className="h-4 w-4 shrink-0" aria-hidden />
      Clear Cart
    </button>
  );
}
