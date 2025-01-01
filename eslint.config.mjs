/** @type {import('@types/eslint').Linter.Config} */
import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import jsxAlly from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('eslint-config-ts-prefixer'),
  jsxAlly.flatConfigs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs'],
    ignores: ['.vscode', 'node_modules', 'build', 'dist', '.github', '.idea'],
    languageOptions: {
      globals: {},
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'no-return-await': 'off',
    },
    settings: {},
  },
];
