import * as stylex from '@stylexjs/stylex';
import {layout} from '../tokens.stylex';
import type {Legal} from '../content/schema';

const styles = stylex.create({
  footer: {
    maxWidth: layout.maxWidth,
    marginBlock: '5rem 0',
    marginInline: 'auto',
    paddingBlock: '1.75rem 3rem',
    paddingInline: {default: layout.gutter, '@media (max-width: 640px)': '1rem'},
    borderBlockStartWidth: '1px',
    borderBlockStartStyle: 'solid',
    borderBlockStartColor: 'var(--color-border-emphasized)',
    color: 'var(--color-text-secondary)',
    fontSize: '0.8125rem',
  },
  legalHeading: {
    margin: '0 0 0.5rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
  legalLine: {
    margin: 0,
    lineHeight: 1.7,
  },
  colophon: {
    margin: '1.5rem 0 0',
    color: 'var(--color-text-secondary)',
  },
});

export interface FooterProps {
  name: string;
  legal: Legal | null;
}

export function Footer({name, legal}: FooterProps) {
  return (
    <footer {...stylex.props(styles.footer)}>
      {legal !== null && (
        <section aria-labelledby="legal-heading">
          <h2 id="legal-heading" {...stylex.props(styles.legalHeading)}>
            {legal.heading}
          </h2>
          {legal.body.map((line, i) => (
            <p key={i} {...stylex.props(styles.legalLine)}>
              {line}
            </p>
          ))}
        </section>
      )}
      <p {...stylex.props(styles.colophon)}>
        {`${name} — built with no trackers, no analytics, and no third-party requests.`}
      </p>
    </footer>
  );
}
