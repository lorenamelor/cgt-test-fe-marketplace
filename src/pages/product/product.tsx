import { useParams } from 'react-router-dom';
import { BackLink } from '../../shared/components/backLink';
import SeoHead from '../../shared/components/seoHead';
import { useProduct } from '../../shared/hooks/useProduct';
import { ProductContent } from './productContent';

export function Product() {
  const { productId } = useParams();
  const { data: productData } = useProduct(productId ?? '');

  return (
    <>
      <SeoHead
        title={productData ? `90s Shop | ${productData.name}` : '90s Shop | Product'}
        description={
          productData
            ? productData.description
            : 'View product specs, preview details, and pick the perfect 90s 3D asset for your next scene.'
        }
        canonicalPath={`/products/${productId ?? ''}`}
        imageUrl={productData?.imageUrl}
      />

      <div className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <BackLink to="/">Back to Shop</BackLink>
          <ProductContent />
        </div>
      </div>
    </>
  );
}

export default Product;
