import { render, screen } from './config/test/testUtils';
import App from './App';

jest.mock('./pages/home', () => () => <div>Home Page</div>);

jest.mock('./shared/services/product', () => ({
  getProducts: jest.fn(() => Promise.resolve([])),
  getProductById: jest.fn(() => Promise.resolve(null)),
  getRelatedProducts: jest.fn(() => Promise.resolve([])),
}));

test('renders app header', async () => {
  render(<App />);
  const [brand] = screen.getAllByText(/90s shop/i);
  expect(brand).toBeInTheDocument();
  expect(await screen.findByText(/home page/i)).toBeInTheDocument();
});
