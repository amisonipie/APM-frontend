module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
    indent: ['error', 2],
    "react/prop-types": 0,
  },
  ignorePatterns: ['cryptojs*.js'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
