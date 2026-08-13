import type {Content} from '../content/schema';

export const validContent: Content = {
  meta: {
    name: 'Niklas',
    tagline: 'Systems and privacy',
    location: 'Germany',
    pageTitle: 'Niklas',
    metaDescription: 'Personal site of Niklas.',
  },
  about: {heading: 'About', paragraphs: ['First paragraph.', 'Second.']},
  skills: [{group: 'Systems', items: ['NixOS', 'Linux']}],
  projects: [
    {
      id: 'tessera',
      name: 'Tessera',
      tagline: 'Entry monitoring',
      description: 'Roles, QR codes, mobile scanner.',
      language: 'JavaScript',
      tags: ['web'],
      url: 'https://codeberg.org/v3rm1n/Tessera',
      mirrorUrl: 'https://github.com/v3rm1n0/Tessera',
      featured: false,
    },
    {
      id: 'nix-flake-graph',
      name: 'nix-flake-graph',
      tagline: 'Flake structure as SVG',
      description: 'Renders diagrams of a flake.',
      language: 'Rust',
      tags: ['nix'],
      url: 'https://codeberg.org/v3rm1n/nix-flake-graph',
      mirrorUrl: null,
      featured: true,
    },
  ],
  contributions: [
    {
      project: 'nixpkgs',
      role: 'Package maintainer',
      detail: 'Maintains stoat-desktop.',
      url: 'https://github.com/NixOS/nixpkgs',
    },
  ],
  contact: [{label: 'Email', href: 'mailto:mail@v3rm1n.dev', kind: 'email'}],
  legal: null,
};

/** Deep clone so a test can mutate one field without affecting others. */
export function contentFixture(): Content {
  return structuredClone(validContent);
}
