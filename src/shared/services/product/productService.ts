import { httpClient } from '../httpClient';
import type { Product, ProductId } from '../../types/product';

type GetProductsParams = {
  search?: string;
  tag?: string;
};

export async function getProducts({ search, tag }: GetProductsParams = {}): Promise<Product[]> {
  const response = await httpClient.get<Product[]>('/products', {
    params: { search, tag },
  });
  return response.data;
}

export async function getProductById(id: ProductId): Promise<Product> {
  const response = await httpClient.get<Product>(`/products/${id}`);
  return response.data;
}

export async function getRelatedProducts(id: ProductId): Promise<Product[]> {
  const response = await httpClient.get<Product[]>(`/products/${id}/related`);
  return response.data;
}
