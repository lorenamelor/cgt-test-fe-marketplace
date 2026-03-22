import { useEffect, useState } from 'react';
import type { ProductId } from '../../types/product';
import { Button } from '../button';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { cn } from '../../utils/cn';

const ADDED_FEEDBACK_MS = 1000;

export type AddToCartButtonProps = {
  productId: ProductId;
  onAddToCart?: (productId: ProductId) => void;
  className?: string;
};

export function AddToCartButton({ productId, onAddToCart, className }: AddToCartButtonProps) {
  // Increment on each add so the effect re-runs: cleanup clears the previous timeout and starts a full new delay (re-click extends feedback).
  const [feedbackTick, setFeedbackTick] = useState(0);

  useEffect(() => {
    if (feedbackTick === 0) return;
    const id = setTimeout(() => setFeedbackTick(0), ADDED_FEEDBACK_MS);
    return () => clearTimeout(id);
  }, [feedbackTick]);

  const handleClick = () => {
    if (!onAddToCart) return;
    onAddToCart(productId);
    setFeedbackTick((n) => n + 1);
  };

  const justAdded = feedbackTick > 0;

  return (
    <Button
      type="button"
      variant={justAdded ? 'success' : 'primary'}
      className={cn('h-10 w-auto gap-2 py-2 px-4 text-sm justify-center', className)}
      onClick={handleClick}
    >
      {justAdded ? (
        <>
          <CheckIcon className="h-4 w-4 shrink-0" aria-hidden />
          Added!
        </>
      ) : (
        <>
          <CartIcon className="h-4 w-4 shrink-0" aria-hidden />
          Add to Cart
        </>
      )}
    </Button>
  );
}
