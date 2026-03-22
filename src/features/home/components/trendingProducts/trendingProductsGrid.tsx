import { ProductCard, ProductCardSkeleton } from '../../../../shared/components/productCard';
import { useCartStore } from '../../../../shared/stores/cart';
import type { Product } from '../../../../shared/types/product';
import { EmptyState } from '../emptyState';
import { ErrorState } from '../errorState';

const GRID_CLASS = 'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4';

const SKELETON_CARDS_COUNT = 4;

type TrendingProductsGridProps = {
  products: Product[];
  isPending: boolean;
  isError: boolean;
  isRetrying: boolean;
  onRetry: () => void;
  searchTerm: string;
};

export function TrendingProductsGrid({
  products,
  isPending,
  isError,
  isRetrying,
  onRetry,
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
    return <ErrorState isRetrying={isRetrying} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return <EmptyState searchTerm={searchTerm} />;
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
