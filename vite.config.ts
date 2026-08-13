import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({mode}) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: mode !== 'production',
              runtimeInjection: false,
              treeshakeCompensation: true,
              unstable_moduleResolution: {type: 'commonJS', rootDir},
            },
          ],
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
