import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

export type ProductImageProps = {
  product: Product;
};

export function ProductImage({ product }: ProductImageProps) {
  return (
    <Link to={`/products/${product.id}`} className="block p-4">
      <div className="aspect-square w-full overflow-hidden rounded-2xl">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </Link>
  );
}
