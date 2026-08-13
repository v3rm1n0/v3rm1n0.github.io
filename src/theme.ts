import {defineTheme, type TokenValue} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export type Mode = 'system' | 'light' | 'dark';

export const MODE_STORAGE_KEY = 'portfolio-theme-mode';

const MODES: readonly Mode[] = ['system', 'light', 'dark'];

// `defineTheme`'s `tokens` param types as `Partial<Record<TokenName, TokenValue>>`,
// a closed union that doesn't enumerate `--color-accent-alt` (it's a token this
// theme introduces, not a built-in Astryx token). The runtime implementation
// merely does `Object.entries(input.tokens)` and copies keys through with no
// membership check, so any CSS custom property name works at runtime — this is
// a compile-time-only gap. Typing the object as `Record<string, TokenValue>`
// (broader than, and structurally assignable to, the closed union) satisfies
// the type checker without an `as` cast or dropping the accent-alt token.
const tokens: Record<string, TokenValue> = {
  //                    light      dark
  '--color-accent': ['#4c56d6', '#5b8cff'],
  '--color-accent-alt': ['#7a4fd0', '#a77bff'],
};

export const portfolioTheme = defineTheme({
  name: 'v3rm1n',
  extends: neutralTheme,
  color: {accent: '#5b8cff', neutralStyle: 'cool'},
  radius: {base: 6, multiplier: 1},
  tokens,
});

export function loadMode(): Mode {
  try {
    const stored = localStorage.getItem(MODE_STORAGE_KEY);
    return (MODES as readonly string[]).includes(stored ?? '') ? (stored as Mode) : 'system';
  } catch {
    return 'system';
  }
}

export function saveMode(mode: Mode): void {
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    // Storage unavailable (private mode, disabled). Mode still applies for
    // this page view; it just will not persist.
  }
}

export function nextMode(mode: Mode): Mode {
  return MODES[(MODES.indexOf(mode) + 1) % MODES.length];
}
