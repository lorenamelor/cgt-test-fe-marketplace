import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from './config/test/testUtils';
import App from './App';

jest.mock('./pages/home', () => () => <div>Home Page</div>);

jest.mock('./shared/services/product', () => ({
  getProducts: jest.fn(() => Promise.resolve([])),
  getProductById: jest.fn(() => Promise.resolve(null)),
  getRelatedProducts: jest.fn(() => Promise.resolve([])),
}));

test('renders app header', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
  const [brand] = screen.getAllByText(/90s shop/i);
  expect(brand).toBeInTheDocument();
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});
