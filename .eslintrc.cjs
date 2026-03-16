module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth: 2,
        semi: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    complexity: ['error', { max: 9 }],
    'max-lines': ['error', { max: 150, skipComments: true, skipBlankLines: true }],
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'max-params': ['error', 3],
  },
};
