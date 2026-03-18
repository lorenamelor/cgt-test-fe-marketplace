import { Link } from 'react-router-dom';
import type { Product, ProductId } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { StarRating } from './starRating';
import { ProductImage } from './image';
import { AddToCartButton } from './addToCartButton';

export type ProductCardProps = {
  product: Product;
  onAddToCart?: (productId: ProductId) => void;
  rating?: number;
  reviewCount?: number;
  seller?: string;
};

export function ProductCard({
  product,
  onAddToCart,
  rating = 0,
  reviewCount = 0,
  seller = '',
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-[0_22px_45px_rgba(15,23,42,0.08)]">
      <ProductImage product={product} />

      <div className="p-4">
        <StarRating rating={rating} reviewCount={reviewCount} />

        <Link to={`/products/${product.id}`} className="mt-2 block">
          <h3 className="font-semibold text-slate-900">{product.name}</h3>
        </Link>

        {seller && <p className="mt-0.5 text-sm text-slate-500">by {seller}</p>}

        <div className="mt-4 flex items-end justify-between gap-3">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(product.priceCents)}
          </span>
          <AddToCartButton productId={product.id} onAddToCart={onAddToCart} />
        </div>
      </div>
    </article>
  );
}
