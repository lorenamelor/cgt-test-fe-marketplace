import { render, screen } from '../../../config/test/testUtils';
import { Card } from './card';

describe('Card', () => {
  it('should render children inside a styled container', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});
