import type { Product, ProductId } from '../../../../shared/types/product';
import { AddToCartButton } from '../../../../shared/components/productCard/addToCartButton';
import { Header } from './header';
import { Specs } from './specs';

type ProductDetail = {
  label: string;
  value: string;
};

export type ProductDetailsProps = {
  product: Product;
  details: ProductDetail[];
  rating?: number;
  reviewCount?: number;
  onAddToCart?: (productId: ProductId) => void;
};

export function ProductDetails({
  product,
  details,
  rating = 4.5,
  reviewCount = 124,
  onAddToCart,
}: ProductDetailsProps) {
  return (
    <section aria-label="Product information" className="w-full">
      <Header product={product} rating={rating} reviewCount={reviewCount} />

      <div className="mt-6">
        <AddToCartButton
          productId={product.id}
          onAddToCart={onAddToCart}
          className="h-14 w-full text-[0.9375rem]"
        />
      </div>

      <Specs details={details} />
    </section>
  );
}
