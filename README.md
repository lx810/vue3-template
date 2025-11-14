# Vue 3 + Vite 项目

基于 Vue 3 + Vite 的现代化前端项目模板。

## 📚 文档

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

#### 首次部署步骤

1. **启用 GitHub Pages**
   - 进入 GitHub 仓库的 Settings
   - 找到 Pages 设置
   - Source 选择 "GitHub Actions"

2. **推送代码**
   ```bash
   git push origin main
   ```

3. **查看部署状态**
   - 在仓库的 Actions 标签页查看部署进度
   - 部署完成后，访问 `https://你的用户名.github.io/仓库名/` 查看网站

#### 访问地址

- 如果仓库名为 `username.github.io`，访问地址为：`https://username.github.io/`
- 如果仓库名为其他名称（如 `my-vue-app`），访问地址为：`https://username.github.io/my-vue-app/`

#### 手动触发部署

如果需要手动触发部署，可以在 GitHub 仓库的 Actions 标签页中，选择 "Deploy to GitHub Pages" workflow，点击 "Run workflow" 按钮。

## 📄 License

MIT
