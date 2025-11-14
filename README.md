# Vue 3 + Vite 项目

基于 Vue 3 + Vite 的现代化前端项目模板。

## 📚 文档

- [GitHub Pages 部署文档](./docs/DEPLOYMENT.md) - 自动部署配置和使用指南
- [第三方库集成文档](./docs/INTEGRATION.md) - Ant Design Vue、Lodash-es、ECharts 集成说明
- [Changelog 和 Release-it 完整指南](./docs/CHANGELOG_AND_RELEASE.md) - 版本管理和发布流程详细说明

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Pinia** - Vue 的状态管理库
- **Ant Design Vue** - 企业级 UI 组件库
- **ECharts** - 数据可视化图表库
- **Lodash-es** - JavaScript 实用工具库

## 📦 已集成的库

- [Ant Design Vue 4.2.6](https://antdv.com/) - UI 组件库
- [Lodash-es 4.17.21](https://lodash.com/) - 工具函数库
- [ECharts 6.0.0](https://echarts.apache.org/) - 图表库

详细使用说明请查看 [集成文档](./docs/INTEGRATION.md)

## 🎯 功能特性

- ✅ Vue 3 Composition API
- ✅ 自动导入组件和 API
- ✅ ESLint + Prettier 代码规范
- ✅ Commitlint 提交规范
- ✅ Husky Git Hooks
- ✅ Release-it 版本发布
- ✅ Conventional Changelog
- ✅ GitHub Actions CI/CD 自动部署

## 📝 开发规范

### 代码提交

使用 commitizen 进行规范化提交：

```bash
pnpm cz
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm lint:fix
```

## 🚢 部署

### GitHub Pages 自动部署

项目已配置 GitHub Actions，当代码推送到 `main` 分支时会自动构建并部署到 GitHub Pages。

**访问地址**：https://lx810.github.io/vue3-template/

**详细部署文档**：请查看 [部署文档](./docs/DEPLOYMENT.md)

#### 快速开始

1. **推送代码到 main 分支**

   ```bash
   git push origin main
   ```

2. **查看部署状态**
   - 在仓库的 Actions 标签页查看部署进度
   - 部署完成后访问上述地址

#### 首次部署

首次部署需要启用 GitHub Pages：

- 进入仓库 Settings → Pages
- Source 选择 "GitHub Actions"

详细步骤请查看 [部署文档](./docs/DEPLOYMENT.md)

## 📄 License

MIT
