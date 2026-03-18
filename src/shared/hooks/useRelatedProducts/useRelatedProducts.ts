import { useQuery } from '@tanstack/react-query';
import { productQueryKeys } from '../../../config/query/productQueryKeys';
import type { ProductId } from '../../types/product';
import { getRelatedProducts } from '../../services/product';

export function useRelatedProducts(id: ProductId | string | undefined) {
  return useQuery({
    queryKey: productQueryKeys.related(String(id)),
    queryFn: () => getRelatedProducts(id as ProductId),
    enabled: Boolean(id),
  });
}

