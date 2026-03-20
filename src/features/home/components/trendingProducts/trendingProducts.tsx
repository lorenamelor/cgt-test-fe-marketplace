import { TrendingProductsGrid } from './trendingProductsGrid';
import { TrendingProductsHeader } from './trendingProductsHeader';

export function TrendingProducts() {
  return (
    <section className="mt-16 md:mt-20">
      <TrendingProductsHeader />
      <TrendingProductsGrid />
    </section>
  );
}
