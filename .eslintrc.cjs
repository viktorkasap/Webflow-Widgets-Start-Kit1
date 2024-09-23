module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  settings: {
    'import/resolver': {},
    'boundaries/elements': [
      { type: 'root', pattern: '@root/*' },
      { type: 'app', pattern: '@app/*' },
      { type: 'processes', pattern: '@processes/*' },
      { type: 'pages', pattern: '@pages/*' },
      { type: 'widgets', pattern: '@widgets/*' },
      { type: 'features', pattern: '@features/*' },
      { type: 'entities', pattern: '@entities/*' },
      { type: 'shared', pattern: '@shared/*' },
      { type: 'test-utils', pattern: '@test-utils/*' },
    ],
  },
  extends: ['standard', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  ignorePatterns: ['*.cjs', '*.mjs', '*.json', '*.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', '@typescript-eslint/eslint-plugin'],
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    semi: ['error', 'always'],
    'import/no-anonymous-default-export': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@root/**',
            group: 'internal',
            position: 'after',
          },
          {
            "pattern": "@app",
            "group": "internal",
            "position": "after"
          },
          {
            pattern: '@widgets/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@features/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@entities/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@shared/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@test-utils',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        varsIgnorePattern: '^_.*$',
        argsIgnorePattern: '^_.*$',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_.*$',
        argsIgnorePattern: '^_.*$',
      },
    ],
    'max-len': [
      'error',
      {
        code: 140,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignorePattern: "d='([\\s\\S]*?)'",
        // svg d=...
      },
    ],
    // https://eslint.org/docs/latest/rules/padding-line-between-statements
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-new': 0,
  },
};
