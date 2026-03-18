import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '../../../config/test/testUtils';
import { products } from '../../types/product';
import { ProductCard } from './productCard';

const product = products[0];

function renderCard(overrides: Partial<React.ComponentProps<typeof ProductCard>> = {}) {
  return render(
    <MemoryRouter>
      <ProductCard
        product={product}
        rating={4}
        reviewCount={124}
        seller="RetroGameVault"
        {...overrides}
      />
    </MemoryRouter>,
  );
}

describe('ProductCard', () => {
  it('should render product info matching the design', () => {
    renderCard();

    expect(screen.getByRole('heading', { name: /tamagotchi original/i })).toBeInTheDocument();
    expect(screen.getByText(/retrogamevault/i)).toBeInTheDocument();
    expect(screen.getByText('$129.00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('should call onAddToCart when button is clicked', () => {
    const handleAddToCart = jest.fn();
    renderCard({ onAddToCart: handleAddToCart });

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(handleAddToCart).toHaveBeenCalledWith('tamagotchi');
  });

  it('should link to the product details page', () => {
    renderCard();

    const links = screen.getAllByRole('link', { name: /tamagotchi original/i });
    for (const link of links) {
      expect(link).toHaveAttribute('href', '/products/tamagotchi');
    }
  });
});
