import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../../config/test/testUtils';
import { BackLink } from './backLink';

function renderBackLink() {
  return render(
    <MemoryRouter>
      <BackLink to="/products">Back to list</BackLink>
    </MemoryRouter>,
  );
}

describe('BackLink', () => {
  it('should render a navigable link with the given label', () => {
    renderBackLink();

    const link = screen.getByRole('link', { name: /back to list/i });
    expect(link).toHaveAttribute('href', '/products');
  });
});
