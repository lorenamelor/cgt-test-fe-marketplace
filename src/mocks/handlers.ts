import { http, HttpResponse } from 'msw';
import { products } from '../shared/mocks/products';

export const handlers = [
  http.get('/api/products', async () => {
    return HttpResponse.json(products, { status: 200 });
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
