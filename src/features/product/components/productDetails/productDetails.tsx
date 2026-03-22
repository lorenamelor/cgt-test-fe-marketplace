import type { Product, ProductId } from '../../../../shared/types/product';
import { ReactComponent as ArrowRightIcon } from '../../../../shared/assets/arrow-right.svg';
import { Button } from '../../../../shared/components/button';
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
  onAddAndGoToCart?: (productId: ProductId) => void;
};

export function ProductDetails({
  product,
  details,
  rating = 4.5,
  reviewCount = 124,
  onAddToCart,
  onAddAndGoToCart,
}: ProductDetailsProps) {
  return (
    <section aria-label="Product information" className="w-full">
      <Header product={product} rating={rating} reviewCount={reviewCount} />

      <div className="mt-6 flex w-full flex-col gap-3">
        <AddToCartButton
          productId={product.id}
          onAddToCart={onAddToCart}
          className="h-14 w-full text-[0.9375rem]"
        />
        <Button
          type="button"
          variant="secondary"
          className="h-14 w-full justify-center text-[0.9375rem]"
          onClick={() => onAddAndGoToCart?.(product.id)}
        >
          Add and Go to Cart
          <ArrowRightIcon className="h-4 w-4 shrink-0" aria-hidden />
        </Button>
      </div>

      <Specs details={details} />
    </section>
  );
}
