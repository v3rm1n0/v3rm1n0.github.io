import {sortProjects, type Project} from '../content/schema';
import {ProjectCard} from './ProjectCard';

export interface ProjectsProps {
  projects: Project[];
}

export function Projects({projects}: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      {projects.length === 0 ? (
        <p>No projects listed yet.</p>
      ) : (
        sortProjects(projects).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </section>
  );
}
