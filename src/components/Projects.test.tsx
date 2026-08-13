import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Projects} from './Projects';
import {contentFixture} from '../test/fixtures';

describe('Projects', () => {
  it('renders featured projects first', () => {
    render(<Projects projects={contentFixture().projects} />);
    const headings = screen.getAllByRole('heading', {level: 3});
    expect(headings[0]).toHaveTextContent('nix-flake-graph');
  });

  it('links each project to its primary url', () => {
    render(<Projects projects={contentFixture().projects} />);
    expect(screen.getByRole('link', {name: /nix-flake-graph/i})).toHaveAttribute(
      'href',
      'https://codeberg.org/v3rm1n/nix-flake-graph',
    );
  });

  it('renders a mirror link only when mirrorUrl is set', () => {
    render(<Projects projects={contentFixture().projects} />);
    const mirrors = screen.getAllByRole('link', {name: /mirror/i});
    expect(mirrors).toHaveLength(1);
    expect(mirrors[0]).toHaveAttribute('href', 'https://github.com/v3rm1n0/Tessera');
  });

  it('renders the language and tags', () => {
    render(<Projects projects={contentFixture().projects} />);
    expect(screen.getByText('Rust')).toBeInTheDocument();
    expect(screen.getByText('nix')).toBeInTheDocument();
  });

  it('renders an empty state rather than crashing on no projects', () => {
    render(<Projects projects={[]} />);
    expect(screen.getByText(/no projects listed/i)).toBeInTheDocument();
  });

  it('marks external links safe', () => {
    render(<Projects projects={contentFixture().projects} />);
    const link = screen.getByRole('link', {name: /nix-flake-graph/i});
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
