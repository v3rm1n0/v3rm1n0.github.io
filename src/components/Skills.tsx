import type {SkillGroup} from '../content/schema';

export interface SkillsProps {
  groups: SkillGroup[];
}

export function Skills({groups}: SkillsProps) {
  if (groups.length === 0) return null;
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills</h2>
      {groups.map((group) => (
        <div key={group.group}>
          <h3>{group.group}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
