# 部署指南

## GitHub Pages 部署

Diff-Lens 已配置為自動部署到 GitHub Pages。

### 快速開始

1. **Fork 本倉庫**
   - 訪問 [GitHub 倉庫](https://github.com/yourusername/diff-lens)
   - 點擊右上角的 "Fork" 按鈕

2. **啟用 GitHub Pages**
   - 進入您 Fork 的倉庫設置
   - 選擇 **Settings** → **Pages**
   - 在 "Source" 下選擇 **Deploy from a branch**
   - 選擇 **main** 分支（或 **master**）
   - 點擊 **Save**

3. **自動部署**
   - 當您推送代碼到 `main` 或 `master` 分支時
   - GitHub Actions 會自動構建和部署應用
   - 部署完成後訪問：`https://yourusername.github.io/diff-lens/`

### GitHub Actions 工作流

自動部署由 `.github/workflows/deploy.yml` 配置：

```yaml
# 觸發條件
on:
  push:
    branches: [ master, main ]  # 推送到這些分支時觸發

# 部署步驟
jobs:
  deploy:
    - 檢查代碼
    - 配置 Git
    - 部署到 GitHub Pages
```

### 故障排除

**問題：GitHub Actions 失敗**

原因可能：
- ❌ 分支名稱錯誤（應該是 `main` 或 `master`）
- ❌ Git 配置缺失
- ❌ 權限問題

解決方案：
- ✅ 檢查 `.github/workflows/deploy.yml` 中的分支名稱
- ✅ 確保 Git user.name 和 user.email 已配置
- ✅ 在 Repository Settings → Actions 中檢查權限

### 本地測試

推送到 GitHub 前，可以本地測試：

```bash
# 啟動本地服務器
python -m http.server 8000

# 訪問 http://localhost:8000
```

### 部署後

部署完成後，您的應用將在以下地址可用：

```
https://yourusername.github.io/diff-lens/
```

### 自訂域名（可選）

如果要使用自訂域名：

1. 在 `.github/workflows/deploy.yml` 中添加 CNAME：
```yaml
with:
  cname: yourdomain.com
```

2. 在域名提供商設置 CNAME 記錄

3. 在 Repository Settings → Pages 中確認自訂域名

### 更新和維護

- 代碼更新會自動觸發重新部署
- GitHub Pages 使用最新推送的代碼
- 歷史版本可以通過 Git tags 管理

## 常見問題

**Q: 我應該使用 main 還是 master？**
A: 新倉庫默認使用 `main`，但兩者都被配置支援。

**Q: 部署需要多長時間？**
A: 通常 1-2 分鐘。可以在 Actions 標籤下監視進度。

**Q: 可以部署到自訂域名嗎？**
A: 可以。修改 workflow 文件並添加 CNAME 配置。

**Q: 如何回滾到之前的版本？**
A: 檢出並推送舊版本的代碼，或使用 `git revert`。
