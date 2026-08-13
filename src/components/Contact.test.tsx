import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Contact} from './Contact';

describe('Contact', () => {
  it('renders a link per entry with its href', () => {
    render(
      <Contact
        links={[
          {label: 'Email', href: 'mailto:mail@v3rm1n.dev', kind: 'email'},
          {label: 'Codeberg', href: 'https://codeberg.org/v3rm1n', kind: 'forge'},
        ]}
      />,
    );
    expect(screen.getByRole('link', {name: /email/i})).toHaveAttribute(
      'href',
      'mailto:mail@v3rm1n.dev',
    );
    expect(screen.getByRole('link', {name: /codeberg/i})).toHaveAttribute(
      'href',
      'https://codeberg.org/v3rm1n',
    );
  });

  it('renders a glyph for every known kind and for an unknown one', () => {
    const {container} = render(
      <Contact
        links={[
          {label: 'a', href: '#', kind: 'email'},
          {label: 'b', href: '#', kind: 'forge'},
          {label: 'c', href: '#', kind: 'pgp'},
          {label: 'd', href: '#', kind: 'matrix'},
          {label: 'e', href: '#', kind: 'other'},
        ]}
      />,
    );
    expect(container.querySelectorAll('[data-kind]')).toHaveLength(5);
  });

  it('does not add rel=noopener to a mailto link', () => {
    render(<Contact links={[{label: 'Email', href: 'mailto:x@y.z', kind: 'email'}]} />);
    expect(screen.getByRole('link', {name: /email/i})).not.toHaveAttribute('rel');
  });
});
