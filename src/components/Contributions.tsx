import * as stylex from '@stylexjs/stylex';
import {layout} from '../tokens.stylex';
import type {Contribution} from '../content/schema';

const styles = stylex.create({
  // Deliberately lighter than a project card: no surface fill, no radius, no
  // hover lift. Contributions are supporting evidence, not headline work, and
  // the hierarchy has to say so at a glance.
  block: {
    // Contributions read as a coda to the Projects section rather than a
    // section of their own, so pull them back out of `main`'s section gap.
    marginBlockStart: `calc(2.25rem - ${layout.sectionGap})`,
  },
  heading: {
    margin: '0 0 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderBlockStartWidth: '1px',
    borderBlockStartStyle: 'solid',
    borderBlockStartColor: 'var(--color-border-emphasized)',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: '0.25rem 0.75rem',
    paddingBlock: '0.625rem',
    borderBlockEndWidth: '1px',
    borderBlockEndStyle: 'solid',
    borderBlockEndColor: 'var(--color-border)',
  },
  link: {
    flex: '0 0 auto',
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: {default: 'var(--color-text-primary)', ':hover': 'var(--color-accent)'},
    textDecoration: 'none',
    borderRadius: 'var(--radius-inner)',
    outlineColor: 'var(--color-accent)',
    outlineStyle: {default: 'none', ':focus-visible': 'solid'},
    outlineWidth: '2px',
    outlineOffset: '3px',
  },
  role: {
    flex: '0 0 auto',
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
  detail: {
    flex: '1 1 14rem',
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
  },
});

export interface ContributionsProps {
  contributions: Contribution[];
}

export function Contributions({contributions}: ContributionsProps) {
  if (contributions.length === 0) return null;
  return (
    <div aria-labelledby="contributions-heading" {...stylex.props(styles.block)}>
      <h3 id="contributions-heading" {...stylex.props(styles.heading)}>
        Contributions to other projects
      </h3>
      <ul {...stylex.props(styles.list)}>
        {contributions.map((contribution) => (
          <li key={contribution.project} {...stylex.props(styles.row)}>
            <a
              href={contribution.url}
              rel="noopener noreferrer"
              target="_blank"
              {...stylex.props(styles.link)}
            >
              {contribution.project}
            </a>
            <span {...stylex.props(styles.role)}>{contribution.role}</span>
            <span {...stylex.props(styles.detail)}>{contribution.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
