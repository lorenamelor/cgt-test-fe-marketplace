import { render, screen, fireEvent } from '../../../../config/test/testUtils';
import { products } from '../../../../shared/types/product';
import type { ProductDetailsProps } from './productDetails';
import { ProductDetails } from './productDetails';

const product = products.find((p) => p.id === 'game-boy-color') ?? products[0];

function renderDetails(overrides: Partial<ProductDetailsProps> = {}) {
  const defaultDetails = [
    { label: 'Brand', value: 'Nintendo' },
    { label: 'Year', value: '1998' },
    { label: 'Condition', value: 'Mint' },
  ];

  const onAddToCart = jest.fn();
  const onAddAndGoToCart = jest.fn();

  const result = render(
    <ProductDetails
      product={product}
      details={defaultDetails}
      rating={4.2}
      reviewCount={124}
      onAddToCart={onAddToCart}
      onAddAndGoToCart={onAddAndGoToCart}
      {...overrides}
    />,
  );

  return { ...result, onAddToCart, onAddAndGoToCart };
}

describe('ProductDetails', () => {
  it('should render product main information matching the design', () => {
    renderDetails();

    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    expect(screen.getByText('$399.00', { exact: false })).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add and go to cart/i })).toBeInTheDocument();
  });

  it('should render product detail rows', () => {
    renderDetails();

    expect(screen.getByText(/brand/i)).toBeInTheDocument();
    expect(screen.getByText(/nintendo/i)).toBeInTheDocument();
    expect(screen.getByText(/year/i)).toBeInTheDocument();
    expect(screen.getByText(/1998/i)).toBeInTheDocument();
  });

  it('should call onAddToCart when clicking the button', () => {
    const { onAddToCart } = renderDetails();

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(product.id);
  });

  it('should call onAddAndGoToCart when clicking Add and Go to Cart', () => {
    const { onAddAndGoToCart } = renderDetails();

    fireEvent.click(screen.getByRole('button', { name: /add and go to cart/i }));

    expect(onAddAndGoToCart).toHaveBeenCalledWith(product.id);
  });
});

