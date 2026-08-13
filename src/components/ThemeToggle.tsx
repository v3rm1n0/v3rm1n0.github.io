import * as stylex from '@stylexjs/stylex';
import {IconButton} from '@astryxdesign/core/IconButton';
import {type Mode, nextMode} from '../theme';

const LABELS: Record<Mode, string> = {
  system: 'Switch to light theme',
  light: 'Switch to dark theme',
  dark: 'Switch to system theme',
};

const GLYPHS: Record<Mode, string> = {
  system: '◐',
  light: '☀',
  dark: '☾',
};

const styles = stylex.create({
  button: {
    flexShrink: 0,
    // Astryx's own focus ring follows the button variant; the brief asks for
    // the accent specifically, so override it here rather than theme-wide.
    outlineColor: 'var(--color-accent)',
    outlineOffset: '3px',
  },
  glyph: {
    fontSize: '1rem',
    lineHeight: 1,
    color: 'var(--color-accent-alt)',
  },
});

export interface ThemeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ThemeToggle({mode, onChange}: ThemeToggleProps) {
  return (
    <IconButton
      label={LABELS[mode]}
      variant="ghost"
      size="sm"
      xstyle={styles.button}
      icon={
        <span aria-hidden="true" {...stylex.props(styles.glyph)}>
          {GLYPHS[mode]}
        </span>
      }
      onClick={() => onChange(nextMode(mode))}
    />
  );
}
