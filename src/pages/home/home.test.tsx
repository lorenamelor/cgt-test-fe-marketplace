import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../config/test/testUtils';
import { products } from '../../shared/types/product';
import { Home } from './home';

const mockUseProducts = jest.fn();

jest.mock('../../shared/hooks/useProducts', () => ({
  useProducts: (params: { search: string; tag: string }) => mockUseProducts(params),
}));

jest.mock('../../shared/hooks/useDebouncer', () => ({
  useDebouncer: (value: string) => value,
}));

function renderHome(path = '/') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Home />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('Home page', () => {
  beforeEach(() => {
    mockUseProducts.mockReset();
    mockUseProducts.mockReturnValue({
      data: [products[0], products[1]],
      isPending: false,
      isError: false,
      isRefetching: false,
      refetch: jest.fn(),
    });
  });

  it('should render hero and trending products with real components', () => {
    renderHome('/?tag=retro');

    expect(
      screen.getByRole('heading', { level: 1, name: /discover retro 90s 3d models/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('search', { name: /search products/i })).toBeInTheDocument();
    expect(screen.getByText(/popular tags/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: products[0].name })).toBeInTheDocument();
  });

  it('should filter with search and tag using real components', async () => {
    renderHome();

    await userEvent.type(screen.getByRole('textbox', { name: /search products/i }), 'game');
    await userEvent.click(screen.getByRole('button', { name: /gaming/i }));

    expect(mockUseProducts).toHaveBeenLastCalledWith({ search: 'game', tag: 'Gaming' });
  });
});
