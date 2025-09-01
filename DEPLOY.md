# GitHub Pages 部署说明

## 自动部署设置

本项目已配置自动部署到 GitHub Pages。每当你推送代码到 `main` 分支时，GitHub Actions 会自动构建并部署你的网站。

## 部署步骤

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "更新内容"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 `Settings` 选项卡
   - 在左侧菜单中找到 `Pages`
   - 在 `Source` 部分选择 `GitHub Actions`

3. **访问你的网站**
   - 部署完成后，你的网站将在以下地址可用：
   - `https://你的用户名.github.io/note-to-study/`

## 配置说明

- **base 路径**: 已设置为 `/note-to-study/`，这应该与你的仓库名称匹配
- **自动构建**: 使用 GitHub Actions 自动构建和部署
- **Node.js 版本**: 使用 Node.js 20

## 故障排除

如果部署失败，请检查：
1. 仓库名称是否为 `note-to-study`
2. 主分支是否为 `main`（如果是 `master`，需要修改 `.github/workflows/deploy.yml` 文件）
3. GitHub Pages 是否已启用并设置为使用 GitHub Actions

## 本地预览

在推送到 GitHub 之前，你可以本地预览：

```bash
# 开发模式
npm run docs:dev

# 构建并预览
npm run docs:build
npm run docs:preview
```