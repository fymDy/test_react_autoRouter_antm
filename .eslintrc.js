module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: [],//空 extends 配置和 rules，禁用 ESLint
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {},
  };
  