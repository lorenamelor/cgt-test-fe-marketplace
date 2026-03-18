import type { Product } from '../../../../shared/types/product';
import { formatCurrency } from '../../../../shared/utils/formatCurrency';
import { StarRating } from '../../../../shared/components/productCard';

type HeaderProps = {
  product: Product;
  rating: number;
  reviewCount: number;
};

export function Header({ product, rating, reviewCount }: HeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <StarRating rating={rating} reviewCount={reviewCount} />
      <h1 className="text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
        {product.name}
      </h1>
      <data
        value={product.priceCents / 100}
        className="text-2xl font-bold text-primary md:text-[28px]"
      >
        {formatCurrency(product.priceCents)}
      </data>
      <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">{product.description}</p>
    </div>
  );
}
