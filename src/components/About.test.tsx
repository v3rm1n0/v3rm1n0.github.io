import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {About} from './About';
import {contentFixture} from '../test/fixtures';

describe('About', () => {
  it('renders every paragraph', () => {
    render(<About about={contentFixture().about} />);
    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second.')).toBeInTheDocument();
  });

  it('renders the heading and anchor id', () => {
    const {container} = render(<About about={contentFixture().about} />);
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('About');
    expect(container.querySelector('section#about')).not.toBeNull();
  });
});
