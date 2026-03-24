import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '../../config/test/testUtils';
import { useProduct } from '../../shared/hooks/useProduct';
import { products } from '../../shared/types/product';
import { Product } from './product';

jest.mock('../../shared/hooks/useProduct');
jest.mock('../../shared/hooks/useRelatedProducts', () => ({
  useRelatedProducts: () => ({
    data: [],
    isPending: false,
    isError: false,
    isRefetching: false,
    refetch: jest.fn(),
  }),
}));

const mockUseProduct = useProduct as jest.Mock;

function renderProductAt(path = '/products/tamagotchi') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/products/:productId" element={<Product />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('Product page', () => {
  beforeEach(() => {
    mockUseProduct.mockReturnValue({
      data: products[0],
      isPending: false,
      isError: false,
      isRefetching: false,
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseProduct.mockReset();
  });

  it('should render backlink and real product content without requests', () => {
    renderProductAt();

    expect(screen.getByRole('link', { name: /back to shop/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: products[0].name })).toBeInTheDocument();
  });
});
