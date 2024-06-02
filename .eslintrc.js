module.exports = {
  root: true, // 指示这是项目的根配置文件，ESLint 在向上查找配置文件时不会再超出这个目录。
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'react-app', // 使用 create-react-app 默认的 ESLint 配置。
    'react-app/jest', // 为使用 Jest 的项目扩展默认的 ESLint 配置。
  ],
  plugins: [
    'react', // ESLint 插件，用于 lint React 代码。
    '@typescript-eslint', // ESLint 插件，用于 lint TypeScript 代码。
    // 'prettier', // ESLint 插件，用于整合 Prettier 代码格式化工具。
  ],
  parser: '@typescript-eslint/parser', // 指定要使用的解析器，以支持 TypeScript 语法。
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // 启用 JSX 语法支持，因为 TSX 文件中包含 JSX 语法。
    },
    ecmaVersion: 2021, // 指定 ECMAScript 版本，这里设置为 2021。
    sourceType: 'module', // 设置为 'module'，以支持 ECMAScript 模块。
    project: './tsconfig.json', // 指定 TypeScript 项目配置文件
  },
  rules: {
    // 'prettier/prettier': 'error', // 强制 Prettier 格式化错误作为 ESLint 错误。
    'react/react-in-jsx-scope': 'off', // 禁用需要在 TSX 中显式引入 React 的规则（React 17+ 中不再需要）。
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 禁用要求显式声明模块边界类型的规则。
    '@typescript-eslint/no-unused-vars': ['error'], // 启用 TypeScript 未使用变量的规则
    '@typescript-eslint/no-explicit-any': 'warn', // 使用 any 类型时发出警告
  },
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本。
    },
  },
};
