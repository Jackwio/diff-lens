/**
 * Diff-Lens Application Entry Point
 * Orchestrates all modules and handles the main logic
 */

const App = {
  /**
   * 初始化應用
   */
  init() {
    console.log('🚀 Diff-Lens initializing...');

    // 初始化 UI
    UI.init();

    // 訂閱狀態變化
    Store.subscribe((state) => {
      this.onStateChange(state);
    });

    // 綁定比對按鈕
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
      compareBtn.addEventListener('click', () => this.performDiff());
    }

    // 個別清空按鈕
    const clearOriginalBtn = document.getElementById('clearOriginalBtn');
    if (clearOriginalBtn) {
      clearOriginalBtn.addEventListener('click', () => {
        Store.setOriginal('');
        document.getElementById('originalInput').value = '';
      });
    }

    const clearModifiedBtn = document.getElementById('clearModifiedBtn');
    if (clearModifiedBtn) {
      clearModifiedBtn.addEventListener('click', () => {
        Store.setModified('');
        document.getElementById('modifiedInput').value = '';
      });
    }

    console.log('✅ Diff-Lens initialized successfully');
  },

  /**
   * 執行差異比對
   */
  performDiff() {
    const state = Store.getState();

    // 驗證輸入
    if (!state.original && !state.modified) {
      UI.showError('❌ 請輸入或上傳文本内容進行比對');
      return;
    }

    if (!state.original || !state.modified) {
      UI.showError('⚠️ 請同時提供原始内容和修改後的内容');
      return;
    }

    // 顯示加載狀態
    UI.showLoading();

    // 使用 requestAnimationFrame 確保 UI 先更新
    requestAnimationFrame(() => {
      try {
        // 計算差異
        const diffs = DiffEngine.diff(state.original, state.modified, state.granularity);

        if (diffs.length === 0) {
          UI.showError('✅ 兩個文本内容相同，無差異');
          return;
        }

        // 存儲差異結果
        Store.setCurrentDiff(diffs);

        // 分析統計
        const stats = Parser.analyze(diffs);
        this.updateStats(stats);

        // 根據視圖模式呈現結果
        if (state.viewMode === 'sideBySide') {
          this.renderSideBySide(diffs, state.granularity);
        } else {
          this.renderCombined(diffs, state.granularity);
        }

        console.log('✅ Diff completed', { granularity: state.granularity, mode: state.viewMode, changes: stats.totalChanges });
      } catch (error) {
        console.error('❌ Error during diff:', error);
        UI.showError(`❌ 比對過程中出錯: ${error.message}`);
      }
    });
  },

  /**
   * 合併模式呈現
   * @param {Array} diffs - 差異數組
   * @param {string} granularity - 粒度
   */
  renderCombined(diffs, granularity) {
    let output = '<div class="diff-content">';

    diffs.forEach((diff, index) => {
      const action = diff.added ? 'add' : diff.removed ? 'remove' : 'equal';
      // 確保 diff.value 被轉換為字符串
      const content = Parser.escapeHtml(diff.value);

      if (action === 'equal') {
        output += `<span class="diff-equal">${content}</span>`;
      } else if (action === 'add') {
        output += `<span class="diff-added">+ ${content}</span>`;
      } else if (action === 'remove') {
        output += `<span class="diff-removed">− ${content}</span>`;
      }
    });

    output += '</div>';

    UI.displayResults(output);
  },

  /**
   * 逐行比較模式呈現
   * @param {Array} diffs - 差異數組
   * @param {string} granularity - 粒度
   */
  renderSideBySide(diffs, granularity) {
    const { left, right } = Parser.toSideBySideHtml(diffs, granularity);

    const output = `
      <div class="side-by-side">
        <div class="side">
          <div class="side-header">🔴 原始内容</div>
          <div class="side-content">${left}</div>
        </div>
        <div class="side">
          <div class="side-header">🟢 修改後内容</div>
          <div class="side-content">${right}</div>
        </div>
      </div>
    `;

    UI.displayResults(output);
  },

  /**
   * 更新統計信息
   * @param {Object} stats - 統計數據
   */
  updateStats(stats) {
    const statsContainer = document.getElementById('statsContainer');
    const addedCount = document.getElementById('addedCount');
    const removedCount = document.getElementById('removedCount');
    const changePercentage = document.getElementById('changePercentage');

    if (statsContainer && addedCount && removedCount && changePercentage) {
      addedCount.textContent = stats.added;
      removedCount.textContent = stats.removed;
      changePercentage.textContent = stats.changePercentage + '%';
      statsContainer.style.display = 'flex';
    }
  },

  /**
   * 狀態變化回調
   * @param {Object} state - 應用狀態
   */
  onStateChange(state) {
    // 自動觸發比對（當兩個文本框都有内容時）
    if (state.original && state.modified && state.currentDiff.length > 0) {
      // 狀態已更新，UI 會自動反映
    }
  }
};

// 當 DOM 加載完成時初始化應用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
} else {
  App.init();
}
