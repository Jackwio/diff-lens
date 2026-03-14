/**
 * DiffEngine Module
 * 封裝 jsdiff 庫，提供統一接口計算不同粒度的差異
 */

const DiffEngine = {
  /**
   * 計算行級差異
   * @param {string} original - 原始內容
   * @param {string} modified - 修改後內容
   * @returns {Array} 差異數組
   */
  diffLines(original, modified) {
    if (typeof Diff === 'undefined') {
      console.error('jsdiff library not loaded');
      return [];
    }
    return Diff.diffLines(original, modified);
  },

  /**
   * 計算單詞級差異
   * @param {string} original - 原始內容
   * @param {string} modified - 修改後內容
   * @returns {Array} 差異數組
   */
  diffWords(original, modified) {
    if (typeof Diff === 'undefined') {
      console.error('jsdiff library not loaded');
      return [];
    }
    return Diff.diffWords(original, modified);
  },

  /**
   * 計算段落級差異（按空行分割）
   * @param {string} original - 原始內容
   * @param {string} modified - 修改後內容
   * @returns {Array} 差異數組
   */
  diffParagraphs(original, modified) {
    if (typeof Diff === 'undefined') {
      console.error('jsdiff library not loaded');
      return [];
    }
    
    // 按空行分割段落
    const originalParas = original.split(/\n\s*\n/);
    const modifiedParas = modified.split(/\n\s*\n/);
    
    return Diff.diffArrays(originalParas, modifiedParas);
  },

  /**
   * 根據指定的粒度計算差異
   * @param {string} original - 原始內容
   * @param {string} modified - 修改後內容
   * @param {string} granularity - 粒度：'line', 'word', 'paragraph'
   * @returns {Array} 差異數組
   */
  diff(original, modified, granularity = 'line') {
    switch (granularity) {
      case 'word':
        return this.diffWords(original, modified);
      case 'paragraph':
        return this.diffParagraphs(original, modified);
      case 'line':
      default:
        return this.diffLines(original, modified);
    }
  }
};

// 導出模組
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DiffEngine;
}
