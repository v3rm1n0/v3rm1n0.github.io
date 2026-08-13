import type {Contribution} from '../content/schema';

export interface ContributionsProps {
  contributions: Contribution[];
}

export function Contributions({contributions}: ContributionsProps) {
  if (contributions.length === 0) return null;
  return (
    <div aria-labelledby="contributions-heading">
      <h3 id="contributions-heading">Contributions to other projects</h3>
      <ul>
        {contributions.map((contribution) => (
          <li key={contribution.project}>
            <a href={contribution.url} rel="noopener noreferrer" target="_blank">
              {contribution.project}
            </a>
            <span>{contribution.role}</span>
            <span>{contribution.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
