import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/.prettierrc.js',
      '**/*.config.js',
      'lib/**/*',
      'example/index.js',
      'example/index.web.js',
      'example/dist/**/*',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
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
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-undef': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      // The two rules enabled here are listed explicitly rather than spread
      // from a preset: as of eslint-plugin-react-hooks v7, both `recommended`
      // and `recommended-latest` also turn on 14 React Compiler rules
      // (immutability, purity, refs, …). Those flag Reanimated's shared-value
      // mutation pattern throughout this library, so adopting them is its own
      // piece of work rather than a side effect of an ESLint bump.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-restricted-syntax': [
        'warn',
        {
          // Replaces react-native/no-inline-styles, which calls ESLint APIs
          // removed in v10. Child selector, so only a bare style={{ ... }} is
          // flagged. Objects composed into a style array —
          // style={[styles.base, { top: y }]} — are deliberately allowed:
          // that idiom carries computed layout values, which StyleSheet.create
          // cannot hold. The old plugin skipped them for the same reason.
          selector:
            "JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression",
          message: 'Inline style: move it into a StyleSheet.create block.',
        },
      ],
    },
  },
  {
    // Build/tooling config files run in Node, not in the app bundle. They are
    // outside every tsconfig, so they get no `project` and no React rules.
    files: ['**/*.{mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['**/*.web.{ts,tsx,js,jsx}'],
    rules: {
      'no-restricted-globals': [
        'error',
        ...['document', 'window', 'navigator', 'localStorage'].map((name) => ({
          name,
          message: `'${name}' is web-only and undefined on native. Move this into a .web file.`,
        })),
      ],
    },
  },

  // Must stay last: turns off stylistic rules that fight Prettier, and reports
  // formatting drift as lint errors.
  prettier,
];
