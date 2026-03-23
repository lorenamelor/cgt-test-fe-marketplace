import type { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '../../../config/test/testUtils';
import { Header } from './header';

function renderHeader(props: ComponentProps<typeof Header> = {}) {
  return render(
    <MemoryRouter>
      <Header {...props} />
    </MemoryRouter>,
  );
}

describe('Header', () => {
  it('should render logo, cart link and account button', () => {
    renderHeader();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open cart/i })).toHaveAttribute('href', '/cart');
    expect(screen.getByRole('button', { name: /open account/i })).toBeInTheDocument();
  });

  it('should show cart count when greater than zero', () => {
    renderHeader({ cartCount: 3 });

    const cartLink = screen.getByRole('link', { name: /open cart/i });
    expect(within(cartLink).getByText('3')).toBeInTheDocument();
  });
});
