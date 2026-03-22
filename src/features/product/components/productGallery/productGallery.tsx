import { useState } from 'react';
import type { Product } from '../../../../shared/types/product';
import { MainImage } from './mainImage';
import { Thumbnails } from './thumbnails';

export type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const images =
    product.galleryImageUrls && product.galleryImageUrls.length > 0
      ? product.galleryImageUrls
      : [product.imageUrl];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-label={`${product.name} gallery`} className="w-full">
      <MainImage src={images[activeIndex]} alt={product.name} />
      <Thumbnails
        product={product}
        images={images}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </section>
  );
}
