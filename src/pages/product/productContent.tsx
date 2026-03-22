import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../../shared/hooks/useProduct';
import { useCartStore } from '../../shared/stores/cart';
import type { ProductId } from '../../shared/types/product';

import { ProductGallery } from '../../features/product/components/productGallery/productGallery';
import { ProductDetails } from '../../features/product/components/productDetails/productDetails';
import { RelatedProducts } from '../../features/product/components/relatedProducts';
import { ProductGallerySkeleton } from '../../features/product/components/productGallery/productGallerySkeleton';
import { ProductDetailsSkeleton } from '../../features/product/components/productDetails/productDetailsSkeleton';
import { ErrorState } from '../../shared/components/errorState';

export function ProductContent() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const {
    data: productData,
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useProduct(productId ?? '');

  if (isError) {
    return (
      <div className="mt-8 md:mt-10">
        <ErrorState
          message={"We couldn't load this product. Please try again later."}
          isRetrying={isRefetching}
          onRetry={() => {
            void refetch();
          }}
        />
      </div>
    );
  }

  if (isPending) {
    return (
      <section className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
        <ProductGallerySkeleton />
        <ProductDetailsSkeleton />
      </section>
    );
  }

  if (!productData) {
    return null;
  }

  const details = productData.details;

  return (
    <>
      <section className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
        <ProductGallery product={productData} />
        <ProductDetails
          product={productData}
          details={details}
          rating={4.2}
          reviewCount={124}
          onAddToCart={(id) => addItem(id)}
          onAddAndGoToCart={(id) => {
            addItem(id);
            navigate('/cart');
          }}
        />
      </section>

      <RelatedProducts productId={productData.id as ProductId} />
    </>
  );
}
