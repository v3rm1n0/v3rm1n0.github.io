import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {stylexBabelPluginOptions} from './stylex.config.mjs';

// NOTE: @vitejs/plugin-react is pinned to ^5.2.0 in package.json, not the
// latest major. v6 dropped the `babel` option entirely in favor of an oxc
// based transform, which would silently stop StyleX from compiling below
// (no error — components would just render with the raw, uncompiled
// `stylex.create()` object, which throws at runtime). Do not let this pin
// drift past v5 without re-adding an equivalent Babel-based StyleX pass.
// See .superpowers/sdd/2026-08-13-portfolio-site/task-1-report.md.
export default defineConfig(({mode}) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@stylexjs/babel-plugin', stylexBabelPluginOptions(mode !== 'production')],
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
}));
