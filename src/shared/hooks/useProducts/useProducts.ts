import { useQuery } from '@tanstack/react-query';
import { productQueryKeys } from '../../../config/query/productQueryKeys';
import { getProducts } from '../../services/product';

type UseProductsParams = {
  search?: string;
  tag?: string;
};

export function useProducts({ search = '', tag = '' }: UseProductsParams = {}) {
  return useQuery({
    queryKey: productQueryKeys.list(search, tag),
    queryFn: () => getProducts({ search, tag }),
  });
}
