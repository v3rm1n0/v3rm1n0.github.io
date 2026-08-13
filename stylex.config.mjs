import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));

/**
 * Single source of truth for @stylexjs/babel-plugin's options.
 *
 * Two independent passes need these options: the app's own StyleX transform
 * (vite.config.ts, via @vitejs/plugin-react's `babel` option) and StyleX's
 * CSS extraction pass (postcss.config.js, via @stylexjs/postcss-plugin's
 * `babelConfig` option). Both generate StyleX's content-hashed class names
 * from the same source files, so if their options drift, the classes a
 * component gets at runtime stop matching the CSS rules emitted for it —
 * silently, with no build error. That's the exact "0 rebeccapurple matches"
 * failure this project hit while first wiring StyleX up (see
 * .superpowers/sdd/2026-08-13-portfolio-site/task-1-report.md). Import this
 * from both places instead of hand-copying the object.
 *
 * @param {boolean} dev
 * @returns {{
 *   dev: boolean,
 *   runtimeInjection: false,
 *   treeshakeCompensation: true,
 *   unstable_moduleResolution: {type: 'commonJS', rootDir: string},
 * }}
 */
export function stylexBabelPluginOptions(dev) {
  return {
    dev,
    runtimeInjection: false,
    treeshakeCompensation: true,
    unstable_moduleResolution: {type: 'commonJS', rootDir},
  };
}
