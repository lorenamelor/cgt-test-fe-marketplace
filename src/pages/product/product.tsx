import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../../shared/hooks/useProduct';
import { useRelatedProducts } from '../../shared/hooks/useRelatedProducts';
import { useCartStore } from '../../shared/stores/cart';
import { products } from '../../shared/types/product';
import { ProductGallery } from '../../features/product/components/productGallery/productGallery';
import { ProductDetails } from '../../features/product/components/productDetails/productDetails';
import { RelatedProducts } from '../../features/product/components/relatedProducts';

export function Product() {
  const { productId } = useParams();
  const addItem = useCartStore((s) => s.addItem);

  const { data: productData } = useProduct(productId ?? '');
  const { data: relatedProductsData } = useRelatedProducts(productId ?? '');

  const product = productData ?? products.find((p) => p.id === productId) ?? products[0];

  const relatedProducts =
    relatedProductsData ?? products.filter((p) => p.id !== product.id).slice(0, 4);

  const details = product.details;

  return (
    <div className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <span aria-hidden="true">←</span>
          Back to Shop
        </Link>

        <main className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
          <ProductGallery product={product} />
          <ProductDetails
            product={product}
            details={details}
            rating={4.2}
            reviewCount={124}
            onAddToCart={addItem}
          />
        </main>

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}

export default Product;
