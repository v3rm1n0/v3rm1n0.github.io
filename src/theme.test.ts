import {describe, expect, it, beforeEach} from 'vitest';
import {loadMode, saveMode, nextMode, MODE_STORAGE_KEY, portfolioTheme} from './theme';

beforeEach(() => {
  localStorage.clear();
});

describe('nextMode', () => {
  it('cycles system to light to dark and back', () => {
    expect(nextMode('system')).toBe('light');
    expect(nextMode('light')).toBe('dark');
    expect(nextMode('dark')).toBe('system');
  });
});

describe('loadMode', () => {
  it('defaults to system when nothing is stored', () => {
    expect(loadMode()).toBe('system');
  });

  it('returns a stored mode', () => {
    localStorage.setItem(MODE_STORAGE_KEY, 'dark');
    expect(loadMode()).toBe('dark');
  });

  it('falls back to system for an unrecognised stored value', () => {
    localStorage.setItem(MODE_STORAGE_KEY, 'chartreuse');
    expect(loadMode()).toBe('system');
  });
});

describe('saveMode', () => {
  it('round-trips through loadMode', () => {
    saveMode('light');
    expect(localStorage.getItem(MODE_STORAGE_KEY)).toBe('light');
    expect(loadMode()).toBe('light');
  });
});

describe('portfolioTheme', () => {
  it('is a defined theme object', () => {
    expect(portfolioTheme).toBeTruthy();
    expect(typeof portfolioTheme).toBe('object');
  });
});
