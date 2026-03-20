import { BackLink } from '../../shared/components/backLink';
import { ProductContent } from './productContent';

export function Product() {
  return (
    <div className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <BackLink to="/">Back to Shop</BackLink>
        <ProductContent />
      </div>
    </div>
  );
}

export default Product;
