import * as stylex from '@stylexjs/stylex';

/**
 * Layout values reused across components.
 *
 * Colour deliberately lives outside this file: it comes from the astryx theme's
 * CSS custom properties (`var(--color-…)`), which resolve through `light-dark()`
 * and therefore follow the mode toggle for free. Anything hardcoded here would
 * not. These vars cover only the geometry astryx does not own.
 */
export const layout = stylex.defineVars({
  maxWidth: '68rem',
  gutter: '1.5rem',
  navHeight: '3.5rem',
  sectionGap: '5rem',
});
