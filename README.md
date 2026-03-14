# Diff-Lens 📋

一個輕量級的文本差異比較應用，類似 Git 的 diff 功能。部署在 GitHub Pages 上，完全在瀏覽器端運行，無需後端服務。

## ✨ 功能特性

- **多層級比對** - 支援行級、單詞級、段落級的差異分析
- **清晰的視覺標記** 
  - 🟢 綠色標示新增內容
  - 🔴 紅色標示刪除內容
  - 🟡 黃色標示修改內容
- **靈活的輸入方式** - 支援直接輸入或上傳文件
- **多種展示模式** - 逐行比較或整體差異模式
- **互動功能** - 展開/收合差異區段，複製結果

## 🛠️ 技術棧

- **前端框架**：純 HTML/CSS/JavaScript（無框架依賴）
- **差異計算**：[jsdiff](https://github.com/kpdecker/jsdiff) 庫
- **部署**：GitHub Pages
- **模組化設計**：分離關注點，易於維護和擴展

## 📦 項目結構

```
diff-lens/
├── index.html              # 主入口頁面
├── styles/
│   └── main.css           # 主樣式表
├── scripts/
│   ├── app.js             # 應用程序入口
│   ├── modules/
│   │   ├── diffEngine.js  # 差異計算引擎（jsdiff 包裝器）
│   │   ├── parser.js      # 差異解析和格式化
│   │   ├── store.js       # 應用狀態管理
│   │   └── ui.js          # UI 交互邏輯
│   └── lib/
│       └── diff.min.js    # jsdiff 庫（CDN 加載）
├── LICENSE                # MIT 許可證
├── README.md              # 本文件
└── .gitignore             # Git 忽略配置
```

## 🚀 快速開始

### 本地運行

1. **克隆項目**
   ```bash
   git clone https://github.com/yourusername/diff-lens.git
   cd diff-lens
   ```

2. **啟動本地服務器**（推薦用於開發）
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js
   npx http-server
   ```

3. **訪問應用**
   在瀏覽器中打開 `http://localhost:8000`

### GitHub Pages 部署

本項目已配置為 GitHub Pages 項目站點。

1. Fork 本倉庫到您的 GitHub 賬戶
2. 在倉庫設置中啟用 GitHub Pages（使用 `main` 分支）
3. 訪問 `https://yourusername.github.io/diff-lens/`

## 📖 使用指南

### 基本使用

1. **輸入內容**
   - 在左側「原始內容」框中粘貼或輸入文本
   - 在右側「修改後內容」框中粘貼或輸入文本
   - 或使用「上傳文件」按鈕上傳文本文件

2. **選擇比對方式**
   - **行級差異**（Line）- 按行比較
   - **單詞級差異**（Word）- 按單詞比較
   - **段落級差異**（Paragraph）- 按段落比較

3. **查看差異**
   - 綠色高亮 = 新增的內容
   - 紅色高亮 = 刪除的內容
   - 黃色高亮 = 修改的內容

4. **交互操作**
   - 點擊差異區段的 [+] 展開或 [-] 收合
   - 點擊「複製」按鈕複製帶格式的差異結果

### 高級選項

- **逐行模式** - 左右並排展示，逐行對應
- **整體模式** - 展示整體的插入和刪除變化

## 🎨 顏色編碼

| 顏色 | 含義 | 示例 |
|------|------|------|
| 🟢 綠色 | 新增內容 | `+ 這是新加的行` |
| 🔴 紅色 | 刪除內容 | `- 這是刪除的行` |
| 🟡 黃色 | 修改內容 | 原文本被修改後的內容 |

## 🔧 模組說明

### diffEngine.js
封裝 jsdiff 庫，提供統一的接口用於計算不同粒度的差異。

```javascript
const engine = new DiffEngine();
const result = engine.diffLines(original, modified);
```

### parser.js
解析 jsdiff 的輸出，將其轉換為 HTML 和可視化格式。

### store.js
管理應用的全局狀態（當前內容、選擇的比對方式等）。

### ui.js
處理所有 UI 交互事件（輸入、上傳、模式切換、複製等）。

## 📝 開發貢獻

歡迎提交 Issue 和 Pull Request！

1. Fork 本倉庫
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📜 許可證

本項目採用 MIT 許可證 - 詳見 [LICENSE](LICENSE) 文件。

## 🙏 致謝

- 感謝 [jsdiff](https://github.com/kpdecker/jsdiff) 提供強大的文本差異算法
- 靈感來自 GitHub 的 diff 視圖

## 📞 聯繫方式

如有問題或建議，歡迎 [提交 Issue](https://github.com/yourusername/diff-lens/issues)。

---

Made with ❤️ by Diff-Lens Team
