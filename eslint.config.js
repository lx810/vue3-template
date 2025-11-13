// 导入 path 模块，用于处理文件路径
import path from 'path'
// 导入 globals 模块，提供全局变量定义（如 browser、node 等环境）
import globals from 'globals'
// 导入 ESLint 官方 JavaScript 插件
import pluginJs from '@eslint/js'
// 导入 Vue.js 的 ESLint 插件
import pluginVue from 'eslint-plugin-vue'
// 导入 Vue 文件的 ESLint 解析器
import VueEslintParser from 'vue-eslint-parser'
// 导入 Prettier 的 ESLint 插件，用于集成代码格式化
import prettier from 'eslint-plugin-prettier'
// 导入 Oxlint 插件，提供快速的 lint 检查
import oxlint from 'eslint-plugin-oxlint'
// 导入 FlatCompat，用于兼容旧的 ESLint 配置格式
import { FlatCompat } from '@eslint/eslintrc'
// 导入 fileURLToPath，用于将 file:// URL 转换为文件路径
import { fileURLToPath } from 'url'

// 将当前模块的 URL 转换为文件路径
const __filename = fileURLToPath(import.meta.url)
// 获取当前文件所在的目录路径
const __dirname = path.dirname(__filename)

// 创建 FlatCompat 实例，用于兼容旧的 ESLint 配置格式
const compat = new FlatCompat({
  baseDirectory: __dirname // 设置基础目录为当前文件所在目录
})

/** @type {import('eslint').Linter.Config[]} */
// 导出 ESLint 配置数组（使用新的扁平化配置格式）
export default [
  {
    // 指定要检查的文件类型：所有 .js、.mjs、.cjs 和 .vue 文件
    files: ['**/*.{js,mjs,cjs,vue}']
  },
  {
    // 语言选项配置
    languageOptions: {
      // 全局变量配置
      globals: {
        ...globals.browser, // 展开浏览器环境的全局变量（如 window、document 等）
        ...globals.node, // 展开 Node.js 环境的全局变量（如 process、Buffer 等）
        __DEV__: true, // 自定义全局变量：开发环境标志
        __TEST__: true // 自定义全局变量：测试环境标志
      },
      // 指定解析器为 Vue ESLint 解析器，用于解析 .vue 文件
      parser: VueEslintParser
    }
  },
  // 应用 ESLint 官方推荐的 JavaScript 规则配置
  /** js推荐配置 */
  pluginJs.configs.recommended,
  // 应用 Vue.js 的基础规则配置（展开配置对象）
  /** vue推荐配置 */
  ...pluginVue.configs['flat/essential'],
  // 继承自动导入生成的 ESLint 配置（展开配置对象）
  /** 继承自动导入配置 */
  ...compat.extends('./.eslintrc-auto-import.json'),
  // 应用 Oxlint 推荐的规则配置
  /** oxlint推荐配置 */
  oxlint.configs['flat/recommended'],
  // 自定义 ESLint 规则配置
  /** 自定义eslint配置 */
  {
    rules: {
      // 禁止使用 var 声明变量，必须使用 let 或 const
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      // 限制连续空行的最大数量为 1 行，超过则警告
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      // 禁止意外的多行表达式，避免分号自动插入导致的问题
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      // 关闭不必要的转义字符检查
      'no-useless-escape': 'off', // 禁止不必要的转义字符

      // Vue 规则：允许组件使用单个单词命名（关闭多单词组件名要求）
      'vue/multi-word-component-names': 0
    }
  },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   * https://github.com/prettier/eslint-plugin-prettier/issues/634
   */
  {
    // 插件配置
    plugins: {
      prettier // 注册 Prettier 插件
    },
    // 应用 Prettier 推荐的规则（展开规则对象）
    rules: {
      ...prettier.configs.recommended.rules
    }
  },
  // 忽略文件配置：指定不需要 ESLint 检查的文件和目录
  // 忽略文件
  {
    ignores: [
      '**/dist', // 忽略所有 dist 目录
      './src/main.ts', // 忽略 src/main.ts 文件
      '.vscode', // 忽略 VS Code 配置目录
      '.idea', // 忽略 IntelliJ IDEA 配置目录
      '*.sh', // 忽略所有 shell 脚本文件
      '**/node_modules', // 忽略所有 node_modules 目录
      '*.md', // 忽略所有 Markdown 文件
      '*.woff', // 忽略所有 woff 字体文件
      '*.ttf', // 忽略所有 ttf 字体文件
      'yarn.lock', // 忽略 yarn 锁文件
      'package-lock.json', // 忽略 npm 锁文件
      '/public', // 忽略 public 目录
      '/docs', // 忽略 docs 目录
      '**/output', // 忽略所有 output 目录
      '.husky', // 忽略 husky Git hooks 目录
      '.local', // 忽略本地配置目录
      '/bin', // 忽略 bin 目录
      'Dockerfile' // 忽略 Dockerfile 文件
    ]
  }
]
