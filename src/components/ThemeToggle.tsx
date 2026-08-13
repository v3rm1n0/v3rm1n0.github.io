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

export interface ThemeToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ThemeToggle({mode, onChange}: ThemeToggleProps) {
  return (
    <IconButton
      label={LABELS[mode]}
      icon={<span aria-hidden="true">{GLYPHS[mode]}</span>}
      onClick={() => onChange(nextMode(mode))}
    />
  );
}
