import type { Product } from '../../../../shared/types/product';
import { normalizeSearchText } from '../normalizeSearchText';

const tagKeywordMap: Record<string, string[]> = {
  gaming: ['virtual pet', 'alien character', 'creature assets'],
  'retro tech': ['desktop computer', 'boombox', 'crt television'],
  alien: ['alien', 'alien character', 'creature assets'],
  toys: ['virtual pet', 'tamagotchi'],
  arcade: ['boombox', 'cassette tape', 'vhs collection'],
  'vintage electronics': [
    'desktop computer',
    'boombox',
    'cassette tape',
    'crt television',
    'vhs collection',
  ],
};

export function filterProductsByTag(products: Product[], tag = ''): Product[] {
  const normalizedTag = normalizeSearchText(tag);

  if (!normalizedTag) return products;

  const keywords = tagKeywordMap[normalizedTag] ?? [normalizedTag];

  return products.filter((product) => {
    const searchableParts = [
      product.name,
      product.description,
      ...product.details.map((detail) => `${detail.label} ${detail.value}`),
    ];
    const searchableText = normalizeSearchText(searchableParts.join(' '));

    return keywords.some((keyword) => searchableText.includes(keyword));
  });
}
