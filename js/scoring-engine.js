/**
 * ScoringEngine - 數學實驗室通用規則引擎
 * 負責處理：輸入狀態、嘗試次數(Attempts)、修正判定(Correction)、加分公式(Scoring)
 */
const ScoringEngine = {
  
  /**
   * 1. 處理所有按鍵輸入邏輯 (通用規則)
   * 包含：修正鎖判定、嘗試次數累加、修正狀態標記
   */
  handleInput: (state, key) => {
    // 初始化必要的狀態 (以防 state 物件漏設)
    if (state.attempts === undefined) state.attempts = 1;
    if (state.hasModified === undefined) state.hasModified = false;
    if (state.isCorrectingMode === undefined) state.isCorrectingMode = false;

    // 處理「刪除」行為
    if (key === 'back') {
      // 規則：格子不是空的時候按退格，才視為「修正行為」
      if (state.userInput !== "") {
        state.hasModified = true;

        // 修正鎖邏輯：
        // 如果還沒進入修正模式，代表這是針對「新答案」的第一次修改
        if (!state.isCorrectingMode) {
          state.attempts++;      // 增加嘗試次數
          state.isCorrectingMode = true; // 上鎖 (避免連續 Backspace 重複加次)
        }
        state.userInput = state.userInput.slice(0, -1);
      }
    } 
    // 處理「非刪除」的所有輸入行為 (數字、符號、小數點等)
    else {
      // 只要按下非 Backspace 的任何鍵，視為開始新嘗試，立即解鎖
      state.isCorrectingMode = false;

      // 基礎輸入限制與邏輯
      if (key === '-') {
        if (state.userInput === "") state.userInput = "-";
      } else {
        // 限制最大長度防止溢位，可依需求調整
        if (state.userInput.length < 7) {
          state.userInput += key;
        }
      }
    }
  },

  /**
   * 2. 答對時的統計與計分處理
   * @param {Object} state - 遊戲狀態
   * @param {number} timeSpent - 該題耗時(秒)
   */
  processCorrect: (state, timeSpent) => {
    if (!state.stats) state.stats = { perfectTime: 0, correctedTime: 0, totalTime: 0 };
    
    // 定義「一次到位 (Perfect)」：沒按過退格鍵 且 只有一次嘗試
    const isPerfect = (!state.hasModified && state.attempts === 1);
    
    state.totalSolved = (state.totalSolved || 0) + 1;
    state.stats.totalTime += timeSpent;

    if (isPerfect) {
      state.totalPerfect = (state.totalPerfect || 0) + 1;
      state.stats.perfectTime += timeSpent;
      state.combo++;
      if (state.combo > state.maxCombo) state.maxCombo = state.combo;
    } else {
      state.totalCorrected = (state.totalCorrected || 0) + 1;
      state.stats.correctedTime += timeSpent;
      state.combo = 0; // 只要有修正過，連擊即中斷
    }

    // 計算得分
    const earn = ScoringEngine.calculateEarn(state.combo, state.hasModified);
    state.score += earn;
    
    // 狀態標籤：Perfect 或 嘗試次數數字
    const status = isPerfect ? "Perfect" : state.attempts.toString();
    
    return { earn, status };
  },

  /**
   * 3. 核心加分公式演算法
   */
  calculateEarn: (combo, hasModified) => {
    if (combo === 0) return 1.0; // 有修正過，combo歸零，固定給 1.0 分
    
    // 基礎分 1.0 + 連擊加乘 (每 1 combo + 0.1)
    let earn = 1 + (0.1 * (combo - 1));
    
    // 每 3 連擊的額外獎勵 (3, 6, 9...)
    if (combo > 0 && combo % 3 === 0) {
      earn += 0.01 * Math.pow(2, (combo / 3) - 1);
    }
    return earn;
  }
};
