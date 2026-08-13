import * as stylex from '@stylexjs/stylex';
import {sortProjects, type Project} from '../content/schema';
import {ProjectCard} from './ProjectCard';
import {layout} from '../tokens.stylex';

const styles = stylex.create({
  // The section is the grid. Putting `display: grid` here rather than on a
  // wrapper keeps the DOM the tests pin untouched — the heading simply spans
  // every column. auto-fit + an 18rem floor gives two-up on desktop and
  // one-up on mobile with no media query.
  section: {
    scrollMarginTop: layout.navHeight,
    display: 'grid',
    // The brief suggests an 18rem floor, but at the 68rem container width that
    // fits three columns, not the two the direction calls for. 24rem is the
    // floor that actually yields two-up on desktop and one-up on mobile.
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(24rem, 100%), 1fr))',
    gap: '1rem',
    alignItems: 'stretch',
  },
  heading: {
    gridColumn: '1 / -1',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: '0 0 0.25rem',
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
  empty: {
    gridColumn: '1 / -1',
    margin: 0,
    color: 'var(--color-text-secondary)',
  },
});

export interface ProjectsProps {
  projects: Project[];
}

export function Projects({projects}: ProjectsProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      {...stylex.props(styles.section)}
    >
      <h2 id="projects-heading" {...stylex.props(styles.heading)}>
        Projects
      </h2>
      {projects.length === 0 ? (
        <p {...stylex.props(styles.empty)}>No projects listed yet.</p>
      ) : (
        sortProjects(projects).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </section>
  );
}
