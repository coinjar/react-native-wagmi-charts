import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

const reactNativeWebPkg = require('react-native-web/package.json');
const reactNativeWeb = path.join(
  path.dirname(require.resolve('react-native-web/package.json')),
  path.dirname(reactNativeWebPkg.module)
);

const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
  '.mjs',
];

const jsxInNodeModules = {
  name: 'jsx-in-node-modules',
  enforce: 'pre',
  async transform(code, id) {
    if (
      !/node_modules\/(react-native-web|react-native-reanimated)\/.*\.js$/.test(
        id
      )
    ) {
      return null;
    }
    return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
  },
};

function manualChunks(id) {
  const normalizedId = id.replaceAll('\\', '/');

  if (
    /\/node_modules\/(?:react|react-dom|react-native-web|scheduler)\//.test(
      normalizedId
    )
  ) {
    return 'react-runtime';
  }
  if (
    /\/node_modules\/(?:react-native-reanimated|react-native-worklets)\//.test(
      normalizedId
    )
  ) {
    return 'reanimated-worklets';
  }
  if (/\/node_modules\/react-native-gesture-handler\//.test(normalizedId)) {
    return 'gesture-handler';
  }
  if (/\/node_modules\/react-native-svg\//.test(normalizedId)) {
    return 'react-native-svg';
  }
}

export default defineConfig({
  plugins: [
    jsxInNodeModules,
    react({
      babel: {
        plugins: ['react-native-worklets/plugin'],
      },
    }),
  ],
  resolve: {
    extensions: extensions,
    alias: {
      'react-native': reactNativeWeb,
      'react-native-wagmi-charts': path.resolve(root, 'src'),
    },
  },
  define: {
    '__DEV__': JSON.stringify(process.env.NODE_ENV !== 'production'),
    'process.env': JSON.stringify(process.env),
    'global': 'globalThis',
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
      ignoreDynamicRequires: true,
    },
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
  optimizeDeps: {
    include: ['react-native-web'],
    esbuildOptions: {
      resolveExtensions: extensions,
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
