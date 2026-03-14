/**
 * Parser Module
 * 將 jsdiff 的輸出轉換為 HTML 和可視化格式
 */

const Parser = {
  /**
   * 轉換差異為 HTML
   * @param {Array} diffs - jsdiff 輸出的差異數組
   * @param {string} type - 差異類型：'line', 'word', 'paragraph'
   * @returns {Object} { original: html, modified: html, combined: html }
   */
  toHtml(diffs, type = 'line') {
    let originalHtml = '';
    let modifiedHtml = '';
    let combinedHtml = '';

    diffs.forEach((diff) => {
      const [action, content] = [diff.added ? 'add' : diff.removed ? 'remove' : 'equal', diff.value];
      const escaped = this.escapeHtml(content);

      if (action === 'equal') {
        originalHtml += `<span class="diff-equal">${escaped}</span>`;
        modifiedHtml += `<span class="diff-equal">${escaped}</span>`;
        combinedHtml += `<span class="diff-equal">${escaped}</span>`;
      } else if (action === 'add') {
        modifiedHtml += `<span class="diff-added">${escaped}</span>`;
        combinedHtml += `<span class="diff-added">+ ${escaped}</span>`;
      } else if (action === 'remove') {
        originalHtml += `<span class="diff-removed">${escaped}</span>`;
        combinedHtml += `<span class="diff-removed">- ${escaped}</span>`;
      }
    });

    return {
      original: originalHtml,
      modified: modifiedHtml,
      combined: combinedHtml
    };
  },

  /**
   * 轉換差異為純文本（帶前綴）
   * @param {Array} diffs - jsdiff 輸出的差異數組
   * @returns {string} 帶有 +/- 標記的文本
   */
  toPlainText(diffs) {
    return diffs
      .map((diff) => {
        const prefix = diff.added ? '+ ' : diff.removed ? '- ' : '  ';
        return prefix + diff.value;
      })
      .join('');
  },

  /**
   * 轉換差異為 Markdown
   * @param {Array} diffs - jsdiff 輸出的差異數組
   * @returns {string} Markdown 格式的差異
   */
  toMarkdown(diffs) {
    return diffs
      .map((diff) => {
        if (diff.added) {
          return `\`\`\`diff\n+${diff.value}\n\`\`\``;
        } else if (diff.removed) {
          return `\`\`\`diff\n-${diff.value}\n\`\`\``;
        }
        return diff.value;
      })
      .join('');
  },

  /**
   * 轉換差異為結構化數據（用於統計和分析）
   * @param {Array} diffs - jsdiff 輸出的差異數組
   * @returns {Object} 統計信息
   */
  analyze(diffs) {
    let added = 0;
    let removed = 0;
    let unchanged = 0;
    let addedText = '';
    let removedText = '';

    diffs.forEach((diff) => {
      if (diff.added) {
        added++;
        addedText += diff.value;
      } else if (diff.removed) {
        removed++;
        removedText += diff.value;
      } else {
        unchanged++;
      }
    });

    return {
      totalChanges: added + removed,
      added,
      removed,
      unchanged,
      changePercentage: diffs.length > 0 ? ((added + removed) / diffs.length * 100).toFixed(2) : 0,
      addedText,
      removedText
    };
  },

  /**
   * 逐行比較的 HTML 輸出（左右對比）
   * @param {Array} diffs - jsdiff 輸出
   * @param {string} type - 差異類型
   * @returns {string} 逐行比較的 HTML
   */
  toSideBySideHtml(diffs, type = 'line') {
    let leftHtml = '';
    let rightHtml = '';
    let lineNum = 1;

    diffs.forEach((diff) => {
      const escaped = this.escapeHtml(diff.value);

      if (diff.removed) {
        leftHtml += `<div class="diff-line diff-line-removed">
          <span class="line-num">${lineNum++}</span>
          <span class="diff-removed">− ${escaped}</span>
        </div>`;
      } else if (diff.added) {
        rightHtml += `<div class="diff-line diff-line-added">
          <span class="line-num">${lineNum++}</span>
          <span class="diff-added">+ ${escaped}</span>
        </div>`;
      } else {
        const equalLine = `<div class="diff-line diff-line-equal">
          <span class="line-num">${lineNum++}</span>
          <span class="diff-equal">${escaped}</span>
        </div>`;
        leftHtml += equalLine;
        rightHtml += equalLine;
      }
    });

    return { left: leftHtml, right: rightHtml };
  },

  /**
   * HTML 轉義
   * @param {string} text - 原始文本
   * @returns {string} 轉義後的 HTML
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }
};

// 導出模組
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Parser;
}
