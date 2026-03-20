import { ProductCard, ProductCardSkeleton } from '../../../../shared/components/productCard';
import { useCartStore } from '../../../../shared/stores/cart';
import { useProducts } from '../../../../shared/hooks/useProducts';

const GRID_CLASS = 'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4';

const SKELETON_CARDS_COUNT = 4;

export function TrendingProductsGrid() {
  const addItem = useCartStore((s) => s.addItem);
  const { data: products, isError, isPending } = useProducts();

  if (isPending) {
    return (
      <div className={GRID_CLASS}>
        {Array.from({ length: SKELETON_CARDS_COUNT }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-600">
        We couldn&apos;t load trending products. Please try again later.
      </div>
    );
  }

  const list = products ?? [];

  return (
    <div className={GRID_CLASS}>
      {list.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addItem}
          rating={4}
          reviewCount={124}
          seller="RetroGameVault"
        />
      ))}
    </div>
  );
}
