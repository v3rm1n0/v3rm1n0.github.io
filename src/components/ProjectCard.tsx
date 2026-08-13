import * as stylex from '@stylexjs/stylex';
import type {Project} from '../content/schema';

const styles = stylex.create({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    paddingBlock: '1.125rem 1rem',
    paddingInline: '1.125rem',
    borderRadius: 'var(--radius-container)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      // `--color-border-emphasized` alone only reaches 2.8:1 against the page
      // in light mode. Pulling it towards the text colour clears 3:1 in both
      // modes from one declaration — it darkens in light, lightens in dark.
      default: 'color-mix(in srgb, var(--color-border-emphasized) 70%, var(--color-text-primary))',
      ':hover': 'var(--color-accent)',
      ':focus-within': 'var(--color-accent)',
    },
    backgroundColor: 'var(--color-background-card)',
    boxShadow: {default: 'none', ':hover': 'var(--shadow-med)'},
    transform: {default: 'none', ':hover': 'translateY(-2px)'},
    transitionProperty: 'border-color, box-shadow, transform',
    transitionDuration: 'var(--duration-fast)',
    transitionTimingFunction: 'var(--ease-standard)',
    // The gradient hairline along the top edge is the one place the blue →
    // purple pairing from the mockup appears at full strength. Decorative, so
    // it carries no contrast obligation.
    '::before': {
      content: '""',
      position: 'absolute',
      insetBlockStart: 0,
      insetInlineStart: 0,
      insetInlineEnd: 0,
      height: '2px',
      backgroundImage: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-alt))',
      opacity: {default: 0.55, ':hover': 1},
      transitionProperty: 'opacity',
      transitionDuration: 'var(--duration-fast)',
    },
  },
  title: {
    // Room for the absolutely positioned language badge in the corner.
    margin: '0 5.5rem 0 0',
    fontSize: '1.0625rem',
    fontWeight: 650,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  titleLink: {
    color: {default: 'var(--color-text-primary)', ':hover': 'var(--color-accent)'},
    textDecoration: 'none',
    borderRadius: 'var(--radius-inner)',
    outlineColor: 'var(--color-accent)',
    outlineStyle: {default: 'none', ':focus-visible': 'solid'},
    outlineWidth: '2px',
    outlineOffset: '3px',
  },
  tagline: {
    margin: '0.25rem 0 0',
    fontSize: '0.9375rem',
    color: 'var(--color-text-secondary)',
  },
  description: {
    margin: '0.5rem 0 0',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--color-text-secondary)',
  },
  language: {
    position: 'absolute',
    insetBlockStart: '1.125rem',
    insetInlineEnd: '1.125rem',
    margin: 0,
    paddingBlock: '0.125rem',
    paddingInline: '0.5rem',
    maxWidth: '5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    borderRadius: 'var(--radius-inner)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-mix(in srgb, var(--color-accent-alt) 75%, transparent)',
    backgroundColor: 'color-mix(in srgb, var(--color-accent-alt) 12%, transparent)',
    color: 'var(--color-text-primary)',
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.375rem',
    listStyle: 'none',
    // `auto` pins the tag row to the bottom so cards of unequal text length
    // still line their tags up across the grid row.
    margin: 'auto 0 0',
    paddingBlockStart: '0.875rem',
    paddingInline: 0,
  },
  tag: {
    paddingBlock: '0.125rem',
    paddingInline: '0.5rem',
    borderRadius: 'var(--radius-inner)',
    backgroundColor: 'var(--color-background-muted)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-secondary)',
    fontSize: '0.75rem',
  },
  mirror: {
    marginBlockStart: '0.625rem',
    fontSize: '0.75rem',
    color: {default: 'var(--color-text-secondary)', ':hover': 'var(--color-accent)'},
    textDecorationLine: 'underline',
    textDecorationColor: 'var(--color-border-emphasized)',
    textUnderlineOffset: '3px',
    borderRadius: 'var(--radius-inner)',
    outlineColor: 'var(--color-accent)',
    outlineStyle: {default: 'none', ':focus-visible': 'solid'},
    outlineWidth: '2px',
    outlineOffset: '3px',
  },
});

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({project}: ProjectCardProps) {
  return (
    <article {...stylex.props(styles.card)}>
      <h3 {...stylex.props(styles.title)}>
        <a
          href={project.url}
          rel="noopener noreferrer"
          target="_blank"
          {...stylex.props(styles.titleLink)}
        >
          {project.name}
        </a>
      </h3>
      <p {...stylex.props(styles.tagline)}>{project.tagline}</p>
      <p {...stylex.props(styles.description)}>{project.description}</p>
      <p data-language {...stylex.props(styles.language)}>
        {project.language}
      </p>
      <ul aria-label={`Tags for ${project.name}`} {...stylex.props(styles.tags)}>
        {project.tags.map((tag) => (
          <li key={tag} {...stylex.props(styles.tag)}>
            {tag}
          </li>
        ))}
      </ul>
      {project.mirrorUrl !== null && (
        <a
          href={project.mirrorUrl}
          rel="noopener noreferrer"
          target="_blank"
          {...stylex.props(styles.mirror)}
        >
          {`Mirror of ${project.name} on GitHub`}
        </a>
      )}
    </article>
  );
}
