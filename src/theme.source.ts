import {defineTheme, type TokenValue} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const tokens: Record<string, TokenValue> = {
  //                    light      dark
  '--color-accent': ['#4c56d6', '#5b8cff'],
  '--color-accent-alt': ['#7a4fd0', '#a77bff'],
};

export const v3rm1nThemeDefinition = defineTheme({
  name: 'v3rm1n',
  extends: neutralTheme,
  color: {accent: '#5b8cff', neutralStyle: 'cool'},
  radius: {base: 6, multiplier: 1},
  tokens,
});
