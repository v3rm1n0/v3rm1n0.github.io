import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Footer} from './Footer';

describe('Footer', () => {
  it('renders the name', () => {
    render(<Footer name="Niklas" legal={null} />);
    expect(screen.getByText(/niklas/i)).toBeInTheDocument();
  });

  it('omits the legal block when legal is null', () => {
    render(<Footer name="Niklas" legal={null} />);
    expect(screen.queryByRole('heading', {name: /impressum/i})).toBeNull();
  });

  it('renders the legal block when present', () => {
    render(
      <Footer name="Niklas" legal={{heading: 'Impressum', body: ['Line one', 'Line two']}} />,
    );
    expect(screen.getByRole('heading', {name: /impressum/i})).toBeInTheDocument();
    expect(screen.getByText('Line one')).toBeInTheDocument();
  });
});
