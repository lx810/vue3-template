# GitHub Pages 部署文档

本文档详细说明了如何使用 GitHub Actions 自动部署 Vue 3 项目到 GitHub Pages。

## 📋 目录

- [部署概述](#部署概述)
- [访问地址](#访问地址)
- [部署配置](#部署配置)
- [部署流程](#部署流程)
- [手动触发部署](#手动触发部署)
- [查看部署状态](#查看部署状态)
- [配置说明](#配置说明)
- [常见问题](#常见问题)

## 🎯 部署概述

项目已配置 GitHub Actions 工作流，当代码推送到 `main` 分支时会自动触发构建和部署流程。

参考https://juejin.cn/post/7499153130204069888?searchId=20251114104611D8853EB8985416E1D64D

### 部署流程

1. **触发条件**：代码推送到 `main` 分支
2. **构建阶段**：安装依赖 → 构建项目 → 上传构建产物
3. **部署阶段**：下载构建产物 → 部署到 GitHub Pages

## 🌐 访问地址

### 当前项目部署地址

```
https://lx810.github.io/vue3-template/
```

### 地址规则

- **如果仓库名为 `username.github.io`**

  - 访问地址：`https://username.github.io/`
  - Base URL：`/`

- **如果仓库名为其他名称（如 `vue3-template`）**

  - 访问地址：`https://username.github.io/仓库名/`
  - Base URL：`/仓库名/`

## ⚙️ 部署配置

### 工作流文件位置

```
.github/workflows/deploy.yml
```

### 主要配置项

#### 1. 触发条件

```yaml
on:
  push:
    branches:
      - main # 当推送到 main 分支时触发
```

#### 2. 构建配置

- **Node.js 版本**：22
- **包管理器**：pnpm
- **构建命令**：`pnpm run build`
- **Base URL**：`/vue3-template/`（通过环境变量设置）

#### 3. 部署配置

- **部署工具**：`peaceiris/actions-gh-pages@v3`
- **部署目录**：`./dist`
- **部署分支**：自动创建/更新 `gh-pages` 分支

## 🚀 部署流程

### 自动部署

1. **推送代码到 main 分支**

   ```bash
   git add .
   git commit -m "feat: 更新功能"
   git push origin main
   ```

2. **GitHub Actions 自动触发**

   - 进入仓库的 **Actions** 标签页
   - 查看 "Deploy" 工作流的执行状态

3. **等待部署完成**

   - 构建阶段：约 2-5 分钟
   - 部署阶段：约 1-2 分钟

4. **访问部署地址**

   - 部署成功后，访问 `https://lx810.github.io/vue3-template/`

### 首次部署步骤

1. **启用 GitHub Pages**

   - 进入 GitHub 仓库的 **Settings**
   - 找到左侧菜单的 **Pages**
   - 在 **Source** 中选择 **GitHub Actions**

2. **配置 GitHub Token（如需要）**

   - 如果使用自定义 token，需要在仓库 Settings → Secrets 中添加
   - Secret 名称：`test_use`（根据工作流配置）
   - 如果使用默认 `GITHUB_TOKEN`，则无需配置

3. **推送代码触发部署**

   ```bash
   git push origin main
   ```

## 🔧 手动触发部署

如果需要手动触发部署：

1. 进入 GitHub 仓库
2. 点击 **Actions** 标签页
3. 在左侧选择 **Deploy** 工作流
4. 点击右上角的 **Run workflow** 按钮
5. 选择分支（通常选择 `main`）
6. 点击 **Run workflow** 确认

## 📊 查看部署状态

### 方法 1：GitHub Actions

1. 进入仓库的 **Actions** 标签页
2. 查看最新的 "Deploy" 工作流运行记录
3. 点击运行记录查看详细日志
4. 绿色 ✓ 表示成功，红色 ✗ 表示失败

### 方法 2：GitHub Pages 设置

1. 进入仓库的 **Settings** → **Pages**
2. 查看部署状态和访问地址
3. 查看部署历史记录

### 方法 3：检查 gh-pages 分支

1. 进入仓库的 **Code** 标签页
2. 切换到 `gh-pages` 分支
3. 查看部署的文件内容

## 🔍 配置说明

### Vite 配置

在 `vite.config.js` 中，base 路径通过环境变量动态设置：

```javascript
const base = process.env.BASE_URL || process.env.VITE_BASE_URL || './'
```

- **开发环境**：使用相对路径 `./`
- **生产环境**：通过 `BASE_URL` 环境变量设置为 `/vue3-template/`

### 工作流环境变量

在 `.github/workflows/deploy.yml` 中设置：

```yaml
- name: Build project
  env:
    BASE_URL: /vue3-template/
  run: pnpm run build
```

### 修改部署路径

如果需要修改部署路径（例如更换仓库名）：

1. **修改工作流配置**

   ```yaml
   env:
     BASE_URL: /新仓库名/
   ```

2. **更新访问地址**

   - 新地址：`https://lx810.github.io/新仓库名/`

## ❓ 常见问题

### 1. 页面显示空白或 404

**原因**：Base URL 配置不正确

**解决方案**：

- 检查工作流中的 `BASE_URL` 环境变量
- 确保与仓库名匹配
- 确保路径以 `/` 开头和结尾

### 2. 资源加载失败（CSS/JS 404）

**原因**：Base URL 配置错误

**解决方案**：

- 检查浏览器控制台的错误信息
- 确认 `vite.config.js` 中的 base 配置
- 确认工作流中的 `BASE_URL` 环境变量

### 3. 部署工作流失败

**可能原因**：

- GitHub Token 权限不足
- 构建错误
- 依赖安装失败

**解决方案**：

- 检查 Actions 日志中的错误信息
- 确认 GitHub Token 权限（需要 `repo` 和 `workflow` 权限）
- 本地运行 `pnpm run build` 测试构建是否成功

### 4. 部署后页面没有更新

**可能原因**：

- 浏览器缓存
- 部署还在进行中
- GitHub Pages 缓存

**解决方案**：

- 清除浏览器缓存或使用无痕模式
- 等待几分钟后重试
- 检查 Actions 确认部署是否完成

### 5. 如何查看构建产物

**方法**：

1. 在 Actions 中点击构建任务
2. 找到 "Upload production-ready build files" 步骤
3. 下载 artifact 查看构建产物

### 6. 如何禁用自动部署

**方法**：

- 删除或重命名 `.github/workflows/deploy.yml` 文件
- 或者在工作流中添加条件，只在特定情况下触发

## 📝 相关文件

- **工作流配置**：`.github/workflows/deploy.yml`
- **Vite 配置**：`vite.config.js`
- **构建输出**：`dist/` 目录（构建后生成）

## 🔗 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

## 📅 更新日志

- **2024-12-XX**：初始部署配置完成
- **2024-12-XX**：添加 Base URL 环境变量配置
- **2024-12-XX**：优化部署工作流配置

---

如有问题，请查看 [GitHub Issues](https://github.com/lx810/vue3-template/issues) 或提交新的 Issue。
