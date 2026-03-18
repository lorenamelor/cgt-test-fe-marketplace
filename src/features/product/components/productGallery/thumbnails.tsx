import type { Product } from '../../../../shared/types/product';
import { cn } from '../../../../shared/utils/cn';

type ThumbnailsProps = {
  product: Product;
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function Thumbnails({ product, images, activeIndex, onSelect }: ThumbnailsProps) {
  return (
    <div className="mt-4 grid grid-cols-5 gap-4">
      {images.map((src, index) => (
        <button
          key={`${src}-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={cn(
            'aspect-square overflow-hidden rounded-2xl border-2 border-transparent bg-white transition-colors',
            index === activeIndex && 'border-primary',
          )}
        >
          <img src={src} alt={product.name} className="h-full w-full rounded-2xl object-cover" />
        </button>
      ))}
    </div>
  );
}
