import stylexBabelPlugin from '@stylexjs/babel-plugin';
import {stylexBabelPluginOptions} from './stylex.config.mjs';

export default (ctx) => ({
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      // This project has no babel.config.js (the app's own StyleX transform
      // is configured inline in vite.config.ts), so the postcss plugin's
      // internal Babel pass has nothing to load by default: it can't parse
      // JSX/TSX syntax, and it never registers @stylexjs/babel-plugin to
      // extract `stylex.create()` calls into CSS. Both must be supplied
      // explicitly here. The options object itself comes from
      // stylex.config.mjs, shared with vite.config.ts, so the two passes
      // can't drift out of sync (they must generate identical StyleX
      // class names from the same source).
      babelConfig: {
        babelrc: false,
        configFile: false,
        parserOpts: {plugins: ['jsx', 'typescript']},
        plugins: [
          [stylexBabelPlugin, stylexBabelPluginOptions(ctx.env !== 'production')],
        ],
      },
    },
    autoprefixer: {},
  },
});
