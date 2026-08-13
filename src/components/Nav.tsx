import * as stylex from '@stylexjs/stylex';
import {ThemeToggle} from './ThemeToggle';
import {layout} from '../tokens.stylex';
import type {Mode} from '../theme';

export const SECTIONS = [
  {id: 'about', label: 'About'},
  {id: 'skills', label: 'Skills'},
  {id: 'projects', label: 'Projects'},
  {id: 'contact', label: 'Contact'},
] as const;

const styles = stylex.create({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    width: '100%',
    // A flat token colour would hide the page scrolling underneath, which is
    // the whole point of a translucent bar. color-mix keeps it theme-driven.
    backgroundColor: 'color-mix(in srgb, var(--color-background-body) 82%, transparent)',
    backdropFilter: 'saturate(1.6) blur(10px)',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'var(--color-border-emphasized)',
  },
  skipLink: {
    position: 'fixed',
    top: {default: '-4rem', ':focus': '0.5rem'},
    left: '0.5rem',
    zIndex: 50,
    paddingBlock: '0.5rem',
    paddingInline: '0.875rem',
    borderRadius: 'var(--radius-element)',
    backgroundColor: 'var(--color-background-card)',
    color: 'var(--color-text-primary)',
    fontSize: '0.875rem',
    fontWeight: 600,
    textDecoration: 'none',
    // Only while focused: parked off-screen the shadow still bleeds a pale
    // smudge across the top of the header.
    boxShadow: {default: 'none', ':focus': 'var(--shadow-high)'},
    outlineColor: 'var(--color-accent)',
    outlineStyle: {default: 'none', ':focus-visible': 'solid'},
    outlineWidth: '2px',
    outlineOffset: '2px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: {default: '1.25rem', '@media (max-width: 640px)': '0.625rem'},
    minHeight: layout.navHeight,
    maxWidth: layout.maxWidth,
    marginInline: 'auto',
    paddingInline: {default: layout.gutter, '@media (max-width: 640px)': '0.875rem'},
  },
  brand: {
    flexShrink: 0,
    fontSize: {default: '1rem', '@media (max-width: 640px)': '0.875rem'},
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: 'var(--color-text-primary)',
    whiteSpace: 'nowrap',
  },
  list: {
    display: 'flex',
    // Never wrap: on a narrow screen the links shrink instead of stacking
    // under the name, which is what Step 2 of the brief asks for.
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: {default: '1rem', '@media (max-width: 640px)': '0.5rem'},
    listStyle: 'none',
    marginBlock: 0,
    // The auto end-margin absorbs the free space, which pushes the theme
    // toggle to the far right without wrapping it in a spacer element.
    marginInlineStart: 0,
    marginInlineEnd: 'auto',
    padding: 0,
    minWidth: 0,
  },
  link: {
    display: 'block',
    paddingBlock: '0.25rem',
    fontSize: {default: '0.875rem', '@media (max-width: 640px)': '0.75rem'},
    color: {
      default: 'var(--color-text-secondary)',
      ':hover': 'var(--color-text-primary)',
    },
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    borderRadius: 'var(--radius-inner)',
    outlineColor: 'var(--color-accent)',
    outlineStyle: {default: 'none', ':focus-visible': 'solid'},
    outlineWidth: '2px',
    outlineOffset: '3px',
  },
});

export interface NavProps {
  name: string;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function Nav({name, mode, onModeChange}: NavProps) {
  return (
    <header {...stylex.props(styles.header)}>
      <a href="#main" {...stylex.props(styles.skipLink)}>
        Skip to content
      </a>
      <nav aria-label="Main" {...stylex.props(styles.nav)}>
        <span {...stylex.props(styles.brand)}>{name}</span>
        <ul {...stylex.props(styles.list)}>
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} {...stylex.props(styles.link)}>
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle mode={mode} onChange={onModeChange} />
      </nav>
    </header>
  );
}
