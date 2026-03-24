import { render, screen, fireEvent } from '../../../config/test/testUtils';
import { ErrorState } from './errorState';

describe('ErrorState', () => {
  it('should show the message and call onRetry when Try again is clicked', () => {
    const onRetry = jest.fn();
    render(<ErrorState message="Something went wrong" isRetrying={false} onRetry={onRetry} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onRetry).toHaveBeenCalled();
  });

  it('should disable retry while refetching', () => {
    render(<ErrorState message="Error" isRetrying onRetry={jest.fn()} />);

    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
  });
});
