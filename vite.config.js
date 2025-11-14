// 导入 Vite 的 defineConfig 函数，用于定义配置并获得类型提示
import { defineConfig } from 'vite'
// 导入 Vue 插件，用于支持 Vue 单文件组件
import vue from '@vitejs/plugin-vue'
// 导入自动导入插件，用于自动导入 API 而不需要手动 import
import AutoImport from 'unplugin-auto-import/vite'
// 导入组件自动导入插件，用于自动导入 Vue 组件
import Components from 'unplugin-vue-components/vite'
// 导入 ant-design-vue 的组件解析器
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 导入 rollup-plugin-visualizer 用于分析打包体积
import { visualizer } from 'rollup-plugin-visualizer'
// 导入 path 模块的 resolve 函数，用于解析文件路径
import { resolve } from 'node:path'
// 导入 fileURLToPath 函数，用于将 file:// URL 转换为文件路径
import { fileURLToPath } from 'node:url'

// 获取项目根目录的绝对路径
const rootPath = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
// 导出 Vite 配置函数，接收 mode 参数（development、production、test）
export default defineConfig(({ mode }) => {
  // 从环境变量获取 base path，如果没有设置则使用默认值
  // GitHub Pages 部署时，如果仓库名不是 username.github.io，需要设置 base 为 /仓库名/
  // 可以通过环境变量 BASE_URL 或 VITE_BASE_URL 来设置
  const base = process.env.BASE_URL || process.env.VITE_BASE_URL || './'

  return {
    // 公共基础路径
    // 开发环境使用相对路径 './'
    // GitHub Pages 部署时，如果设置了 BASE_URL 环境变量，则使用该值
    base,
    // 构建配置选项
    build: {
      // 指定输出目录名称
      outDir: 'dist', // 构建产物输出到 dist 目录
      // 是否生成 source map 文件
      sourcemap: false, // 关闭 source map 生成，减小构建体积
      // 是否压缩代码
      minify: true, // 启用代码压缩，减小文件体积
      // 构建前是否清空输出目录
      emptyOutDir: true, // 构建前清空输出目录，避免旧文件残留
      // Rollup 打包选项配置
      rollupOptions: {
        // 输出选项配置
        output: {
          // 代码分割后的 chunk 文件命名规则
          chunkFileNames: 'js/[hash].js', // chunk 文件输出到 js 目录，使用 hash 作为文件名
          // 入口文件命名规则
          entryFileNames: 'js/[hash].js', // 入口文件输出到 js 目录，使用 hash 作为文件名
          // 静态资源文件命名规则（函数形式，可动态判断）
          assetFileNames: (assetsFile) => {
            // 如果资源文件是 .vue 或 .scss 文件
            if (/\.(vue|scss)$/i.test(assetsFile.name)) {
              // 输出到 del 目录，文件名包含原始名称和 hash
              return 'del/[name]-[hash].[ext]'
            } else {
              // 其他资源文件输出到 static 目录，使用 hash 作为文件名
              return 'static/[hash].[ext]'
            }
          }
        }
      }
    },
    // 路径解析配置
    resolve: {
      // 路径别名配置，简化导入路径
      alias: {
        '@': resolve(rootPath, 'src'), // @ 别名指向 src 目录
        assets: resolve(rootPath, 'src/assets'), // assets 别名指向 src/assets 目录
        util: resolve(rootPath, 'src/util'), // util 别名指向 src/util 目录
        views: resolve(rootPath, 'src/views'), // views 别名指向 src/views 目录
        layout: resolve(rootPath, 'src/layout'), // layout 别名指向 src/layout 目录
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' // vue-i18n 别名指向 CommonJS 版本
      }
    },
    // CSS 预处理器选项配置
    preprocessorOptions: {
      // SCSS 预处理器配置
      scss: {
        // 在每个 SCSS 文件开头自动注入的代码（已注释）
        // additionalData: `@import "@/assets/base.scss";` // 可取消注释以自动导入基础样式
      }
    },
    // 全局常量定义，在构建时会被替换
    define: {
      // 定义开发环境标识符
      __DEV__: JSON.stringify(mode === 'development'), // 开发模式下为 true，生产模式下为 false
      // 定义测试环境标识符
      __TEST__: JSON.stringify(mode === 'test') // 测试模式下为 true，其他模式下为 false
    },
    // 插件配置数组
    plugins: [
      // Vue 插件，支持 Vue 单文件组件和 JSX
      vue(),
      // 自动导入插件配置
      AutoImport({
        // 自动导入的模块列表
        imports: [
          'vue', // 自动导入 Vue API（如 ref、reactive、computed 等）
          'vue-router', // 自动导入 Vue Router API（如 useRouter、useRoute 等）
          'pinia', // 自动导入 Pinia API（如 defineStore、storeToRefs 等）
          '@vueuse/core' // 自动导入 VueUse 工具函数
          // 注意：lodash-es 建议手动导入，如：import { debounce } from 'lodash-es'
          // 自动导入 自定义函数
          // {
          // '@/api': ['useRequest'] // 可取消注释以自动导入自定义 API 函数
          // },
        ],
        // ESLint 配置生成选项
        eslintrc: {
          // 是否生成 ESLint 配置文件
          enabled: true, // Default `false`  启动项目后 会在根目录下生成 eslintrc-auto-import.json文件 生成后可改为false 避免每次生成 慢
          // 生成的 ESLint 配置文件路径
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          // 全局变量的属性值类型
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      // 组件自动导入插件配置
      Components({
        dirs: ['src/components'], // 指定自动导入组件的目录
        dts: false, // 是否生成 TypeScript 声明文件（false 表示不生成）
        resolvers: [
          // ant-design-vue 组件自动导入解析器
          AntDesignVueResolver({
            importStyle: false // 如果为 true，会自动导入样式，但建议手动导入以支持按需加载
          })
        ],
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/] // 匹配要处理的文件类型：.vue 文件和 .jsx 文件
      }),
      // 打包分析插件 - 仅在构建时启用
      visualizer({
        filename: './dist/stats.html', // 生成的分析报告文件路径
        open: true, // 构建完成后自动在浏览器中打开报告
        gzipSize: true, // 显示 gzip 压缩后的大小
        brotliSize: true, // 显示 brotli 压缩后的大小
        template: 'treemap' // 使用树状图模板，可选: 'sunburst' | 'treemap' | 'network'
      })
    ]
  }
})
