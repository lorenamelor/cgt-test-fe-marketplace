import { http, HttpResponse } from 'msw';
import { products } from '../shared/mocks/products';
import { filterProductsBySearch, filterProductsByTag } from '../features/home/helpers';

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') ?? '';
    const tag = url.searchParams.get('tag') ?? '';

    // In production these filters should happen in the real API/data layer.
    // We keep them here only so the local MSW mock can simulate backend behavior.
    const productsBySearch = filterProductsBySearch(products, search);
    const filteredProducts = filterProductsByTag(productsBySearch, tag);

    return HttpResponse.json(filteredProducts, { status: 200 });
  }),

  http.get('/api/products/:id', async ({ params }) => {
    const id = String(params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product, { status: 200 });
  }),

  http.get('/api/products/:id/related', async ({ params }) => {
    const id = String(params.id);
    const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);
    return HttpResponse.json(relatedProducts, { status: 200 });
  }),
];
