import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Global ignores for config files and build artifacts
  {
    ignores: [
      '**/.prettierrc.js',
      '**/eslint.config.js',
      '**/prettier.config.js',
      'lib/**/*',
      '**/*.config.js',
      '**/node_modules/**',
      'example/index.js',
      '**/babel.config.js',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './example/tsconfig.json'],
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-native': reactNative,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // Using TypeScript for props
      'react-native/no-inline-styles': 'warn',
    },
  },
];
