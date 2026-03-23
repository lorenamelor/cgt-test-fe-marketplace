import { render, screen, fireEvent } from '../../../config/test/testUtils';
import { Tag } from './tag';

describe('Tag', () => {
  it('should render a button with children', () => {
    const onClick = jest.fn();
    render(<Tag onClick={onClick}>Retro</Tag>);

    fireEvent.click(screen.getByRole('button', { name: /retro/i }));
    expect(onClick).toHaveBeenCalled();
  });
});
