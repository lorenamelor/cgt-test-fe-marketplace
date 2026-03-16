import { render, screen } from './config/test/testUtils';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const [brand] = screen.getAllByText(/90s shop/i);
  expect(brand).toBeInTheDocument();
  const [homeLink] = screen.getAllByText(/home/i);
  expect(homeLink).toBeInTheDocument();
});
