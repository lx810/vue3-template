# 推送代码到 GitHub 指南

## 步骤概览

1. 添加并提交当前更改
2. 添加远程仓库
3. 推送代码到 GitHub

## 详细步骤

### 步骤 1: 添加并提交当前更改

```bash
# 查看当前状态
git status

# 添加所有更改（包括新文件和修改的文件）
git add .

# 提交更改
git commit -m "feat: 添加文档和 GitHub Actions 配置"
```

### 步骤 2: 添加远程仓库

#### 方法 1: 如果还没有创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 输入仓库名称（例如：my-vue-app）
4. 选择公开或私有
5. 不要初始化 README、.gitignore 或 license（因为本地已有代码）
6. 点击 "Create repository"
7. 复制仓库地址（例如：https://github.com/username/my-vue-app.git）

#### 方法 2: 添加远程仓库

```bash
# 添加远程仓库（将 YOUR_USERNAME 和 YOUR_REPO_NAME 替换为实际的用户名和仓库名）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 或者使用 SSH（推荐，需要配置 SSH 密钥）
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# 验证远程仓库配置
git remote -v
```

### 步骤 3: 推送代码到 GitHub

```bash
# 首次推送，设置上游分支
git push -u origin master

# 或者如果默认分支是 main
git push -u origin master:main

# 以后的推送可以直接使用
git push
```

## 完整命令序列

```bash
# 1. 添加所有更改
git add .

# 2. 提交更改
git commit -m "feat: 添加文档和 GitHub Actions 配置"

# 3. 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 4. 推送代码
git push -u origin master
```

## 常见问题

### 问题 1: 如果远程仓库已经存在内容

如果远程仓库已经初始化了 README 或其他文件，需要先拉取：

```bash
# 拉取远程内容并允许不相关的历史记录合并
git pull origin master --allow-unrelated-histories

# 解决可能的冲突后，再推送
git push -u origin master
```

### 问题 2: 如果默认分支是 main 而不是 master

```bash
# 重命名本地分支为 main
git branch -M main

# 推送到 main 分支
git push -u origin main
```

### 问题 3: 认证问题

如果遇到认证问题，可以：

1. **使用个人访问令牌（Personal Access Token）**

   - 在 GitHub 设置中生成 token
   - 使用 token 作为密码

2. **使用 SSH 密钥**

   - 生成 SSH 密钥：`ssh-keygen -t ed25519 -C "your_email@example.com"`
   - 将公钥添加到 GitHub 账户

3. **使用 GitHub CLI**
   - 安装 GitHub CLI
   - 运行 `gh auth login`

## 验证推送结果

推送成功后，可以在 GitHub 网页上查看：

- 仓库地址：https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
- 应该能看到所有提交的文件和历史记录

## 后续操作

### 设置分支保护规则

在 GitHub 仓库设置中：

1. 进入 Settings > Branches
2. 添加分支保护规则
3. 选择要保护的分支（如 main 或 master）
4. 启用必要的保护选项

### 配置 GitHub Actions

如果已经配置了 `.github/workflows/main.yml`，推送后 GitHub Actions 会自动运行。

### 设置 GitHub Pages（如果需要）

1. 进入仓库 Settings > Pages
2. 选择源分支和目录
3. 保存设置
