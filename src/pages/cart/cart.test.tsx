import userEvent from '@testing-library/user-event';
import { act, render, screen, within } from '../../config/test/testUtils';
import App from '../../App';
import { useCartStore } from '../../shared/stores/cart';

describe('Cart page - integration', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.setState({
        items: [{ productId: 'tamagotchi', quantity: 1 }],
      });
    });
  });

  afterEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('should show subtotal, shipping and total for cart items', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /open cart/i }));

    expect(await screen.findByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();

    const cartOrderSummary = screen.getByRole('complementary');
    expect(
      within(cartOrderSummary).getByRole('heading', { name: /order summary/i }),
    ).toBeInTheDocument();

    const orderSummaryScope = within(cartOrderSummary);
    expect(orderSummaryScope.getByText(/subtotal \(1 item\)/i)).toBeInTheDocument();
    expect(orderSummaryScope.getByText('$129.00')).toBeInTheDocument();
    expect(orderSummaryScope.getByText('Shipping')).toBeInTheDocument();
    expect(orderSummaryScope.getByText('$9.99')).toBeInTheDocument();
    expect(orderSummaryScope.getByText('Total')).toBeInTheDocument();
    expect(orderSummaryScope.getByText('$138.99')).toBeInTheDocument();
  });

  it('should clear all items when Clear Cart is clicked', async () => {
    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /open cart/i }));
    expect(await screen.findByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /clear cart/i }));

    expect(useCartStore.getState().items).toEqual([]);
    expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /clear cart/i })).not.toBeInTheDocument();
  });
});
