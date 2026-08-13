import * as stylex from '@stylexjs/stylex';
import {layout} from '../tokens.stylex';
import type {SkillGroup} from '../content/schema';

const styles = stylex.create({
  section: {
    scrollMarginTop: layout.navHeight,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    margin: '0 0 1.5rem',
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
  group: {
    // Label beside the chips on desktop, stacked above them on mobile. The
    // flex-basis pair does that without a media query: once the label and the
    // chip row can no longer both fit, the row wraps.
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: '0.5rem 1.5rem',
    paddingBlock: '0.875rem',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'var(--color-border)',
  },
  groupName: {
    flex: '0 0 9rem',
    margin: 0,
    paddingBlockStart: '0.1875rem',
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-secondary)',
  },
  chips: {
    flex: '1 1 18rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4375rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  chip: {
    paddingBlock: '0.1875rem',
    paddingInline: '0.625rem',
    borderRadius: '999px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      // Same mix as the project cards: `--color-border-emphasized` on its own
      // does not clear 3:1 against the light page.
      default: 'color-mix(in srgb, var(--color-border-emphasized) 70%, var(--color-text-primary))',
      ':hover': 'var(--color-accent)',
    },
    backgroundColor: 'var(--color-background-card)',
    color: 'var(--color-text-primary)',
    fontSize: '0.8125rem',
    whiteSpace: 'nowrap',
  },
});

export interface SkillsProps {
  groups: SkillGroup[];
}

export function Skills({groups}: SkillsProps) {
  if (groups.length === 0) return null;
  return (
    <section id="skills" aria-labelledby="skills-heading" {...stylex.props(styles.section)}>
      <h2 id="skills-heading" {...stylex.props(styles.heading)}>
        Skills
      </h2>
      {groups.map((group) => (
        <div key={group.group} {...stylex.props(styles.group)}>
          <h3 {...stylex.props(styles.groupName)}>{group.group}</h3>
          <ul {...stylex.props(styles.chips)}>
            {group.items.map((item) => (
              <li key={item} {...stylex.props(styles.chip)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
