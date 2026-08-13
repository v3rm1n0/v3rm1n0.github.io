import type {Project} from '../content/schema';

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({project}: ProjectCardProps) {
  return (
    <article>
      <h3>
        <a href={project.url} rel="noopener noreferrer" target="_blank">
          {project.name}
        </a>
      </h3>
      <p>{project.tagline}</p>
      <p>{project.description}</p>
      <p data-language>{project.language}</p>
      <ul aria-label={`Tags for ${project.name}`}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {project.mirrorUrl !== null && (
        <a href={project.mirrorUrl} rel="noopener noreferrer" target="_blank">
          {`Mirror of ${project.name} on GitHub`}
        </a>
      )}
    </article>
  );
}
