import { useQuery } from '@tanstack/react-query';
import { productQueryKeys } from '../../../config/query/productQueryKeys';
import { getProducts } from '../../services/product';

export function useProducts() {
  return useQuery({
    queryKey: productQueryKeys.list(),
    queryFn: getProducts,
  });
}
