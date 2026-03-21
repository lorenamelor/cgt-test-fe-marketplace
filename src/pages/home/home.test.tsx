import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

import Home from './home';
import { products } from '../../shared/mocks';
import { getProducts } from '../../shared/services/product';

jest.mock('../../shared/services/product', () => ({
  getProducts: jest.fn(),
}));

function renderHome() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    </QueryClientProvider>,
  );
}

describe('Home - integration (service mock + React Query)', () => {
  it('shows skeleton and then renders product cards', async () => {
    jest.useRealTimers();

    (getProducts as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(products), 50);
        }),
    );

    const { container } = renderHome();

    // MSW has a small delay; skeleton should appear immediately.
    expect(container.querySelector('.animate-pulse')).toBeTruthy();

    expect(await screen.findByRole('heading', { name: /tamagotchi original/i })).toBeInTheDocument();
    expect(screen.getByText('$129.00')).toBeInTheDocument();
  });

  it('shows error state when getProducts fails', async () => {
    (getProducts as jest.Mock).mockImplementation(() => Promise.reject(new Error('Network error')));
    renderHome();

    expect(
      await screen.findByText(/we couldn't load trending products\. please try again later\./i),
    ).toBeInTheDocument();
  });
});

