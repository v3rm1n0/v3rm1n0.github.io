import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Nav, SECTIONS} from './Nav';

describe('Nav', () => {
  it('renders a link for every section', () => {
    render(<Nav name="Niklas" mode="system" onModeChange={() => {}} />);
    for (const section of SECTIONS) {
      const link = screen.getByRole('link', {name: section.label});
      expect(link).toHaveAttribute('href', `#${section.id}`);
    }
  });

  it('renders the name', () => {
    render(<Nav name="Niklas" mode="system" onModeChange={() => {}} />);
    expect(screen.getByText('Niklas')).toBeInTheDocument();
  });

  it('includes the theme toggle', () => {
    render(<Nav name="Niklas" mode="system" onModeChange={() => {}} />);
    expect(screen.getByRole('button', {name: /switch to/i})).toBeInTheDocument();
  });

  it('exposes the four expected sections in order', () => {
    expect(SECTIONS.map((s) => s.id)).toEqual(['about', 'skills', 'projects', 'contact']);
  });
});
