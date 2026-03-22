import { ProductCard, ProductCardSkeleton } from '../../../../shared/components/productCard';
import { useCartStore } from '../../../../shared/stores/cart';
import type { Product } from '../../../../shared/types/product';

const GRID_CLASS = 'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4';

const SKELETON_CARDS_COUNT = 4;

type TrendingProductsGridProps = {
  products: Product[];
  isPending: boolean;
  isError: boolean;
  searchTerm: string;
};

export function TrendingProductsGrid({
  products,
  isPending,
  isError,
  searchTerm,
}: TrendingProductsGridProps) {
  const addItem = useCartStore((s) => s.addItem);

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

  if (products.length === 0) {
    const trimmedSearchTerm = searchTerm.trim();
    const emptyMessage = trimmedSearchTerm
      ? `No products found for "${trimmedSearchTerm}".`
      : 'No products available right now.';

    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={GRID_CLASS}>
      {products.map((product) => (
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
