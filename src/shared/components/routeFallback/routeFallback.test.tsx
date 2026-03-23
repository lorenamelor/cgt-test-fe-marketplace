import { render, screen } from '../../../config/test/testUtils';
import { RouteFallback } from './routeFallback';

describe('RouteFallback', () => {
  it('should expose a polite loading status region', () => {
    render(<RouteFallback />);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText(/loading page/i)).toBeInTheDocument();
  });
});
