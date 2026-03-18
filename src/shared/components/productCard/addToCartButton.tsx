import type { ProductId } from '../../types/product';
import { Button } from '../button';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';

export type AddToCartButtonProps = {
  productId: ProductId;
  onAddToCart?: (productId: ProductId) => void;
};

export function AddToCartButton({ productId, onAddToCart }: AddToCartButtonProps) {
  return (
    <Button
      type="button"
      className="h-10 w-auto gap-2 py-2 px-4 text-sm"
      onClick={() => onAddToCart?.(productId)}
    >
      <CartIcon className="h-4 w-4" />
      Add to Cart
    </Button>
  );
}
