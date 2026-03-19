import { http, HttpResponse, delay } from 'msw';
import { products } from '../shared/mocks/products';

export const handlers = [
  http.get('/api/products', async () => {
    await delay(300);
    return HttpResponse.json(products);
  }),

  http.get('/api/products/:id', async ({ params }) => {
    await delay(200);
    const { id } = params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),

  http.get('/api/products/:id/related', async ({ params }) => {
    await delay(250);
    const { id } = params;
    const relatedProducts = products.filter((p) => p.id !== id).slice(0, 4);
    return HttpResponse.json(relatedProducts);
  }),
];
