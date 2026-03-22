type TrendingProductsHeaderProps = {
  isPending: boolean;
  totalProducts: number;
};

export function TrendingProductsHeader({ isPending, totalProducts }: TrendingProductsHeaderProps) {
  const totalCount = isPending ? '...' : totalProducts;

  return (
    <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Trending Products</h2>
      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{totalCount}</span> results
      </p>
    </div>
  );
}
