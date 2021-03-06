module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    `eslint:recommended`,
    `plugin:react/recommended`,
    `plugin:prettier/recommended`,
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: `detect`,
    },
  },
  parser: `babel-eslint`,
  plugins: [`react`, `prettier`],
  rules: {
    quotes: [`error`, `backtick`],
  },
}
