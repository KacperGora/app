const reactPlugin = require('eslint-plugin-react');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        JSX: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin, // Dodaj wtyczkę import
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
