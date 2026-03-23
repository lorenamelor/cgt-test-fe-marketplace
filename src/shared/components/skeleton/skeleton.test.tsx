import { render, screen } from '../../../config/test/testUtils';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('should render a placeholder element', () => {
    const { container } = render(<Skeleton data-testid="sk" className="h-4 w-full" />);

    expect(screen.getByTestId('sk')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('animate-pulse');
  });
});
