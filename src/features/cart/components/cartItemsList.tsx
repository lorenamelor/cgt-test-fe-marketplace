import type { Product } from '../../../shared/types/product';
import type { CartItem } from '../../../shared/stores/cart';
import { products as mockProducts } from '../../../shared/mocks';
import { CartItem as CartItemRow } from './cartItem';

type CartItemsListProps = {
  items: CartItem[];
  onIncrement: (productId: CartItem['productId']) => void;
  onDecrement: (productId: CartItem['productId']) => void;
  onRemove: (productId: CartItem['productId']) => void;
};

function getProduct(productId: CartItem['productId']): Product | undefined {
  return mockProducts.find((p: Product) => p.id === productId);
}

export function CartItemsList({ items, onIncrement, onDecrement, onRemove }: CartItemsListProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const product = getProduct(item.productId);
        if (!product) return null;

        return (
          <CartItemRow
            key={item.productId}
            product={product}
            quantity={item.quantity}
            onIncrement={() => onIncrement(item.productId)}
            onDecrement={() => onDecrement(item.productId)}
            onRemove={() => onRemove(item.productId)}
          />
        );
      })}
    </div>
  );
}
