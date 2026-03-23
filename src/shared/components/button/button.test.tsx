import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '../../../config/test/testUtils';
import { Button } from './button';

describe('Button', () => {
  it('should render a native button and forward click handlers', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save</Button>);

    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render a router link when to is provided', () => {
    render(
      <MemoryRouter>
        <Button to="/cart">Go to cart</Button>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /go to cart/i })).toHaveAttribute('href', '/cart');
  });
});
