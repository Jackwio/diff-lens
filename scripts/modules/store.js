/**
 * Store Module
 * 應用全局狀態管理
 */

const Store = {
  // 全局狀態
  state: {
    original: '',
    modified: '',
    granularity: 'line', // 'line', 'word', 'paragraph'
    viewMode: 'combined', // 'combined', 'sideBySide'
    currentDiff: [],
    isCollapsed: {} // 記錄展開/收合狀態
  },

  // 訂閱者列表
  subscribers: [],

  /**
   * 設置原始內容
   * @param {string} content - 原始內容
   */
  setOriginal(content) {
    this.state.original = content;
    this.notify();
  },

  /**
   * 設置修改後的內容
   * @param {string} content - 修改後的內容
   */
  setModified(content) {
    this.state.modified = content;
    this.notify();
  },

  /**
   * 設置比對粒度
   * @param {string} granularity - 'line', 'word', 'paragraph'
   */
  setGranularity(granularity) {
    this.state.granularity = granularity;
    this.notify();
  },

  /**
   * 設置視圖模式
   * @param {string} mode - 'combined', 'sideBySide'
   */
  setViewMode(mode) {
    this.state.viewMode = mode;
    this.notify();
  },

  /**
   * 設置當前差異結果
   * @param {Array} diff - jsdiff 輸出的差異數組
   */
  setCurrentDiff(diff) {
    this.state.currentDiff = diff;
    this.notify();
  },

  /**
   * 切換區段的展開/收合狀態
   * @param {string} sectionId - 區段 ID
   */
  toggleCollapse(sectionId) {
    this.state.isCollapsed[sectionId] = !this.state.isCollapsed[sectionId];
    this.notify();
  },

  /**
   * 檢查區段是否已收合
   * @param {string} sectionId - 區段 ID
   * @returns {boolean} 是否已收合
   */
  isCollapsed(sectionId) {
    return this.state.isCollapsed[sectionId] || false;
  },

  /**
   * 重置所有狀態
   */
  reset() {
    this.state = {
      original: '',
      modified: '',
      granularity: 'line',
      viewMode: 'combined',
      currentDiff: [],
      isCollapsed: {}
    };
    this.notify();
  },

  /**
   * 獲取完整狀態
   * @returns {Object} 當前狀態
   */
  getState() {
    return { ...this.state };
  },

  /**
   * 訂閱狀態變化
   * @param {Function} callback - 回調函數
   * @returns {Function} 取消訂閱函數
   */
  subscribe(callback) {
    this.subscribers.push(callback);
    // 返回取消訂閱函數
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  },

  /**
   * 通知所有訂閱者
   */
  notify() {
    this.subscribers.forEach((callback) => {
      try {
        callback(this.getState());
      } catch (error) {
        console.error('Error in store subscriber:', error);
      }
    });
  }
};

// 導出模組
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
