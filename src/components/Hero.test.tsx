import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Hero} from './Hero';
import {contentFixture} from '../test/fixtures';

describe('Hero', () => {
  it('renders the name as the page h1', () => {
    render(<Hero meta={contentFixture().meta} chips={['Nix']} />);
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Niklas');
  });

  it('renders the tagline and location', () => {
    render(<Hero meta={contentFixture().meta} chips={[]} />);
    expect(screen.getByText('Systems and privacy')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('renders each chip', () => {
    render(<Hero meta={contentFixture().meta} chips={['Nix', 'Rust']} />);
    expect(screen.getByText('Nix')).toBeInTheDocument();
    expect(screen.getByText('Rust')).toBeInTheDocument();
  });
});
