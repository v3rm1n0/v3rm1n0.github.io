import * as stylex from '@stylexjs/stylex';
import {layout} from '../tokens.stylex';
import type {Meta} from '../content/schema';

const styles = stylex.create({
  section: {
    position: 'relative',
    scrollMarginTop: layout.navHeight,
    paddingBlockStart: {default: '4.5rem', '@media (max-width: 640px)': '2.75rem'},
    paddingBlockEnd: {default: '0.5rem', '@media (max-width: 640px)': '0.5rem'},
    // Cancel `main`'s gutter and re-apply it as padding, so the dot grid runs
    // the full width of the container instead of stopping at the text column.
    marginInline: {
      default: `calc(-1 * ${layout.gutter})`,
      '@media (max-width: 640px)': '-1rem',
    },
    paddingInline: {default: layout.gutter, '@media (max-width: 640px)': '1rem'},
    // The dot grid, on the hero only. Two background layers rather than a
    // mask: the first (painted on top) is a wash of the page colour that
    // fades the dots out towards the bottom, the second is the grid itself.
    // A `mask` would fade the hero text along with the dots, and moving the
    // grid to a `z-index: -1` pseudo-element hides it behind `body`'s own
    // background — `<html>` carries a background, so body's does not
    // propagate to the canvas and paints above negative-z-index content.
    //
    // The dot colour is derived from the text colour, so the grid inverts
    // with the mode: light dots on the dark page, dark dots on the light one.
    backgroundImage:
      'linear-gradient(to bottom, transparent 0%, transparent 35%, var(--color-background-body) 95%), radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-text-primary) 26%, transparent) 1px, transparent 0)',
    backgroundSize: '100% 100%, 22px 22px',
    backgroundRepeat: 'no-repeat, repeat',
  },
  location: {
    margin: 0,
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
  name: {
    marginBlock: '0.5rem 0',
    fontSize: 'clamp(2.25rem, 8vw, 3.5rem)',
    fontWeight: 750,
    letterSpacing: '-0.035em',
    lineHeight: 1.05,
    color: 'var(--color-text-primary)',
  },
  tagline: {
    marginBlock: '0.75rem 0',
    maxWidth: '38ch',
    fontSize: 'clamp(1.0625rem, 3.5vw, 1.375rem)',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.35,
    color: 'var(--color-accent)',
  },
  rule: {
    display: 'block',
    width: '4.5rem',
    height: '3px',
    marginBlockStart: '1.25rem',
    borderRadius: '2px',
    backgroundImage: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-alt))',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    listStyle: 'none',
    margin: '1.5rem 0 0',
    padding: 0,
  },
  chip: {
    paddingBlock: '0.25rem',
    paddingInline: '0.6875rem',
    borderRadius: '999px',
    borderWidth: '1px',
    borderStyle: 'solid',
    // 80% of the accent clears 3:1 against the page in both modes; the tint
    // stays at 6% so the accent label on top keeps its 4.5:1.
    borderColor: 'color-mix(in srgb, var(--color-accent) 80%, transparent)',
    backgroundColor: 'color-mix(in srgb, var(--color-accent) 6%, transparent)',
    color: 'var(--color-accent)',
    fontSize: '0.8125rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
});

export interface HeroProps {
  meta: Meta;
  chips: string[];
}

export function Hero({meta, chips}: HeroProps) {
  return (
    <section aria-labelledby="hero-name" {...stylex.props(styles.section)}>
      <p {...stylex.props(styles.location)}>{meta.location}</p>
      <h1 id="hero-name" {...stylex.props(styles.name)}>
        {meta.name}
      </h1>
      <p {...stylex.props(styles.tagline)}>{meta.tagline}</p>
      <span aria-hidden="true" {...stylex.props(styles.rule)} />
      {chips.length > 0 && (
        <ul aria-label="Core skills" {...stylex.props(styles.chips)}>
          {chips.map((chip) => (
            <li key={chip} {...stylex.props(styles.chip)}>
              {chip}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
