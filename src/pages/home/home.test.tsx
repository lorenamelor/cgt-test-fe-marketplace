import { render, screen } from '../../config/test/testUtils';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';

import Home from './home';
import { server } from '../../mocks/server';
import { products } from '../../shared/types/product';
import { formatCurrency } from '../../shared/utils/formatCurrency';

function renderHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('Home - integration (MSW + React Query)', () => {
  it('should show skeleton and then render product cards', async () => {
    renderHome();
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);

    expect(await screen.findByRole('heading', { name: products[0].name })).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(products[0].priceCents))).toBeInTheDocument();
  });

  it('should show error state when products request fails', async () => {
    server.use(
      http.get('/api/products', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    renderHome();

    expect(
      await screen.findByText(/we couldn't load trending products\. please try again later\./i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^try again$/i })).toBeInTheDocument();
  });

  it('should reload products when Try again is clicked after a failed request', async () => {
    let attempts = 0;
    server.use(
      http.get('/api/products', () => {
        attempts += 1;
        if (attempts === 1) {
          return new HttpResponse(null, { status: 500 });
        }
        return HttpResponse.json(products);
      }),
    );

    renderHome();

    expect(
      await screen.findByText(/we couldn't load trending products\. please try again later\./i),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /^try again$/i }));

    expect(await screen.findByRole('heading', { name: products[0].name })).toBeInTheDocument();
  });

  it('should filter products by search term', async () => {
    renderHome();

    await screen.findByRole('heading', { name: products[0].name });

    const searchInput = screen.getByRole('textbox', { name: /search products/i });
    await userEvent.type(searchInput, 'boombox');

    expect(await screen.findByRole('heading', { name: /retro boombox/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: products[0].name })).not.toBeInTheDocument();
  });

  it('should show empty state when no product matches search', async () => {
    renderHome();

    await screen.findByRole('heading', { name: products[0].name });

    const searchInput = screen.getByRole('textbox', { name: /search products/i });
    await userEvent.type(searchInput, 'produto-inexistente');

    expect(
      await screen.findByText(/no products found for "produto-inexistente"\./i),
    ).toBeInTheDocument();
  });

  it('should filter products by selected tag', async () => {
    renderHome();

    await screen.findByRole('heading', { name: products[0].name });

    await userEvent.click(screen.getByRole('button', { name: /alien/i }));

    expect(await screen.findByRole('heading', { name: /sas operator/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /retro boombox/i })).not.toBeInTheDocument();
  });
});
