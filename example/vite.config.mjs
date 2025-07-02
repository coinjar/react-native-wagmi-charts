import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

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

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          'react-native-reanimated/plugin',
        ],
      },
    }),
  ],
  resolve: {
    extensions: extensions,
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      'react-native-wagmi-charts': path.resolve(root, 'src'),
    },
  },
  define: {
    global: 'window',
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.TAMAGUI_TARGET': JSON.stringify('web'),
    process: JSON.stringify({
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        TAMAGUI_TARGET: 'web'
      }
    }),
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    commonjsOptions: { transformMixedEsModules: true },
  },
  optimizeDeps: {
    include: [
      'react-native-web',
      'react-native-svg-web',
    ],
    esbuildOptions: {
      resolveExtensions: extensions,
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
        '.jsx': 'jsx',
      },
    },
  },
  esbuild: {
    include: /\.[jt]sx?$/,
    exclude: [],
    loader: 'tsx',
  },
});