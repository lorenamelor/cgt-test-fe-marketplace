import { render, screen, fireEvent } from '../../../config/test/testUtils';
import { Input } from './input';

describe('Input', () => {
  it('should associate label with the control and accept user input', () => {
    render(<Input label="Email" defaultValue="" />);

    const field = screen.getByRole('textbox', { name: /email/i });
    fireEvent.change(field, { target: { value: 'a@b.com' } });
    expect(field).toHaveValue('a@b.com');
  });

  it('should surface validation errors', () => {
    render(<Input label="Name" id="name-input" error="Required" />);

    expect(screen.getByRole('alert')).toHaveTextContent('Required');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });
});
