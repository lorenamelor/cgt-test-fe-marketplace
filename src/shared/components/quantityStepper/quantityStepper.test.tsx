import { render, screen, fireEvent } from '../../../config/test/testUtils';
import { QuantityStepper } from './quantityStepper';

describe('QuantityStepper', () => {
  it('should display the quantity and invoke increment and decrement handlers', () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();

    render(<QuantityStepper quantity={2} onIncrement={onIncrement} onDecrement={onDecrement} />);

    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /increase quantity/i }));
    expect(onIncrement).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /decrease quantity/i }));
    expect(onDecrement).toHaveBeenCalled();
  });
});
