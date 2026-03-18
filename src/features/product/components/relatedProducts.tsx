import { ProductCard } from '../../../shared/components/productCard';
import type { Product } from '../../../shared/types/product';
import { useCartStore } from '../../../shared/stores/cart';

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  const addItem = useCartStore((s) => s.addItem);

  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-14 md:mt-16">
      <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Related Products</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addItem}
            rating={4}
            reviewCount={89}
            seller="RetroNostalgiaShop"
          />
        ))}
      </div>
    </section>
  );
}
