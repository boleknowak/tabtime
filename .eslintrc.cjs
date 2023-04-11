module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'import-no-duplicates-prefix-resolved-path',
    'chakra-ui',
  ],
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
      },
    },
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    // extraFileExtensions: ['.ts', '.tsx'],
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.cjs', '.js', '.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-mutable-exports': 0,
    'import/no-duplicates': 0,
    'import-no-duplicates-prefix-resolved-path/no-duplicates': [
      'error',
      {
        prefixResolvedPathWithImportName: true,
      },
    ],
    'chakra-ui/props-order': 'error',
    'chakra-ui/props-shorthand': 'error',
    'chakra-ui/require-specific-component': 'error',
  },
};
