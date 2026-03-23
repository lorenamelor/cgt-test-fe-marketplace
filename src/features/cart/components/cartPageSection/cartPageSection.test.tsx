import { MemoryRouter } from 'react-router-dom';
import { act, render, screen, within } from '../../../../config/test/testUtils';
import { useCartStore } from '../../../../shared/stores/cart';
import { products } from '../../../../shared/types/product';
import { CartPageSection } from './cartPageSection';

const tamagotchi = products.find((p) => p.id === 'tamagotchi')!;

function renderCartPageSection() {
  return render(
    <MemoryRouter>
      <CartPageSection />
    </MemoryRouter>,
  );
}

describe('CartPageSection', () => {
  afterEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('should render empty state when the cart has no items', () => {
    act(() => {
      useCartStore.setState({ items: [] });
    });

    renderCartPageSection();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse products/i })).toHaveAttribute('href', '/');
  });

  it('should render line items and order summary when the cart has products', () => {
    act(() => {
      useCartStore.setState({
        items: [{ productId: 'tamagotchi', quantity: 1 }],
      });
    });

    renderCartPageSection();

    expect(screen.getByRole('heading', { name: tamagotchi.name })).toBeInTheDocument();

    const summary = screen.getByRole('complementary');
    expect(within(summary).getByRole('heading', { name: /order summary/i })).toBeInTheDocument();
    expect(within(summary).getByText(/subtotal \(1 item\)/i)).toBeInTheDocument();
    expect(within(summary).getByRole('link', { name: /proceed to checkout/i })).toHaveAttribute(
      'href',
      '/checkout',
    );
  });
});
