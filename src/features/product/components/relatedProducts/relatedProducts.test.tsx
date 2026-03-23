import { MemoryRouter } from 'react-router-dom';
import { act, render, screen, fireEvent } from '../../../../config/test/testUtils';
import { products, type ProductId } from '../../../../shared/types/product';
import { useCartStore } from '../../../../shared/stores/cart';
import { RelatedProducts } from './relatedProducts';

const mockUseRelatedProducts = jest.fn();

jest.mock('../../../../shared/hooks/useRelatedProducts', () => ({
  useRelatedProducts: (id: string) => mockUseRelatedProducts(id),
}));

function renderRelated(productId: ProductId = 'game-boy-color') {
  return render(
    <MemoryRouter>
      <RelatedProducts productId={productId} />
    </MemoryRouter>,
  );
}

describe('RelatedProducts', () => {
  beforeEach(() => {
    mockUseRelatedProducts.mockReset();
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('should render nothing while loading', () => {
    mockUseRelatedProducts.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      isRefetching: false,
      refetch: jest.fn(),
    });

    const { container } = renderRelated();

    expect(container.firstChild).toBeNull();
  });

  it('should render error state with retry when the query fails', () => {
    const refetch = jest.fn();
    mockUseRelatedProducts.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      isRefetching: false,
      refetch,
    });

    renderRelated();

    expect(screen.getByText(/we couldn't load related products/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(refetch).toHaveBeenCalled();
  });

  it('should render nothing when there are no related products', () => {
    mockUseRelatedProducts.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      isRefetching: false,
      refetch: jest.fn(),
    });

    const { container } = renderRelated();

    expect(container.firstChild).toBeNull();
  });

  it('should render related product cards when data is available', () => {
    const related = [products[0], products[1]];
    mockUseRelatedProducts.mockReturnValue({
      data: related,
      isPending: false,
      isError: false,
      isRefetching: false,
      refetch: jest.fn(),
    });

    renderRelated();

    expect(screen.getByRole('heading', { name: /related products/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: related[0].name }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: related[1].name }).length).toBeGreaterThan(0);
  });
});
