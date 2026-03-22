import type { Product } from '../../../../shared/types/product';
import { normalizeSearchText } from '../normalizeSearchText';

export function filterProductsBySearch(products: Product[], search = ''): Product[] {
  const normalizedSearch = normalizeSearchText(search);

  if (!normalizedSearch) return products;

  return products.filter((product) => {
    const searchableParts = [
      product.name,
      product.description,
      ...product.details.map((detail) => `${detail.label} ${detail.value}`),
    ];
    const searchableText = normalizeSearchText(searchableParts.join(' '));

    return searchableText.includes(normalizedSearch);
  });
}
