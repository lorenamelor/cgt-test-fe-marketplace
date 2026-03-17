import { useQuery } from '@tanstack/react-query';
import type { ProductId } from '../../types/product';
import { productQueryKeys } from '../../../config/query/productQueryKeys';
import { getProductById } from '../../services/product';

export function useProduct(id: ProductId | string | undefined) {
  return useQuery({
    queryKey: productQueryKeys.detail(String(id)),
    queryFn: () => getProductById(id as ProductId),
    enabled: Boolean(id),
  });
}
