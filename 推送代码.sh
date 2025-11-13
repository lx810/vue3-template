#!/bin/bash
# 推送代码到 GitHub 脚本

echo "=== 步骤 1: 添加所有更改 ==="
git add .

echo ""
echo "=== 步骤 2: 提交更改 ==="
git commit -m "feat: 添加文档和 GitHub Actions 配置"

echo ""
echo "=== 步骤 3: 检查远程仓库配置 ==="
git remote -v

echo ""
echo "=== 请按照以下步骤操作 ==="
echo "1. 如果没有远程仓库，请先创建 GitHub 仓库"
echo "2. 然后执行以下命令添加远程仓库："
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "3. 最后执行推送命令："
echo "   git push -u origin master"

