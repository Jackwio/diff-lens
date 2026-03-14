/**
 * UI Module
 * 處理所有 UI 交互和事件
 */

const UI = {
  /**
   * 初始化 UI 事件監聽
   */
  init() {
    this.attachEventListeners();
    this.setupFileUpload();
  },

  /**
   * 綁定事件監聽器
   */
  attachEventListeners() {
    // 原始內容輸入
    const originalInput = document.getElementById('originalInput');
    if (originalInput) {
      originalInput.addEventListener('input', (e) => {
        Store.setOriginal(e.target.value);
      });
    }

    // 修改後內容輸入
    const modifiedInput = document.getElementById('modifiedInput');
    if (modifiedInput) {
      modifiedInput.addEventListener('input', (e) => {
        Store.setModified(e.target.value);
      });
    }

    // 比對粒度按鈕
    const granularityBtns = document.querySelectorAll('[data-granularity]');
    granularityBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const granularity = btn.dataset.granularity;
        Store.setGranularity(granularity);
        this.updateGranularityButtons(granularity);
      });
    });

    // 視圖模式按鈕
    const viewModeBtns = document.querySelectorAll('[data-view-mode]');
    viewModeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const mode = btn.dataset.viewMode;
        Store.setViewMode(mode);
        this.updateViewModeButtons(mode);
      });
    });

    // 清空按鈕
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        Store.reset();
        this.updateInputs();
        this.clearResults();
      });
    }

    // 複製按鈕
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        this.copyResultsToClipboard();
      });
    }
  },

  /**
   * 設置文件上傳功能
   */
  setupFileUpload() {
    const uploadOriginal = document.getElementById('uploadOriginal');
    const uploadModified = document.getElementById('uploadModified');

    if (uploadOriginal) {
      uploadOriginal.addEventListener('change', (e) => {
        this.handleFileUpload(e.target.files[0], 'original');
      });
    }

    if (uploadModified) {
      uploadModified.addEventListener('change', (e) => {
        this.handleFileUpload(e.target.files[0], 'modified');
      });
    }
  },

  /**
   * 處理文件上傳
   * @param {File} file - 上傳的文件
   * @param {string} type - 'original' 或 'modified'
   */
  handleFileUpload(file, type) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (type === 'original') {
        Store.setOriginal(content);
        const input = document.getElementById('originalInput');
        if (input) input.value = content;
      } else if (type === 'modified') {
        Store.setModified(content);
        const input = document.getElementById('modifiedInput');
        if (input) input.value = content;
      }
    };
    reader.onerror = () => {
      alert('Failed to read file');
    };
    reader.readAsText(file);
  },

  /**
   * 更新輸入框值
   */
  updateInputs() {
    const state = Store.getState();
    const originalInput = document.getElementById('originalInput');
    const modifiedInput = document.getElementById('modifiedInput');

    if (originalInput) originalInput.value = state.original;
    if (modifiedInput) modifiedInput.value = state.modified;
  },

  /**
   * 更新比對粒度按鈕的活躍狀態
   * @param {string} granularity - 當前粒度
   */
  updateGranularityButtons(granularity) {
    const btns = document.querySelectorAll('[data-granularity]');
    btns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.granularity === granularity);
    });
  },

  /**
   * 更新視圖模式按鈕的活躍狀態
   * @param {string} mode - 當前模式
   */
  updateViewModeButtons(mode) {
    const btns = document.querySelectorAll('[data-view-mode]');
    btns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.viewMode === mode);
    });
  },

  /**
   * 顯示差異結果
   * @param {string} htmlContent - 差異的 HTML 內容
   */
  displayResults(htmlContent) {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
      resultsContainer.innerHTML = htmlContent;
      resultsContainer.style.display = 'block';
    }
  },

  /**
   * 清空結果
   */
  clearResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      resultsContainer.style.display = 'none';
    }
  },

  /**
   * 複製結果到剪貼板
   */
  copyResultsToClipboard() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer || !resultsContainer.textContent) {
      alert('No results to copy');
      return;
    }

    const text = resultsContainer.textContent;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      })
      .catch(() => {
        alert('Failed to copy to clipboard');
      });
  },

  /**
   * 展開/收合差異區段
   * @param {string} sectionId - 區段 ID
   */
  toggleDiffSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.toggle('collapsed');
      Store.toggleCollapse(sectionId);
    }
  },

  /**
   * 顯示加載狀態
   */
  showLoading() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
      resultsContainer.innerHTML = '<div class="loading">Comparing...</div>';
      resultsContainer.style.display = 'block';
    }
  },

  /**
   * 顯示錯誤信息
   * @param {string} message - 錯誤信息
   */
  showError(message) {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
      resultsContainer.innerHTML = `<div class="error">${message}</div>`;
      resultsContainer.style.display = 'block';
    }
  }
};

// 導出模組
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}
