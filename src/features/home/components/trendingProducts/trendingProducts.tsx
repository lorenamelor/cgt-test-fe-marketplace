import { useProducts } from '../../../../shared/hooks/useProducts';
import { TrendingProductsGrid } from './trendingProductsGrid';
import { TrendingProductsHeader } from './trendingProductsHeader';

type TrendingProductsProps = {
  searchTerm: string;
};

export function TrendingProducts({ searchTerm }: TrendingProductsProps) {
  const { data: products, isError, isPending } = useProducts({ search: searchTerm });
  const totalProducts = products?.length ?? 0;

  return (
    <section className="mt-16 md:mt-20">
      <TrendingProductsHeader isPending={isPending} totalProducts={totalProducts} />
      <TrendingProductsGrid
        isPending={isPending}
        isError={isError}
        products={products ?? []}
        searchTerm={searchTerm}
      />
    </section>
  );
}
