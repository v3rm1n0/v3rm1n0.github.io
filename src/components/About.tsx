import * as stylex from '@stylexjs/stylex';
import {layout} from '../tokens.stylex';
import type {About as AboutContent} from '../content/schema';

const styles = stylex.create({
  section: {
    scrollMarginTop: layout.navHeight,
  },
  // The uppercase eyebrow used for every section heading on the page. Keeping
  // section titles small and quiet is what lets the project grid and the hero
  // carry the visual weight, which is the point of direction B.
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
  paragraph: {
    maxWidth: '68ch',
    marginBlock: '0 0.9rem',
    color: 'var(--color-text-secondary)',
    fontSize: '1rem',
    lineHeight: 1.7,
  },
});

export interface AboutProps {
  about: AboutContent;
}

export function About({about}: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading" {...stylex.props(styles.section)}>
      <h2 id="about-heading" {...stylex.props(styles.heading)}>
        {about.heading}
      </h2>
      {about.paragraphs.map((paragraph, i) => (
        <p key={i} {...stylex.props(styles.paragraph)}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}
