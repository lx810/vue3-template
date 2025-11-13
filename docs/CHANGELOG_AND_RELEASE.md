# Changelog 和 Release-it 完整使用指南

本文档详细记录了 Changelog 和 Release-it 的每一步操作、每个配置选项和每个交互式问题的回答。

---

## 📋 目录

1. [Changelog 使用指南](#changelog-使用指南)
2. [Release-it 使用指南](#release-it-使用指南)
3. [配置文件详解](#配置文件详解)
4. [完整工作流程](#完整工作流程)
5. [常见问题解答](#常见问题解答)

---

## 📝 Changelog 使用指南

### 什么是 Changelog？

Changelog（变更日志）是记录项目从开发到发布过程中所有重要变更的文档，包括新功能、错误修复和性能改进等。

### 安装的依赖

```json
{
  "devDependencies": {
    "conventional-changelog-cli": "^5.0.0"
  }
}
```

### 可用的命令

在 `package.json` 中配置了三个 changelog 相关命令：

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
    "changelog:all": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "changelog:config": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 --config changelog-option.cjs"
  }
}
```

### 命令详解

#### 1. `pnpm changelog`

**命令**: `conventional-changelog -p angular -i CHANGELOG.md -s -r 0`

**参数说明**:

- `-p angular`: 使用 Angular 提交规范预设
- `-i CHANGELOG.md`: 输入文件（追加模式）
- `-s`: 静默模式，不输出到控制台
- `-r 0`: 从当前版本开始，生成自上次 tag 到现在的变更日志

**使用场景**:

- 生成自上次发布到现在的变更日志
- 追加到现有 CHANGELOG.md 文件顶部

**执行步骤**:

1. 读取 git 提交历史
2. 解析符合 Conventional Commits 规范的提交
3. 生成格式化的变更日志
4. 追加到 CHANGELOG.md 文件顶部

**示例输出**:

```markdown
## 0.0.1 (2024-11-13)

### ✨ Features | 新功能

- 添加用户登录功能
- 实现数据导出功能

### 🐛 Bug Fixes | Bug 修复

- 修复页面刷新问题
- 修复数据加载错误
```

#### 2. `pnpm changelog:all`

**命令**: `conventional-changelog -p angular -i CHANGELOG.md -s`

**参数说明**:

- `-p angular`: 使用 Angular 提交规范预设
- `-i CHANGELOG.md`: 输入文件（追加模式）
- `-s`: 静默模式
- **注意**: 没有 `-r 0` 参数，会生成所有历史记录

**使用场景**:

- 生成所有提交历史的变更日志
- 初始化项目的完整变更日志

**执行步骤**:

1. 读取所有 git 提交历史
2. 解析所有符合规范的提交
3. 生成完整的变更日志
4. 追加到 CHANGELOG.md 文件

#### 3. `pnpm changelog:config`

**命令**: `conventional-changelog -p angular -i CHANGELOG.md -s -r 0 --config changelog-option.cjs`

**参数说明**:

- `-p angular`: 使用 Angular 提交规范预设
- `-i CHANGELOG.md`: 输入文件
- `-s`: 静默模式
- `-r 0`: 从当前版本开始
- `--config changelog-option.cjs`: 使用自定义配置文件

**使用场景**:

- 使用自定义的中文类型标签和 emoji
- 自定义变更日志格式

**执行步骤**:

1. 读取自定义配置文件 `changelog-option.cjs`
2. 应用自定义的转换规则
3. 生成带中文标签的变更日志
4. 追加到 CHANGELOG.md 文件

### 提交规范要求

为了生成正确的 changelog，提交信息必须遵循 **Conventional Commits** 规范：

#### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 提交类型（Type）

| 类型       | 说明     | 示例                      |
| ---------- | -------- | ------------------------- |
| `feat`     | 新功能   | `feat: 添加用户登录功能`  |
| `fix`      | 修复 bug | `fix: 修复页面刷新问题`   |
| `docs`     | 文档更新 | `docs: 更新 README.md`    |
| `style`    | 代码格式 | `style: 格式化代码`       |
| `refactor` | 代码重构 | `refactor: 重构用户模块`  |
| `perf`     | 性能优化 | `perf: 优化列表渲染性能`  |
| `test`     | 测试相关 | `test: 添加单元测试`      |
| `build`    | 构建系统 | `build: 更新构建配置`     |
| `ci`       | CI 配置  | `ci: 更新 GitHub Actions` |
| `chore`    | 其他修改 | `chore: 更新依赖版本`     |
| `revert`   | 回退提交 | `revert: 回退上一个提交`  |

#### 提交范围（Scope，可选）

```
feat(user): 添加用户登录功能
fix(api): 修复接口调用错误
```

#### 提交主题（Subject）

- 使用祈使句，现在时态
- 首字母小写
- 结尾不加句号
- 不超过 50 个字符

**正确示例**:

```
feat: add user login functionality
fix: resolve page refresh issue
```

**错误示例**:

```
feat: Added user login functionality.  ❌ (过去时，有句号)
feat: 添加用户登录功能  ❌ (太长)
```

#### 提交详情（Body，可选）

- 详细说明变更的原因和方式
- 使用 `|` 分隔多行

**示例**:

```
feat: add user login

实现用户登录功能，包括：
- 用户名密码登录
- 记住登录状态
- 自动刷新 token
```

#### 破坏性变更（Breaking Changes）

在提交信息中添加 `BREAKING CHANGE:` 标记：

```
feat: change API structure

BREAKING CHANGE: API 响应格式已更改，需要更新客户端代码
```

#### 关联 Issue

在提交信息中关联 issue：

```
fix: resolve login issue

Closes #123
Fixes #456
```

### 使用示例

#### 示例 1: 生成增量变更日志

```bash
# 1. 确保有符合规范的提交
git log --oneline

# 输出示例:
# abc1234 feat: add user login
# def5678 fix: resolve refresh bug
# ghi9012 docs: update README

# 2. 运行命令
pnpm changelog

# 3. 查看生成的 CHANGELOG.md
cat CHANGELOG.md
```

#### 示例 2: 生成完整变更日志

```bash
# 生成所有历史记录
pnpm changelog:all

# 这会生成从项目开始到现在的所有变更
```

#### 示例 3: 使用自定义配置

```bash
# 使用自定义配置生成带中文标签的变更日志
pnpm changelog:config

# 生成的变更日志会包含 emoji 和中文标签
```

---

## 🚀 Release-it 使用指南

### 什么是 Release-it？

Release-it 是一个自动化版本发布工具，可以自动完成版本号更新、生成 changelog、创建 git tag、提交更改等操作。

### 安装的依赖

```json
{
  "devDependencies": {
    "release-it": "16.1.5",
    "@release-it/conventional-changelog": "7.0.1"
  }
}
```

### 可用的命令

```json
{
  "scripts": {
    "release": "release-it"
  }
}
```

### 完整交互式流程详解

当你运行 `pnpm release` 时，会进入交互式流程。以下是每一步的详细说明：

#### 步骤 1: 执行前置钩子（before:init）

**执行内容**: `pnpm lint`

**说明**:

- 在发布流程开始前自动运行代码检查
- 如果 lint 失败，发布流程会中断
- 确保代码质量符合规范

**输出示例**:

```
> my-vue-app@0.0.1 release
> release-it

! pnpm lint
$ oxlint && eslint
✓ No issues found
```

**如果失败**:

```
! pnpm lint
$ oxlint && eslint
✗ Found 2 issues
```

此时需要修复问题后重新运行。

#### 步骤 2: 检查 Git 状态

**执行内容**:

- 检查当前分支
- 检查是否有未提交的更改
- 检查远程仓库状态

**输出示例**:

```
$ git rev-parse --abbrev-ref HEAD
master

$ git status --short --untracked-files=no
 M package.json
 M src/components/HelloWorld.vue
```

**配置说明**:

- `requireCleanWorkingDir: false` - 允许有未提交的更改
- `requireUpstream: false` - 不要求有上游分支
- `requireCommits: true` - 要求有提交记录

#### 步骤 3: 获取当前版本信息

**执行内容**:

- 读取 `package.json` 中的版本号
- 查找最新的 git tag
- 计算提交数量

**输出示例**:

```
$ git describe --tags --match=v* --abbrev=0
v0.0.0

$ git rev-list HEAD --count
15
```

#### 步骤 4: 显示当前版本和变更

**输出示例**:

```
🚀 Let's release my-vue-app (0.0.1...0.0.2)

Changelog:
## 0.0.2 (2024-11-13)

### ✨ Features | 新功能
- feat: add user login functionality

### 🐛 Bug Fixes | Bug 修复
- fix: resolve page refresh issue
```

#### 步骤 5: 选择版本类型（交互式）

**提示信息**:

```
? Select increment (next version):
  ❯ patch (0.0.1 → 0.0.2) - Bug fixes and other minor changes
    minor (0.0.1 → 0.1.0) - New features, but backwards compatible
    major (0.0.1 → 1.0.0) - Breaking changes
    prepatch (0.0.1 → 0.0.2-0) - Increment patch version, create a prerelease
    preminor (0.0.1 → 0.1.0-0) - Increment minor version, create a prerelease
    premajor (0.0.1 → 1.0.0-0) - Increment major version, create a prerelease
    prerelease (0.0.1 → 0.0.2-0) - Increment version, create a prerelease
    Custom version - Specify version...
```

**选项说明**:

| 选项             | 说明         | 版本变化        | 使用场景         |
| ---------------- | ------------ | --------------- | ---------------- |
| `patch`          | 补丁版本     | 0.0.1 → 0.0.2   | Bug 修复、小改动 |
| `minor`          | 次版本       | 0.0.1 → 0.1.0   | 新功能，向后兼容 |
| `major`          | 主版本       | 0.0.1 → 1.0.0   | 破坏性变更       |
| `prepatch`       | 预发布补丁   | 0.0.1 → 0.0.2-0 | 补丁版本的预发布 |
| `preminor`       | 预发布次版本 | 0.0.1 → 0.1.0-0 | 次版本的预发布   |
| `premajor`       | 预发布主版本 | 0.0.1 → 1.0.0-0 | 主版本的预发布   |
| `prerelease`     | 预发布       | 0.0.1 → 0.0.2-0 | 当前版本的预发布 |
| `Custom version` | 自定义版本   | 手动输入        | 指定特定版本号   |

**如何选择**:

1. **选择 patch**:

   - 使用方向键移动到 `patch`
   - 按 `Enter` 确认
   - 适用于: 修复 bug、文档更新、代码格式调整

2. **选择 minor**:

   - 使用方向键移动到 `minor`
   - 按 `Enter` 确认
   - 适用于: 添加新功能、新组件、新 API

3. **选择 major**:

   - 使用方向键移动到 `major`
   - 按 `Enter` 确认
   - 适用于: 重大架构变更、不兼容的 API 变更

4. **选择 Custom version**:
   - 使用方向键移动到 `Custom version`
   - 按 `Enter` 确认
   - 输入版本号，如: `1.2.3`
   - 按 `Enter` 确认

#### 步骤 6: 确认版本号

**提示信息**:

```
? Version 0.0.2 is ready. Continue? (Y/n)
```

**回答选项**:

- `Y` 或 `Enter`: 继续发布流程
- `n`: 取消发布

**如果选择 Y**:

```
✓ Version 0.0.2 is ready. Continue? Yes
```

**如果选择 n**:

```
✗ Version 0.0.2 is ready. Continue? No
```

发布流程会中断。

#### 步骤 7: 更新版本号（after:bump）

**执行内容**:

- 更新 `package.json` 中的版本号
- 生成 changelog（通过 `@release-it/conventional-changelog` 插件）

**输出示例**:

```
! npm version 0.0.2 --no-git-tag-version
$ Writing changelog to CHANGELOG.md
```

**执行的操作**:

1. 更新 `package.json`:

   ```json
   {
     "version": "0.0.1" // 旧版本
   }
   ```

   变为:

   ```json
   {
     "version": "0.0.2" // 新版本
   }
   ```

2. 更新 `CHANGELOG.md`:
   - 在文件顶部添加新版本的变更日志
   - 使用 `changelog-option.cjs` 配置生成格式化的日志

#### 步骤 8: 显示变更集

**输出示例**:

```
Changeset:
 M package.json
 M CHANGELOG.md
```

显示将被提交的文件。

#### 步骤 9: 确认提交（交互式）

**提示信息**:

```
? Commit (chore: release v0.0.2)? (Y/n)
```

**回答选项**:

- `Y` 或 `Enter`: 创建提交
- `n`: 跳过提交

**提交信息格式**:

```
chore: release v${version}
```

**如果选择 Y**:

```
✓ Commit (chore: release v0.0.2)? Yes
$ git add . --update
$ git commit -m "chore: release v0.0.2"
[master abc1234] chore: release v0.0.2
 2 files changed, 15 insertions(+), 2 deletions(-)
```

**如果选择 n**:

```
✗ Commit (chore: release v0.0.2)? No
```

不会创建提交，但版本号已更新。

#### 步骤 10: 创建 Git Tag（交互式）

**提示信息**:

```
? Tag (v0.0.2)? (Y/n)
```

**回答选项**:

- `Y` 或 `Enter`: 创建 tag
- `n`: 跳过创建 tag

**Tag 名称格式**:

```
v${version}
```

**如果选择 Y**:

```
✓ Tag (v0.0.2)? Yes
$ git tag v0.0.2
```

**如果选择 n**:

```
✗ Tag (v0.0.2)? No
```

不会创建 tag。

#### 步骤 11: 推送到远程（可选）

**注意**: 当前配置中 `push: false`，所以不会自动推送。

**如果配置了 `push: true`**，会显示:

```
? Push to git remote? (Y/n)
```

**回答选项**:

- `Y` 或 `Enter`: 推送提交和 tag
- `n`: 跳过推送

**如果选择 Y**:

```
✓ Push to git remote? Yes
$ git push
$ git push --tags
```

### 非交互式模式

使用 `--ci` 参数可以跳过所有交互式问题：

```bash
pnpm release --ci
```

**行为**:

- 自动选择 patch 版本
- 自动确认所有提示
- 适用于 CI/CD 环境

### 预览模式

使用 `--dry-run` 参数可以预览发布流程，不会实际执行：

```bash
pnpm release --dry-run
```

**行为**:

- 显示所有会执行的操作
- 不会实际修改文件
- 不会创建提交和 tag

### 其他选项

#### 只更新版本号

```bash
pnpm release --no-git
```

不会执行 git 相关操作。

#### 指定版本号

```bash
pnpm release 1.2.3
```

直接指定版本号，跳过版本选择。

#### 跳过钩子

```bash
pnpm release --no-hooks
```

不执行配置的钩子函数。

---

## ⚙️ 配置文件详解

### .release-it.json

```json
{
  "git": {
    "commitMessage": "chore: release v${version}",
    "tagName": "v${version}",
    "requireCleanWorkingDir": false,
    "requireUpstream": false,
    "requireCommits": true,
    "addUntrackedFiles": false,
    "push": false
  },
  "github": {
    "release": false
  },
  "npm": {
    "publish": false
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "preset": "angular",
      "infile": "CHANGELOG.md",
      "config": "./changelog-option.cjs"
    }
  },
  "hooks": {
    "before:init": ["pnpm lint"]
  }
}
```

#### Git 配置

| 配置项 | 说明 | 默认值 | 当前值 |
| --- | --- | --- | --- |
| `commitMessage` | 提交信息模板 | `chore: release v${version}` | `chore: release v${version}` |
| `tagName` | Tag 名称模板 | `v${version}` | `v${version}` |
| `requireCleanWorkingDir` | 要求工作目录干净 | `true` | `false` |
| `requireUpstream` | 要求有上游分支 | `true` | `false` |
| `requireCommits` | 要求有提交记录 | `true` | `true` |
| `addUntrackedFiles` | 添加未跟踪文件 | `false` | `false` |
| `push` | 自动推送 | `true` | `false` |

**详细说明**:

- **commitMessage**:

  - `${version}` 会被替换为实际版本号
  - 示例: `chore: release v0.0.2`

- **tagName**:

  - `${version}` 会被替换为实际版本号
  - 示例: `v0.0.2`

- **requireCleanWorkingDir**:

  - `true`: 要求工作目录没有未提交的更改
  - `false`: 允许有未提交的更改（当前配置）

- **requireUpstream**:

  - `true`: 要求当前分支有对应的远程分支
  - `false`: 不要求远程分支（当前配置）

- **requireCommits**:

  - `true`: 要求有提交记录才能发布
  - `false`: 允许没有提交记录

- **addUntrackedFiles**:

  - `true`: 自动添加未跟踪的文件到暂存区
  - `false`: 不添加未跟踪的文件（当前配置）

- **push**:
  - `true`: 自动推送提交和 tag 到远程
  - `false`: 不自动推送（当前配置）

#### GitHub 配置

| 配置项    | 说明                | 默认值  | 当前值  |
| --------- | ------------------- | ------- | ------- |
| `release` | 创建 GitHub Release | `false` | `false` |

**说明**:

- `true`: 自动在 GitHub 上创建 Release
- `false`: 不创建 GitHub Release（当前配置）

#### NPM 配置

| 配置项    | 说明       | 默认值  | 当前值  |
| --------- | ---------- | ------- | ------- |
| `publish` | 发布到 NPM | `false` | `false` |

**说明**:

- `true`: 自动发布到 NPM
- `false`: 不发布到 NPM（当前配置，因为是私有项目）

#### 插件配置

**@release-it/conventional-changelog**:

| 配置项   | 说明           | 当前值                   |
| -------- | -------------- | ------------------------ |
| `preset` | 提交规范预设   | `angular`                |
| `infile` | 输出文件       | `CHANGELOG.md`           |
| `config` | 自定义配置文件 | `./changelog-option.cjs` |

**说明**:

- `preset`: 使用 Angular 提交规范
- `infile`: 变更日志输出到 `CHANGELOG.md`
- `config`: 使用自定义配置文件生成带中文标签的日志

#### 钩子配置

| 钩子          | 说明               | 当前值          |
| ------------- | ------------------ | --------------- |
| `before:init` | 发布流程开始前执行 | `["pnpm lint"]` |

**可用钩子**:

- `before:init`: 发布流程开始前
- `before:bump`: 更新版本号前
- `after:bump`: 更新版本号后
- `before:release`: 发布前
- `after:release`: 发布后

**示例**:

```json
{
  "hooks": {
    "before:init": ["pnpm lint"],
    "after:bump": ["pnpm build"],
    "after:release": ["echo 'Release completed!'"]
  }
}
```

### changelog-option.cjs

```javascript
// changelog-option.cjs
module.exports = {
  gitRawCommitsOpts: {
    format:
      '%B%n-hash-%n%H%n-gitTags-%n%d%n-committerDate-%n%ci%n-authorName-%n%an%n-authorEmail-%n%ae'
  },
  writerOpts: {
    ...getWriterOpts()
  }
}

function getWriterOpts() {
  return {
    transform: (commit, context) => {
      // 转换提交类型为中文标签
      // ...
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title'
  }
}
```

#### 配置说明

**gitRawCommitsOpts.format**:

- 定义从 git 获取提交信息的格式
- `%B`: 提交信息主体
- `%H`: 完整 commit hash
- `%d`: ref 名称
- `%ci`: 提交日期
- `%an`: 作者名称
- `%ae`: 作者邮箱

**writerOpts.transform**:

- 转换函数，用于自定义提交信息的显示格式
- 将英文类型转换为中文标签和 emoji

**类型映射**:

| 原始类型   | 转换后                                    | Emoji |
| ---------- | ----------------------------------------- | ----- |
| `feat`     | `✨ Features \| 新功能`                   | ✨    |
| `fix`      | `🐛 Bug Fixes \| Bug 修复`                | 🐛    |
| `perf`     | `⚡ Performance Improvements \| 性能优化` | ⚡    |
| `revert`   | `⏪ Reverts \| 回退`                      | ⏪    |
| `style`    | `💄 Styles \| 风格`                       | 💄    |
| `docs`     | `📝 Documentation \| 文档`                | 📝    |
| `refactor` | `♻ Code Refactoring \| 代码重构`         | ♻    |
| `test`     | `✅ Tests \| 测试`                        | ✅    |
| `build`    | `👷‍ Build System \| 构建`                | 👷‍   |
| `ci`       | `🔧 Continuous Integration \| CI 配置`    | 🔧    |
| `chore`    | `🎫 Chores \| 其他更新`                   | 🎫    |

**排序配置**:

- `groupBy: 'type'`: 按类型分组
- `commitGroupsSort: 'title'`: 组按标题排序
- `commitsSort: ['scope', 'subject']`: 提交按范围和主题排序
- `noteGroupsSort: 'title'`: 注释组按标题排序

---

## 🔄 完整工作流程

### 标准发布流程

#### 1. 准备阶段

```bash
# 1. 确保代码已提交
git status

# 2. 运行代码检查（可选，release-it 会自动运行）
pnpm lint

# 3. 确保提交信息符合规范
git log --oneline
```

#### 2. 执行发布

```bash
# 运行发布命令
pnpm release
```

#### 3. 交互式选择

**步骤 1**: 选择版本类型

```
? Select increment (next version):
  ❯ patch (0.0.1 → 0.0.2)
```

**步骤 2**: 确认版本号

```
? Version 0.0.2 is ready. Continue? (Y/n)
```

**步骤 3**: 确认提交

```
? Commit (chore: release v0.0.2)? (Y/n)
```

**步骤 4**: 确认创建 Tag

```
? Tag (v0.0.2)? (Y/n)
```

#### 4. 完成发布

```bash
# 查看更新后的文件
git status
git log --oneline
git tag -l
```

### 手动生成 Changelog 流程

#### 1. 确保提交符合规范

```bash
# 查看提交历史
git log --oneline

# 示例输出:
# abc1234 feat: add user login
# def5678 fix: resolve refresh bug
# ghi9012 docs: update README
```

#### 2. 生成变更日志

```bash
# 生成增量变更日志
pnpm changelog

# 或生成完整变更日志
pnpm changelog:all

# 或使用自定义配置
pnpm changelog:config
```

#### 3. 查看生成的日志

```bash
# 查看 CHANGELOG.md
cat CHANGELOG.md
```

### 完整示例场景

#### 场景 1: 首次发布

```bash
# 1. 初始化项目，进行开发
git commit -m "feat: initial project setup"
git commit -m "feat: add user module"
git commit -m "fix: resolve login bug"

# 2. 生成完整变更日志
pnpm changelog:all

# 3. 发布第一个版本
pnpm release
# 选择: major (0.0.0 → 1.0.0)
```

#### 场景 2: 修复 Bug 后发布

```bash
# 1. 修复 bug
git commit -m "fix: resolve page refresh issue"

# 2. 发布补丁版本
pnpm release
# 选择: patch (0.0.1 → 0.0.2)
```

#### 场景 3: 添加新功能后发布

```bash
# 1. 添加新功能
git commit -m "feat: add data export feature"
git commit -m "docs: update API documentation"

# 2. 发布次版本
pnpm release
# 选择: minor (0.0.1 → 0.1.0)
```

#### 场景 4: 重大变更后发布

```bash
# 1. 进行重大重构
git commit -m "refactor: restructure API layer"
git commit -m "feat!: change authentication method"

BREAKING CHANGE: Authentication API has changed

# 2. 发布主版本
pnpm release
# 选择: major (0.0.1 → 1.0.0)
```

---

## ❓ 常见问题解答

### Changelog 相关问题

#### Q1: 为什么生成的 changelog 是空的？

**原因**:

- 提交信息不符合 Conventional Commits 规范
- 没有符合规范的提交记录

**解决方案**:

```bash
# 1. 检查提交信息格式
git log --oneline

# 2. 确保提交信息符合规范
# 正确: feat: add user login
# 错误: add user login

# 3. 重新生成
pnpm changelog
```

#### Q2: 如何只生成特定版本的 changelog？

**解决方案**:

```bash
# 使用 -r 参数指定版本范围
conventional-changelog -p angular -i CHANGELOG.md -s -r 0.0.1
```

#### Q3: 生成的 changelog 格式不对？

**原因**:

- 没有使用自定义配置文件
- 配置文件路径错误

**解决方案**:

```bash
# 使用自定义配置
pnpm changelog:config

# 检查配置文件是否存在
ls changelog-option.cjs
```

### Release-it 相关问题

#### Q1: 发布时提示 "requireCleanWorkingDir" 错误？

**原因**:

- 工作目录有未提交的更改

**解决方案**:

```bash
# 方案 1: 提交所有更改
git add .
git commit -m "chore: update files"

# 方案 2: 修改配置允许未提交的更改
# 在 .release-it.json 中设置:
# "requireCleanWorkingDir": false
```

#### Q2: 如何跳过某个步骤？

**解决方案**:

```bash
# 跳过 git 操作
pnpm release --no-git

# 跳过钩子
pnpm release --no-hooks

# 跳过所有交互（CI 模式）
pnpm release --ci
```

#### Q3: 如何回退版本发布？

**解决方案**:

```bash
# 1. 删除本地 tag
git tag -d v0.0.2

# 2. 回退提交
git reset --hard HEAD~1

# 3. 如果已推送，删除远程 tag
git push origin :refs/tags/v0.0.2
```

#### Q4: 发布时 changelog 没有更新？

**原因**:

- 插件配置错误
- 没有符合规范的提交

**解决方案**:

```bash
# 1. 检查插件配置
cat .release-it.json

# 2. 检查提交记录
git log --oneline

# 3. 手动生成 changelog 测试
pnpm changelog:config
```

#### Q5: 如何自定义提交信息格式？

**解决方案**:

```json
{
  "git": {
    "commitMessage": "release: v${version}"
  }
}
```

#### Q6: 如何启用 GitHub Release？

**解决方案**:

```json
{
  "github": {
    "release": true
  }
}
```

需要配置 GitHub token:

```bash
export GITHUB_TOKEN=your_token_here
```

#### Q7: 如何启用自动推送？

**解决方案**:

```json
{
  "git": {
    "push": true
  }
}
```

### 配置相关问题

#### Q1: 如何修改 changelog 的生成格式？

**解决方案**: 编辑 `changelog-option.cjs` 文件，修改 `transform` 函数。

#### Q2: 如何添加自定义提交类型？

**解决方案**:

1. 在 `commitlint.config.js` 中添加类型
2. 在 `changelog-option.cjs` 中添加类型映射

#### Q3: 如何禁用某个钩子？

**解决方案**:

```json
{
  "hooks": {
    "before:init": [] // 空数组表示不执行
  }
}
```

---

## 📚 参考资源

### 官方文档

- [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)
- [Release-it](https://github.com/release-it/release-it)
- [Conventional Commits](https://www.conventionalcommits.org/)

### 相关工具

- [Commitizen](https://github.com/commitizen/cz-cli) - 规范化提交工具
- [Commitlint](https://github.com/conventional-changelog/commitlint) - 提交信息检查工具

---

## 📝 总结

### Changelog 使用要点

1. ✅ 提交信息必须符合 Conventional Commits 规范
2. ✅ 使用 `pnpm changelog` 生成增量日志
3. ✅ 使用 `pnpm changelog:config` 生成带中文标签的日志
4. ✅ 定期更新 CHANGELOG.md 文件

### Release-it 使用要点

1. ✅ 发布前确保代码已提交
2. ✅ 根据变更类型选择合适的版本号
3. ✅ 确认所有交互式提示
4. ✅ 发布后检查生成的文件和 tag

### 最佳实践

1. **提交规范**: 始终使用规范化提交信息
2. **版本管理**: 遵循语义化版本规范
3. **变更记录**: 及时更新 changelog
4. **自动化**: 利用工具自动化发布流程
5. **文档维护**: 保持文档与代码同步

---

**文档版本**: 1.0.0  
**最后更新**: 2024-11-13  
**维护者**: 项目团队
