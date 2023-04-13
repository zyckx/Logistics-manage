module.exports = {
  root: true, // 停止向上查找父级目录中的配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "./.eslintrc-auto-import.json",
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier", // eslint-config-prettier 的缩写
  ],
  parser: "vue-eslint-parser", // 指定要使用的解析器
  // 给解析器传入一些其他的配置参数
  parserOptions: {
    ecmaVersion: "latest", // 支持的es版本
    parser: "@typescript-eslint/parser",
    sourceType: "module", // 模块类型，默认为script，我们设置为module
  },
  plugins: ["vue", "@typescript-eslint", "prettier"], // eslint-plugin- 可以省略
  rules: {
    "vue/multi-word-component-names": "off", // 组件名必须为多个单词
    "@typescript-eslint/no-var-requires": "off", // 禁止使用require
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用any类型
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ], // 禁止使用空对象类型
  },
};
