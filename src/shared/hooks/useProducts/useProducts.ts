import { useQuery } from '@tanstack/react-query';
import { productQueryKeys } from '../../../config/query/productQueryKeys';
import { getProducts } from '../../services/product';

type UseProductsParams = {
  search?: string;
};

export function useProducts({ search = '' }: UseProductsParams = {}) {
  return useQuery({
    queryKey: productQueryKeys.list(search),
    queryFn: () => getProducts({ search }),
  });
}
