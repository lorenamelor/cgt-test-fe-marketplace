import userEvent from '@testing-library/user-event';
import { act, render, screen, within } from '../../config/test/testUtils';
import App from '../../App';
import { useCartStore } from '../../shared/stores/cart';
import { products } from '../../shared/types/product';

describe('Product page - integration', () => {
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

  it('should navigate from Home to Product and update cart count after add to cart', async () => {
    render(<App />);
    const firstProductName = products[0].name;
    const productCardLinks = await screen.findAllByRole('link', {
      name: firstProductName,
    });
    await userEvent.click(productCardLinks[0]);

    const productInfo = await screen.findByRole('region', { name: /^product information$/i });
    const addToCartButton = within(productInfo).getByRole('button', { name: /add to cart/i });
    await userEvent.click(addToCartButton);

    const cartLink = screen.getByRole('link', { name: /open cart/i });
    expect(within(cartLink).getByText('1')).toBeInTheDocument();
  });
});
