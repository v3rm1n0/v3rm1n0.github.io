import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Skills} from './Skills';
import {contentFixture} from '../test/fixtures';

describe('Skills', () => {
  it('renders each group name and item', () => {
    render(<Skills groups={contentFixture().skills} />);
    expect(screen.getByText('Systems')).toBeInTheDocument();
    expect(screen.getByText('NixOS')).toBeInTheDocument();
    expect(screen.getByText('Linux')).toBeInTheDocument();
  });

  it('renders nothing when there are no groups', () => {
    const {container} = render(<Skills groups={[]} />);
    expect(container.querySelector('section#skills')).toBeNull();
  });
});
