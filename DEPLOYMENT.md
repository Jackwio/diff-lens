# 部署指南

## GitHub Pages 部署

Diff-Lens 已配置為自動部署到 GitHub Pages。

### 快速開始

1. **Fork 本倉庫**
   - 訪問 [GitHub 倉庫](https://github.com/yourusername/diff-lens)
   - 點擊右上角的 "Fork" 按鈕

2. **推送代碼到 GitHub**
   ```bash
   git push origin main
   ```

3. **配置 GitHub Pages（必須手動設置）**
   
   ⚠️ **重要**：GitHub Pages 配置需要手動完成
   
   - 進入倉庫 **Settings**
   - 左側菜單選擇 **Pages**
   - 在 "Build and deployment" 部分：
     - **Source**：選擇 "Deploy from a branch"
     - **Branch**：選擇 **gh-pages**
     - **Folder**：選擇 **/ (root)**
     - 點擊 **Save**

4. **驗證部署**
   - GitHub Actions 會自動構建和部署
   - 等待 1-2 分鐘完成部署
   - 訪問：`https://yourusername.github.io/diff-lens/`

### GitHub Pages 配置界面參考

```
Settings → Pages

Build and deployment
├── Source
│   └── [Deploy from a branch] ← 選擇此項
├── Branch
│   ├── [gh-pages]  ← 選擇此分支
│   └── / (root)    ← 選擇此目錄
└── [Save]
```

### 完整設置步驟（圖文說明）

1. **點擊 Settings**
   ![Settings Button]

2. **選擇 Pages（左側菜單）**
   ```
   左側菜單
   ├── General
   ├── Branches
   ├── Pages ← 點擊這裡
   └── ...
   ```

3. **配置來源**
   - 在 "Build and deployment" 下
   - 將 Source 改為 "Deploy from a branch"

4. **選擇分支和文件夾**
   - Branch: **gh-pages** （GitHub Actions 自動創建）
   - Folder: **/ (root)**

5. **Save 後等待**
   - 頁面會顯示藍色的 "Your site is live at..." 消息
   - URL 會像這樣：`https://yourusername.github.io/diff-lens/`

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
    - 部署到 gh-pages 分支
```

**工作流程**：
1. 推送代碼到 main 分支
2. GitHub Actions 自動觸發
3. 代碼被部署到 `gh-pages` 分支
4. GitHub Pages 從 `gh-pages` 分支服務文件

### 故障排除

**問題：訪問 GitHub Pages 返回 404**

原因可能：
- ❌ GitHub Pages 設置未正確配置
- ❌ 未選擇 `gh-pages` 分支
- ❌ Source 沒有設為 "Deploy from a branch"

解決方案：
- ✅ 檢查 Settings → Pages 配置
- ✅ 確認選擇了 `gh-pages` 分支和 `/ (root)` 文件夾
- ✅ 刷新頁面後等待 5-10 分鐘
- ✅ 清除瀏覽器緩存（Ctrl+Shift+Delete）

**問題：GitHub Pages 設置頁面沒有出現**

可能是倉庫權限問題：
- ✅ 確保您是倉庫所有者或有管理員權限
- ✅ 公開倉庫才能使用 GitHub Pages（除非有 Pro 賬戶）

**問題：GitHub Actions 失敗**

檢查：
- ✅ Actions 日誌中的錯誤信息
- ✅ 確保 `main` 分支存在
- ✅ 檢查 `.github/workflows/deploy.yml` 語法

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

1. 在倉庫根目錄創建 `CNAME` 文件：
   ```
   yourdomain.com
   ```

2. 在 GitHub Pages 設置中配置自訂域名

3. 在域名提供商設置 DNS 記錄

### 更新和維護

- 代碼更新會自動觸發重新部署
- GitHub Pages 使用最新推送的代碼
- 歷史版本可以通過 Git tags 管理

## 常見問題

**Q: 我應該使用 main 還是 master？**
A: 新倉庫默認使用 `main`，但兩者都被配置支援。

**Q: 部署需要多長時間？**
A: 通常 1-2 分鐘。可以在 Actions 標籤下監視進度。

**Q: GitHub Pages 設置中為什麼看不到 gh-pages 分支？**
A: 第一次部署後 gh-pages 分支才會被創建。先推送代碼，GitHub Actions 會自動創建。

**Q: 可以部署到自訂域名嗎？**
A: 可以。在倉庫根目錄添加 CNAME 文件並配置 DNS。

**Q: 如何回滾到之前的版本？**
A: 檢出並推送舊版本的代碼，或使用 `git revert`。

**Q: GitHub Pages 支援子目錄嗎？**
A: 是的。在 Pages 設置中選擇 "Folder: /docs" 可以從 docs 文件夾部署。
