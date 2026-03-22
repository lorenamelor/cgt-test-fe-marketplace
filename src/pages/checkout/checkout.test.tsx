import userEvent from '@testing-library/user-event';
import { act, render, screen, within } from '../../config/test/testUtils';
import App from '../../App';
import { useCartStore } from '../../shared/stores/cart';

describe('Checkout page - integration', () => {
  afterEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('should show checkout summary after proceeding from cart', async () => {
    act(() => {
      useCartStore.setState({
        items: [{ productId: 'tamagotchi', quantity: 1 }],
      });
    });
    expect(useCartStore.getState().items.length).toBeGreaterThan(0);

    render(<App />);

    await userEvent.click(screen.getByRole('link', { name: /open cart/i }));
    expect(await screen.findByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /proceed to checkout/i }));

    expect(await screen.findByRole('heading', { name: /checkout/i })).toBeInTheDocument();

    const checkoutSummary = screen.getByRole('complementary');
    expect(
      within(checkoutSummary).getByRole('heading', { name: /order summary/i }),
    ).toBeInTheDocument();

    const summaryScope = within(checkoutSummary);
    expect(summaryScope.getByText(/subtotal/i)).toBeInTheDocument();
    expect(summaryScope.getAllByText('$129.00').length).toBeGreaterThan(0);
    expect(summaryScope.getByText('Shipping')).toBeInTheDocument();
    expect(summaryScope.getByText('$9.99')).toBeInTheDocument();
    expect(summaryScope.getByText('Tax')).toBeInTheDocument();
    expect(summaryScope.getByText('$10.32')).toBeInTheDocument();
    expect(summaryScope.getByText('Total')).toBeInTheDocument();
    expect(summaryScope.getByText('$149.31')).toBeInTheDocument();
    expect(summaryScope.getByText(/qty:\s*1/i)).toBeInTheDocument();
  });
});
