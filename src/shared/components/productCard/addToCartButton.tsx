import type { ProductId } from '../../types/product';
import { Button } from '../button';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';
import { cn } from '../../utils/cn';

export type AddToCartButtonProps = {
  productId: ProductId;
  onAddToCart?: (productId: ProductId) => void;
  className?: string;
};

export function AddToCartButton({ productId, onAddToCart, className }: AddToCartButtonProps) {
  return (
    <Button
      type="button"
      className={cn('h-10 w-auto gap-2 py-2 px-4 text-sm justify-center', className)}
      onClick={() => onAddToCart?.(productId)}
    >
      <CartIcon className="h-4 w-4" />
      Add to Cart
    </Button>
  );
}
