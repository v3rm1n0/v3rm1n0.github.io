import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Contributions} from './Contributions';
import {contentFixture} from '../test/fixtures';

describe('Contributions', () => {
  it('renders each contribution', () => {
    render(<Contributions contributions={contentFixture().contributions} />);
    expect(screen.getByText('nixpkgs')).toBeInTheDocument();
    expect(screen.getByText('Package maintainer')).toBeInTheDocument();
    expect(screen.getByText('Maintains stoat-desktop.')).toBeInTheDocument();
  });

  it('renders nothing when the list is empty', () => {
    const {container} = render(<Contributions contributions={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
