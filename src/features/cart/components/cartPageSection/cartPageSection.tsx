import { useCartStore } from '../../../../shared/stores/cart';
import { products } from '../../../../shared/mocks';
import { CartItemsList } from '../cartItemsList';
import { OrderSummary } from '../orderSummary';
import { CartEmptyState } from '../cartEmptyState';

export function CartPageSection() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const subtotalCents = items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return total;
    return total + product.priceCents * item.quantity;
  }, 0);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="mt-6 grid min-w-0 gap-8 md:mt-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
      <div className="min-w-0">
        <CartItemsList
          items={items}
          onIncrement={(id) => addItem(id, 1)}
          onDecrement={(id) =>
            setQuantity(id, Math.max(0, (items.find((i) => i.productId === id)?.quantity ?? 1) - 1))
          }
          onRemove={removeItem}
        />
      </div>
      <div className="min-w-0">
        <OrderSummary subtotalCents={subtotalCents} itemCount={itemCount} />
      </div>
    </div>
  );
}
