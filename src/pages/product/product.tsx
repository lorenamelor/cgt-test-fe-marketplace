import { BackLink } from '../../shared/components/backLink';
import SeoHead from '../../shared/components/seoHead';
import { ProductContent } from './productContent';

export function Product() {
  return (
    <>
      <SeoHead
        title="90s Shop | Product"
        description="View product specs, preview details, and pick the perfect 90s 3D asset for your next scene."
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
