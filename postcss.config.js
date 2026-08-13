import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import stylexBabelPlugin from '@stylexjs/babel-plugin';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default (ctx) => ({
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      // This project has no babel.config.js (the app's own StyleX transform
      // is configured inline in vite.config.ts), so the postcss plugin's
      // internal Babel pass has nothing to load by default: it can't parse
      // JSX/TSX syntax, and it never registers @stylexjs/babel-plugin to
      // extract `stylex.create()` calls into CSS. Both must be supplied
      // explicitly here, mirroring the babel-plugin options in vite.config.ts.
      babelConfig: {
        babelrc: false,
        configFile: false,
        parserOpts: {plugins: ['jsx', 'typescript']},
        plugins: [
          [
            stylexBabelPlugin,
            {
              dev: ctx.env !== 'production',
              runtimeInjection: false,
              treeshakeCompensation: true,
              unstable_moduleResolution: {type: 'commonJS', rootDir},
            },
          ],
        ],
      },
    },
    autoprefixer: {},
  },
});
