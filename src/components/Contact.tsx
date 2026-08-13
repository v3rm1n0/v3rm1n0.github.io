import * as stylex from '@stylexjs/stylex';
import {layout} from '../tokens.stylex';
import type {ContactKind, ContactLink} from '../content/schema';

const GLYPHS: Record<ContactKind, string> = {
  email: '✉',
  forge: '⑂',
  pgp: '🔑',
  matrix: '⬢',
  other: '→',
};

const styles = stylex.create({
  section: {
    scrollMarginTop: layout.navHeight,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: '0 0 1.25rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
    '::after': {
      content: '""',
      flex: '1 1 auto',
      height: '1px',
      backgroundColor: 'var(--color-border-emphasized)',
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.625rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    paddingBlock: '0.4375rem',
    paddingInline: '0.875rem',
    borderRadius: 'var(--radius-element)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: 'color-mix(in srgb, var(--color-border-emphasized) 70%, var(--color-text-primary))',
      ':hover': 'var(--color-accent)',
    },
    backgroundColor: 'var(--color-background-card)',
    color: 'var(--color-text-primary)',
    fontSize: '0.9375rem',
    fontWeight: 500,
    textDecoration: 'none',
    outlineColor: 'var(--color-accent)',
    outlineStyle: {default: 'none', ':focus-visible': 'solid'},
    outlineWidth: '2px',
    outlineOffset: '3px',
  },
  glyph: {
    fontSize: '0.9375rem',
    lineHeight: 1,
    color: 'var(--color-accent)',
  },
});

export interface ContactProps {
  links: ContactLink[];
}

function isExternal(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

export function Contact({links}: ContactProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading" {...stylex.props(styles.section)}>
      <h2 id="contact-heading" {...stylex.props(styles.heading)}>
        Contact
      </h2>
      <ul {...stylex.props(styles.list)}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(isExternal(link.href)
                ? {rel: 'noopener noreferrer', target: '_blank'}
                : {})}
              {...stylex.props(styles.link)}
            >
              <span aria-hidden="true" data-kind={link.kind} {...stylex.props(styles.glyph)}>
                {GLYPHS[link.kind]}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
