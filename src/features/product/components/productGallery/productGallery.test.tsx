import { render, screen, fireEvent } from '../../../../config/test/testUtils';
import { products } from '../../../../shared/types/product';
import type { ProductGalleryProps } from './productGallery';
import { ProductGallery } from './productGallery';

const product = products[0];

function renderGallery(overrides: Partial<ProductGalleryProps> = {}) {
  return render(<ProductGallery product={product} {...overrides} />);
}

describe('ProductGallery', () => {
  it('should render main image and thumbnails', () => {
    renderGallery();

    const images = screen.getAllByRole('img', { name: product.name });
    expect(images.length).toBeGreaterThanOrEqual(4);
  });

  it('should change active image when clicking a thumbnail', () => {
    renderGallery();

    const buttons = screen.getAllByRole('button');
    const [firstButton, secondButton] = buttons;

    expect(firstButton).toHaveClass('border-primary');
    expect(secondButton).not.toHaveClass('border-primary');

    fireEvent.click(secondButton);

    expect(secondButton).toHaveClass('border-primary');
  });
});
