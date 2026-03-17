import { httpClient } from '../httpClient';
import type { Product, ProductId } from '../../types/product';

export async function getProducts(): Promise<Product[]> {
  const response = await httpClient.get<Product[]>('/products');
  return response.data;
}

export async function getProductById(id: ProductId): Promise<Product> {
  const response = await httpClient.get<Product>(`/products/${id}`);
  return response.data;
}
