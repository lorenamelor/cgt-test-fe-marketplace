import userEvent from '@testing-library/user-event';
import { act, render, screen, within } from './config/test/testUtils';
import App from './App';
import { useCartStore } from './shared/stores/cart';
import { products } from './shared/types/product';

describe('App - integration', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  afterEach(() => {
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('should complete the full purchase flow from Home to Checkout', async () => {
    render(<App />);

    const firstProductName = products[0].name;
    const productCardLinks = await screen.findAllByRole('link', { name: firstProductName });
    await userEvent.click(productCardLinks[0]);

    const productInfo = await screen.findByRole('region', { name: /^product information$/i });
    await userEvent.click(within(productInfo).getByRole('button', { name: /add to cart/i }));

    await userEvent.click(screen.getByRole('link', { name: /open cart/i }));
    expect(await screen.findByRole('heading', { name: /shopping cart/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: /proceed to checkout/i }));
    expect(await screen.findByRole('heading', { name: /checkout/i })).toBeInTheDocument();
  });
});
