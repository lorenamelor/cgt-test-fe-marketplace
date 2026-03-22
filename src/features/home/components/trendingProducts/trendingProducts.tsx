import { useProducts } from '../../../../shared/hooks/useProducts';
import { TrendingProductsGrid } from './trendingProductsGrid';
import { TrendingProductsHeader } from './trendingProductsHeader';

type TrendingProductsProps = {
  searchTerm: string;
  selectedTag: string;
};

export function TrendingProducts({ searchTerm, selectedTag }: TrendingProductsProps) {
  const {
    data: products,
    isError,
    isPending,
    isRefetching,
    refetch,
  } = useProducts({
    search: searchTerm,
    tag: selectedTag,
  });
  const totalProducts = products?.length ?? 0;

  return (
    <section className="mt-16 md:mt-20">
      <TrendingProductsHeader
        isPending={isPending}
        isError={isError}
        totalProducts={totalProducts}
      />
      <TrendingProductsGrid
        isPending={isPending}
        isError={isError}
        isRetrying={isRefetching}
        products={products ?? []}
        searchTerm={searchTerm}
        onRetry={() => {
          void refetch();
        }}
      />
    </section>
  );
}
