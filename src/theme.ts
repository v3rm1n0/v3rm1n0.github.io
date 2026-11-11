import {v3rm1nTheme} from './v3rm1n';

export type Mode = 'system' | 'light' | 'dark';

export const MODE_STORAGE_KEY = 'portfolio-theme-mode';

const MODES: readonly Mode[] = ['system', 'light', 'dark'];

export const portfolioTheme = v3rm1nTheme;

export function loadMode(): Mode {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 'system';
  }
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
